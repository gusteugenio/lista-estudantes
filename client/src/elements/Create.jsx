import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
      nome: '',
      email: '',
      genero: '',
      idade: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e) {
      e.preventDefault()

      axios.post('/add_user', values)
      .then((res) => {
        navigate('/')
      })
      .catch((err) => console.log(err))
    }
  return (
    <div className='container-fluid vh-100 bg-primary'>
      <div className='row'>
        <h3>Adicionar Estudante</h3>
        <div className='d-flex justify-content-end'>
          <Link to='/' className='btn btn-success'>Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor='nome'>Nome</label>
            <input type='text' name='nome' onChange={(e) => setValues({...values, nome: e.target.value})} />
          </div>
          <div className="form-group my-3">
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' onChange={(e) => setValues({...values, email: e.target.value})} />
          </div>
          <div className="form-group my-3">
            <label htmlFor='genero'>Gênero</label>
            <input type='text' name='genero' onChange={(e) => setValues({...values, genero: e.target.value})} />
          </div>
          <div className="form-group my-3">
            <label htmlFor='idade'>Idade</label>
            <input type='text' name='idade' onChange={(e) => setValues({...values, idade: e.target.value})} />
          </div>
          <div className="form-group my-3">
          <button type='submit' className='btn btn-success'>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create
