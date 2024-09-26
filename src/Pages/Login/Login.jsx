import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import './Login.css'; 

export const Login = () => {
  const navigate = useNavigate(); // Inicialize o hook useNavigate

  const handleLogin = (e) => {
    e.preventDefault(); // Previna o comportamento padrão de recarregar a página
    // Aqui você pode adicionar lógica de autenticação, se necessário
    navigate('/pedidos'); // Navega para a rota '/produtos'
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input type="text" className="input-field" />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input type="password" className="input-field" />
        </div>
        <button type="submit" className="login-button">Entrar</button> 
      </form>
    </div>
  );
};
