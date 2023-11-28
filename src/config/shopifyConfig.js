const Shopify = require("shopify-api-node");
const globalConstants = require("../const/globalConstants");

const shopify = new Shopify({
  shopName: globalConstants.SHOPIFY_SHOP_NAME,
  apiKey: globalConstants.SHOPIFY_API_KEY,
  password: globalConstants.SHOPIFY_PASSWORD,
});

module.exports = shopify;
