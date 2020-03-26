import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
// import { Container } from './styles';
import "./styles.css";
import heroesIMG from "../../assets/heroes.png";
import logoIMG from "../../assets/logo.svg";

export default function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const resp = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", resp.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tesnte novamente");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoIMG} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesIMG} alt="Heroes" />
    </div>
  );
}
