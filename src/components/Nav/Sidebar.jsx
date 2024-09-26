import { NavButtons } from "../NavButtons/NavButtons"
import { GiChipsBag } from "react-icons/gi";
import { LuCandy } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import './Sidebar.css'
import { useContext } from "react";
import { Context } from "../context/Provider";
import { FaHome } from "react-icons/fa";
import teste from '../../assets/trento.jpg';
export const Sidebar = () => {

     const {select} = useContext(Context)
   
  return (
    <nav>
     <NavButtons link={'/login'} className="teste">
          <button className="gerente">Gerenciar</button>
          </NavButtons>
          <NavButtons link={'/'} className={`${select === '' ? 'select' : ''} home`} title={''}>
               <FaHome/> 
          </NavButtons>

          <NavButtons link={'/pizza'} className={`${select === 'salgados' ? 'select' : ''} pizza`} title={'salgados'}>
              <GiChipsBag /> 
          </NavButtons>

          <NavButtons link={'/hotdog'} className={`${select === 'doces' ? 'select' : ''} hotdog`} title={'doces'}>
                  <LuCandy />
          </NavButtons>

          <NavButtons link={'/hamburguer'} className={`${select === 'bebidas' ? 'select' : ''} hamburguer` } title={'bebidas'}>
               <RiDrinks2Fill />
          </NavButtons>

    </nav>
  )
}

