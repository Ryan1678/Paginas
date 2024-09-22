import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const ProdutoNovo = () => {

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/produto'}
                    title={'Novo Produto'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-3">
                        <div className="col-md-5">
                            <label htmlFor="inputNome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="inputNome" />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="inputpreço" className="form-label">Preço</label>
                            <input type="text" className="form-control" id="inputEmail4" />
                        </div>
                       
                        <div className="col-md-2">
                            <label htmlFor="inputAcesso" className="form-label">Tipo</label>
                            <select id="inputAcesso" className="form-select">
                                <option selected>Tipo</option>
                                <option>Salgado</option>
                                <option>Doce</option>
                                <option>Bebida</option>
                            </select>
                        </div>
                        
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Gravar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ProdutoNovo