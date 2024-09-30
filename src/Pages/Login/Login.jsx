import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import './Login.css';

export const Login = () => {
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Previna o comportamento padrão de recarregar a página

    // Resetar mensagens de erro
    setEmailError('');
    setPasswordError('');

    let valid = true;

    // Validação do Email
    if (!email) {
      setEmailError('Por favor, insira seu email.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, insira um email válido.');
      valid = false;
    }

    // Validação da Senha
    if (!password) {
      setPasswordError('Por favor, insira sua senha.');
      valid = false;
    }

    if (valid) {
      navigate('/pedidos'); // Navega para a rota '/pedidos'
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            className={`input-field ${emailError ? 'error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            className={`input-field ${passwordError ? 'error' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};
