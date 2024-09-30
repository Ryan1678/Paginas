import React, { useState } from 'react';
import './Pedido.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Pedido = () => {
  const [pedidos, setPedidos] = useState([
    { id: 577, data: '23/08/2024', emissor: 'Isabela', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
    { id: 57, data: '20/09/2024', emissor: 'Luana', email: 'example@example', metodo: 'Cartão', status: 'Recebido' },
    { id: 66, data: '21/09/2024', emissor: 'Ryan', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
    { id: 60, data: '22/09/2024', emissor: 'Lanny', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
    { id: 679, data: '23/09/2024', emissor: 'Adriano', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
    { id: 67, data: '24/09/2024', emissor: 'Juana', email: 'example@example', metodo: 'Cartão', status: 'Recebido' },
    { id: 43, data: '25/09/2024', emissor: 'Liliane', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
    { id: 689, data: '25/09/2024', emissor: 'Luiz', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
    { id: 58, data: '25/09/2024', emissor: 'Gustavo', email: 'example@example', metodo: 'Pix', status: 'Recebido' },
  ]);

  const [isEditing, setIsEditing] = useState(false); 
  const [currentPedido, setCurrentPedido] = useState(null);

  const handleEditClick = (pedido) => {
    setIsEditing(true);
    setCurrentPedido({ ...pedido }); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPedido({
      ...currentPedido,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    const updatedPedidos = pedidos.map((pedido) =>
      pedido.id === currentPedido.id ? currentPedido : pedido
    );
    setPedidos(updatedPedidos); 
    setIsEditing(false); 
  };

  const handleDeleteClick = (id) => {
    const updatedPedidos = pedidos.filter(pedido => pedido.id !== id);
    setPedidos(updatedPedidos);
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Pedidos</h1>

        {isEditing && (
          <div className="edit-form">
            <h2>Editar Pedido</h2>
            <input
              type="text"
              name="id"
              value={currentPedido.id}
              disabled
              onChange={handleInputChange}
              placeholder="ID"
            />
            <input
              type="text"
              name="data"
              value={currentPedido.data}
              onChange={handleInputChange}
              placeholder="Data"
            />
            <input
              type="text"
              name="emissor"
              value={currentPedido.emissor}
              onChange={handleInputChange}
              placeholder="Emissor"
            />
            <input
              type="text"
              name="email"
              value={currentPedido.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="metodo"
              value={currentPedido.metodo}
              onChange={handleInputChange}
              placeholder="Método"
            />
            <input
              type="text"
              name="status"
              value={currentPedido.status}
              onChange={handleInputChange}
              placeholder="Status"
            />
            <button onClick={handleSaveClick}>Salvar</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Emissor</th>
              <th>Email</th>
              <th>Método</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="id">{pedido.id}</td>
                <td>{pedido.data}</td>
                <td>{pedido.emissor}</td>
                <td>{pedido.email}</td>
                <td>{pedido.metodo}</td>
                <td>{pedido.status}</td>
                <td className="product-actions">
                  <button className="edit-button" onClick={() => handleEditClick(pedido)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(pedido.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Pedido;
