// SideBarGerente.jsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // Importando useLocation
import './SideBarGerente.css';

const SideBarGerente = () => {
  const location = useLocation(); // Obtendo a localização atual

  return (
    <aside className="sidebar">
      <a href="/"> <h2 className="sidebar-logo">Lanchonete</h2></a>
      <ul>
        <li>
          <a 
            href="/pedidos" 
            className={location.pathname === '/pedidos' ? 'active' : ''}
          >
            <i className="fa fa-shopping-cart"></i> Pedidos
          </a>
        </li>
        <li>
          <a 
            href="/produtos" 
            className={location.pathname === '/produtos' ? 'active' : ''}
          >
            <i className="fa fa-cutlery"></i> Produtos
          </a>
        </li>
        <li>
          <a 
            href="/funcionario" 
            className={location.pathname === '/funcionario' ? 'active' : ''}
          >
            <i className="fa fa-users"></i> Funcionários
          </a>
        </li>
      </ul>
      <h2 className="sair"><a href="/Login">Sair</a></h2>
    </aside>
  );
};

export default SideBarGerente;
