// Configuração Inicial
require("dotenv").config();
const express = require("express"); // Importa
const mongoose = require("mongoose");
const { restart } = require("nodemon");
const app = express(); // Inicializa

// Lendo o JSON (com middlewares)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Rotas Iniciais
const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

// Porta para o express disponibilizar a API
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vwsec.mongodb.net/bancoapinode?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
