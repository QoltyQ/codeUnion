const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, "your-refresh-secret-key", { expiresIn: "7d" });
};

const authController = {};

authController.register = async (request, reply) => {
  try {
    const { username, password } = request.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return reply.status(400).send("Username already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    reply.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    reply.status(500).send("Error registering user");
  }
};

authController.login = async (request, reply) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return reply.status(401).send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return reply.status(401).send("Invalid username or password");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await user.update({ refreshToken });

    reply.send({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error authenticating user:", error);
    reply.status(500).send("Error authenticating user");
  }
};

module.exports = authController;
