const axios = require("axios");
const xml2js = require("xml2js");
const Currency = require("./db/models/currency");

const fetchCurrencyData = async () => {
  try {
    const response = await axios.get(
      "http://www.nationalbank.kz/rss/rates_all.xml"
    );
    const xml = response.data;
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    const items = result.rss.channel[0].item;

    const currencies = items.map((item) => ({
      name: item.title[0],
      rate: parseFloat(item.description[0]),
    }));

    await Promise.all(
      currencies.map(async (currency) => {
        await Currency.upsert(currency, { where: { name: currency.name } });
      })
    );

    console.log("Currency data updated successfully.");
  } catch (error) {
    console.error("Error updating currency data:", error);
  }
};

fetchCurrencyData();
