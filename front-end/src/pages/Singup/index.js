import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    nome: "",
    cpf: "",
    telefone: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User created", data);
    } catch (error) {
      console.error("Error during fetch operation", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Nome:
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </label>
      <br />
      <label>
        CPF:
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Telefone:
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}
