import React, { useState } from 'react';
import './Funcionario.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Funcionario = () => {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'Funcionário 1', email: 'email1@example.com', senha: 'senha1' },
    { id: 2, nome: 'Funcionário 2', email: 'email2@example.com', senha: 'senha2' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentFuncionario, setCurrentFuncionario] = useState(null);

  const handleEditClick = (funcionario) => {
    setIsEditing(true);
    setCurrentFuncionario({ ...funcionario });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentFuncionario({ id: '', nome: '', email: '', senha: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFuncionario({
      ...currentFuncionario,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    if (isAdding) {
      setFuncionarios([...funcionarios, { ...currentFuncionario, id: funcionarios.length + 1 }]);
    } else {
      const updatedFuncionarios = funcionarios.map((funcionario) =>
        funcionario.id === currentFuncionario.id ? currentFuncionario : funcionario
      );
      setFuncionarios(updatedFuncionarios);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleDeleteClick = (id) => {
    const updatedFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
    setFuncionarios(updatedFuncionarios);
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Funcionários</h1>
        <button className="adiciona" onClick={handleAddClick}>Adicionar Funcionário</button>

        {/* Formulário de edição/adicionamento */}
        {(isEditing || isAdding) && (
          <div className="edit-form">
            <h2>{isAdding ? 'Adicionar Funcionário' : 'Editar Funcionário'}</h2>
            <input
              type="text"
              name="id"
              value={currentFuncionario.id}
              disabled
              placeholder="ID"
            />
            <input
              type="text"
              name="nome"
              value={currentFuncionario.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <input
              type="email"
              name="email"
              value={currentFuncionario.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="senha"
              value={currentFuncionario.senha}
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
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.senha}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(funcionario)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(funcionario.id)}>Excluir</button>
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
