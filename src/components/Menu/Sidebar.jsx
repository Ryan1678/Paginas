import { Link } from "react-router-dom";
import './Sidebar.css';
import logo from '../../assets/hamb-1-removebg.png';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="d-flex justify-content-around align-items-center px-2 py-4 border-bottom rounded">
                <img src={logo} alt="logo" className="m-1" />
                <span className="fw-bold fst-italic">Lanchonete ADM</span>
            </div>

            <nav className="nav flex-column">
                <Link className="nav-link" aria-current="page" to={'/home'}>Dashboard</Link>
                <Link className="nav-link" to={'/mensagem'}>Pedidos</Link>
                <Link className="nav-link" to={'/usuario'}>Usuário</Link>
                <Link className="nav-link" to={'/produto'}>Produto</Link>
            </nav>
        </div>
    )
}

export default Sidebar