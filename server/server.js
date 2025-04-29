const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gustdev123",
  database: "estudantes"
})

app.post('/add_user', (req, res) => {
  const sql = "INSERT INTO estudante_detalhes (`nome`, `email`, `genero`, `idade`) VALUES (?)";
  const values = [
    [req.body.nome, req.body.email, req.body.genero, req.body.idade]
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({message: 'Algo inesperado aconteceu: ' + err})
    return res.json({success: "Estudante adicionado com sucesso"})
  })
})

app.get('/students', (req, res) => {
  const sql = "SELECT * FROM estudante_detalhes";

  db.query(sql, (err, result) => {
    if (err) return res.json({message: 'Erro no servidor'})
    return res.json(result)
  })
})

app.get('/get_student/:id', (req, res) => {
  const id = req.params.id
  const sql = "SELECT * FROM estudante_detalhes WHERE `id` = ?"

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({message: 'Erro no servidor'})
    return res.json(result)
  })
})

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id
  const sql = "UPDATE estudante_detalhes SET `nome`=?, `email`=?, `idade`=?, `genero`=? WHERE id=?"

  const values = [
    req.body.nome,
    req.body.email,
    req.body.idade,
    req.body.genero,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Algo inesperado aconteceu" + err });
    return res.json({ success: "Estudante atualizado com sucesso" });
  });
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id
  const sql = "DELETE FROM estudante_detalhes WHERE id=?"

  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Algo inesperado aconteceu" + err });
    return res.json({ success: "Estudante deletado com sucesso" });
  });
});

app.listen(port, () => {
  console.log("1, 2, 3 testando");
})
