import React, { useState } from 'react';
import './Funcionario.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Funcionario = () => {
    const [usuarios, setUsuarios] = useState([
        { id: 1, nome: 'Usuario 1', email: 'usuario1@example.com', senha: 'senha123' },
        { id: 2, nome: 'Usuario 2', email: 'usuario2@example.com', senha: 'senha456' },
      ]);
    
      const [isEditing, setIsEditing] = useState(false);
      const [isAdding, setIsAdding] = useState(false);
      const [currentUsuario, setCurrentUsuario] = useState(null);
    
      const handleEditClick = (usuario) => {
        setIsEditing(true);
        setCurrentUsuario({ ...usuario });
      };
    
      const handleAddClick = () => {
        setIsAdding(true);
        setCurrentUsuario({ id: '', nome: '', email: '', senha: '' });
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUsuario({
          ...currentUsuario,
          [name]: value,
        });
      };
    
      const handleSaveClick = () => {
        if (isAdding) {
          setUsuarios([...usuarios, { ...currentUsuario, id: usuarios.length + 1 }]);
        } else {
          const updatedUsuarios = usuarios.map((usuario) =>
            usuario.id === currentUsuario.id ? currentUsuario : usuario
          );
          setUsuarios(updatedUsuarios);
        }
        setIsEditing(false);
        setIsAdding(false);
      };
    
      return (
        <div className="container">
          <SideBarGerente />
          <main className="main-content">
            <h1>Usuários</h1>
            <button className="adiciona" onClick={handleAddClick}>Adicionar Usuário</button>
    
            {/* Formulário de edição/adicionamento */}
            {(isEditing || isAdding) && (
              <div className="edit-form">
                <h2>{isAdding ? 'Adicionar Usuário' : 'Editar Usuário'}</h2>
                <input
                  type="text"
                  name="id"
                  value={currentUsuario.id}
                  disabled
                  placeholder="ID"
                />
                <input
                  type="text"
                  name="nome"
                  value={currentUsuario.nome}
                  onChange={handleInputChange}
                  placeholder="Nome"
                />
                <input
                  type="email"
                  name="email"
                  value={currentUsuario.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="senha"
                  value={currentUsuario.senha}
                  onChange={handleInputChange}
                  placeholder="Senha"
                />
                <button onClick={handleSaveClick}>Salvar</button>
              </div>
            )}
    
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOME</th>
                  <th>EMAIL</th>
                  <th>SENHA</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="id">{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.senha}</td>
                    <td>
                      <button onClick={() => handleEditClick(usuario)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      );
    };
    
export default Funcionario;
