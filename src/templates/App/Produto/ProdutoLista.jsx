import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import ProdutoService from "../../services/ProdutoService"
import { useEffect, useState } from "react"

const ProdutoLista = () => {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/produtoeditar')
    }

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        ProdutoService.getAllProdutos().then(
            (response) => {
                const produtos = response.data;
                setProdutos(produtos);
                console.log(produtos);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const getId = (id) => {
        navigate(`/produtoeditar/` + id)
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/produto'}
                    title={'Lista de Produtos'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Preço</th>
                                    <th scope="col">tipo</th>
                                    <th scope="col">imagem</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos?.map((produto) => (
                                    <tr className="" key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.email}</td>
                                        <td>{produto.nivelAcesso}</td>
                                        <td>{produto.dataCadastro}</td>
                                        <td>{produto.statusProduto}</td>
                                        <td>
                                            <button onClick={() => getId(usuario.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Abrir</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProdutoLista