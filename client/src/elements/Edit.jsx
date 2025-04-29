import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function Edit() {
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vh-100 bg-primary">
      <h1>Usuário {id}</h1>
      <Link to="/" className="btn btn-success">
        Voltar
      </Link>
      {data.map((student) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="nome">Nome</label>
              <input
                value={student.nome}
                type="text"
                nome="nome"
                required
                onChange={(e) =>
                  setData([{ ...data[0], nome: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                value={student.email}
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setData([{ ...data[0], email: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="genero">Gênero</label>
              <input
                value={student.genero}
                type="text"
                name="genero"
                required
                onChange={(e) =>
                  setData([{ ...data[0], genero: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="idade">Idade</label>
              <input
                value={student.idade}
                type="number"
                name="idade"
                required
                onChange={(e) => setData([{ ...data[0], idade: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
}

export default Edit;
