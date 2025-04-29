import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)
  useEffect(() => {
    if (deleted) {
      setDeleted(false)
    }

    axios.get('/students')
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [deleted])

  function handleDelete(id) {
    axios.delete(`delete/${id}`)
    .then((res) => {
      setDeleted(true)
    })
    .catch((err) => console.log(err))
  }
  return (
    <div className='container-fluid bg-primary vh-100'>
      <h2>Estudantes</h2>
      <div className="d-flex justify-content-end">
        <Link className='btn btn-success' to='/create'>Adicionar estudante</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Gênero</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((student) => {
              return (
                <tr>
                  <td>{student.id}</td>
                  <td>{student.nome}</td>
                  <td>{student.email}</td>
                  <td>{student.genero}</td>
                  <td>{student.idade}</td>
                  <td>
                    <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Ver</Link>
                    <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Editar</Link>
                    <button onClick={() => handleDelete(student.id)} className="btn mx-2 btn-danger">Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;
