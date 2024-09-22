import { Routes, Route } from "react-router-dom"
import App from "../templates/App/App"
import Home from "../templates/Home/Home"

import ForgotPass from "../templates/Login/ForgotPass"
import Login from "../templates/Login/Login"

import Mensagem from "../templates/Mensagem/Mensagem"
import MensagemLer from "../templates/Mensagem/MensagemLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import Produto from "../templates/Produto/Produto"
import ProdutoEditar from "../templates/Produto/ProdutoEditar"
import ProdutoNovo from "../templates/Produto/ProdutoNovo"
import ProdutoLista from "../templates/Produto/ProdutoLista"



const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
      

        <Route path="/mensagem" element={<Mensagem />} />
        <Route path="/mensagemler" element={<MensagemLer />} />


        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuarioslista" element={<UsuariosLista />} />
        <Route path="/usuarionovo" element={<UsuarioNovo />} />
        <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />

        
        <Route path="/produto" element={<Produto />} />
        <Route path="/produtolista" element={<ProdutoLista />} />
        <Route path="/produtonovo" element={<ProdutoNovo />} />
        <Route path="/produtoeditar/:id" element={<ProdutoEditar />} />

      </Routes>
    </div>
  )
}
export default AppRoutes