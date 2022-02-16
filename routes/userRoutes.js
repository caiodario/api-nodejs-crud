const router = require("express").Router();
const req = require("express/lib/request");
const User = require("../models/User");

router.post("/", async (req, res) => {
  // A função é assincrona para esperar a ação do banco de dados

  // CREATE - Cria um novo usuário
  const { name, email, age, approved } = req.body; // Destructuring assignment

  // Validações
  if (!name) {
    res.status(422).json({ error: "nome é um campo obrigatório" });
    return; // Para a requisição
  }
  if (!email) {
    res.status(422).json({ error: "e-mail é um campo obrigatório" });
    return;
  }
  if (!age) {
    res.status(422).json({ error: "idade é um campo obrigatório" });
    return;
  }

  const user = {
    name,
    email,
    age,
    approved,
  };
  try {
    await User.create(user);
    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error }); // Atribui um erro genérico em caso de falhar no registro
  }
});

// READ - Leitura dos usuários cadastrados
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  // Rota dinâmica para buscar registros únicos

  const id = req.params.id; // Extrair os dados da req pelo params

  try {
    const user = await User.findOne({ _id: id }); // Busca o usuário no banco que tenha o ID igual ao usuário que foi passado no params da requisição
    if (!user) {
      res.status(422).json({ message: "O usuário não foi encontrado!" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// UPDATE - Atualização dos dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, age, approved } = req.body;

  const user = {
    name,
    email,
    age,
    approved,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, user);
    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: "O usuário não foi encontrado!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE - Deletar registros
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }); // Busca o usuário no banco que tenha o ID igual ao usuário que foi passado no params da requisição
  if (!user) {
    res.status(422).json({ message: "O usuário não foi encontrado!" });
    return;
  }
  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
