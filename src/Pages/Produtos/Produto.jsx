import React, { useState } from 'react';
import './Produto.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Produto = () => {
  const [produtos, setProdutos] = useState([
    { id: 1, imagem: 'url1', nome: 'Produto 1', tipo: 'Tipo A', preco: 'R$ 10,00', descricao: 'Descrição 1' },
    { id: 2, imagem: 'url2', nome: 'Produto 2', tipo: 'Tipo B', preco: 'R$ 20,00', descricao: 'Descrição 2' },
    // ... Adicione outros produtos conforme necessário
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);

  const handleEditClick = (produto) => {
    setIsEditing(true);
    setCurrentProduto({ ...produto });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentProduto({ id: '', imagem: '', nome: '', tipo: '', preco: '', descricao: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto({
      ...currentProduto,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    if (isAdding) {
      setProdutos([...produtos, { ...currentProduto, id: produtos.length + 1 }]);
    } else {
      const updatedProdutos = produtos.map((produto) =>
        produto.id === currentProduto.id ? currentProduto : produto
      );
      setProdutos(updatedProdutos);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleDeleteClick = (id) => {
    const updatedProdutos = produtos.filter((produto) => produto.id !== id);
    setProdutos(updatedProdutos);
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Produtos</h1>
        <button className="adiciona" onClick={handleAddClick}>Adicionar Produto</button>

        {/* Formulário de edição/adicionamento */}
        {(isEditing || isAdding) && (
          <div className="edit-form">
            <h2>{isAdding ? 'Adicionar Produto' : 'Editar Produto'}</h2>
            <input
              type="text"
              name="id"
              value={currentProduto.id}
              disabled
              placeholder="ID"
            />
            <input
              type="text"
              name="imagem"
              value={currentProduto.imagem}
              onChange={handleInputChange}
              placeholder="Imagem URL"
            />
            <input
              type="text"
              name="nome"
              value={currentProduto.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <input
              type="text"
              name="tipo"
              value={currentProduto.tipo}
              onChange={handleInputChange}
              placeholder="Tipo"
            />
            <input
              type="text"
              name="preco"
              value={currentProduto.preco}
              onChange={handleInputChange}
              placeholder="Preço"
            />
            <input
              type="text"
              name="descricao"
              value={currentProduto.descricao}
              onChange={handleInputChange}
              placeholder="Descrição"
            />
            <button onClick={handleSaveClick}>Salvar</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGEM</th>
              <th>NOME</th>
              <th>TIPO</th>
              <th>PREÇO</th>
              <th>DESCRIÇÃO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="id">{produto.id}</td>
                <td><img src={produto.imagem} alt={produto.nome} width="50" /></td>
                <td>{produto.nome}</td>
                <td>{produto.tipo}</td>
                <td>{produto.preco}</td>
                <td>{produto.descricao}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(produto)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(produto.id)} style={{ marginLeft: '20px' }}>Excluir</button> {/* Aumenta a distância */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Produto;
