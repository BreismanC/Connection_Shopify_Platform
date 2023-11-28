const express = require("express");
const app = express();
const shopify = require("./config/shopifyConfig");
const { initModels } = require("./database/models/index");
const db = require("./database/config/config");
const { userRoutes } = require("./routes/user.routes");
const { imageRoutes } = require("./routes/image.routes");

initModels();

db.sync({ force: false }).then(() => console.log("database syncronized"));

app.use(express.json());

app.get("/", async (req, res) => {
  const products = await shopify.product.list();
  res.send(products);
});

app.use("/users", userRoutes);
app.use("/images", imageRoutes);

app.listen(4000, () => {
  console.log("Server on port " + 4000);
});
