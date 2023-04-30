const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3010;
// funcões
const { createTable, login, register } = require("./config_db");

createTable();
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("ola");
});

app.post("/register", function (req, res) {
  const { username, password } = req.body;
  register(username, password);
  return res.status(200).json({ message: "usuario registrado com sucesso" });
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  let dados = await login(username, password);
  return dados;
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
