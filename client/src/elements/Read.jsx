import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Read() {
  const [data, setData] = useState([])
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_student/${id}`)
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [id])

  return (
    <div className="container-fluid vh-100 bg-primary">
      <h1>Usuário {id}</h1>
      <Link to="/" className="btn btn-success">Voltar</Link>
      {data.map((student) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <b>ID: </b>
              {student["id"]}
            </li>
            <li className="list-group-item">
              <b>Nome: </b>
              {student["nome"]}
            </li>
            <li className="list-group-item">
              <b>Email: </b>
              {student["email"]}
            </li>
            <li className="list-group-item">
              <b>Idade: </b>
              {student["idade"]}
            </li>
            <li className="list-group-item">
              <b>Gênero: </b>
              {student["genero"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Read
