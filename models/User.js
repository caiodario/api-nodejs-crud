const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  age: Number,
  approved: Boolean,
}); // Cria uma tabela no banco

module.exports = User; // Exporta o modulo para utilização em outros arquivos
