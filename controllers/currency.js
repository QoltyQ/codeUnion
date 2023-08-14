const axios = require("axios");
const xml2js = require("xml2js");
const Currency = require("../db/models/Currency");

async function fetchAndParseXml() {
  try {
    const response = await axios.get(
      "http://www.nationalbank.kz/rss/rates_all.xml"
    );
    const xmlData = response.data;

    const parser = new xml2js.Parser({ explicitArray: false });
    const jsonData = await parser.parseStringPromise(xmlData);

    return jsonData;
  } catch (error) {
    console.error("Error fetching or parsing XML data:", error);
    throw error;
  }
}

const getCurrencies = async (request, reply) => {
  try {
    const { page = 1, limit = 10 } = request.query;
    const offset = (page - 1) * limit;
    const currencies = await Currency.findAll({
      offset,
      limit: parseInt(limit),
      order: [["id", "ASC"]],
    });
    reply.send(currencies);
  } catch (error) {
    reply.status(500).send("Error fetching currencies");
  }
};

const getCurrencyById = async (request, reply) => {
  try {
    const { id } = request.params;
    const currency = await Currency.findByPk(id);
    if (!currency) {
      reply.status(404).send("Currency not found");
    } else {
      reply.send(currency);
    }
  } catch (error) {
    reply.status(500).send("Error fetching currency");
  }
};

module.exports = { getCurrencies, getCurrencyById };
