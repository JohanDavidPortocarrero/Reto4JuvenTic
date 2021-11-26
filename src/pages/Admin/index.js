import React, {useState, useContext, useEffect} from 'react'

import { ReactComponent as CloseMenu} from '../../assets/menuClose.svg';
import { ReactComponent as MenuIcon} from '../../assets/menuHamburger.svg';

import Home from './components/Home'
import Menu from './components/Menu'
import Usuarios from './components/Usuarios'
import Servicios from './components/Servicios'
import Reservas from './components/Reservas'
import Comentarios from './components/Comentarios'
import Nosotros from './components/Nosotros'
import NavBar from './components/NavBar'

import ComentContext from '../../Context/comentarios/comentContext'
import PlatosContext from '../../Context/platos/platosContext'
import ContactoContext from '../../Context/contacto/contactoContext'
import ReservaContext from '../../Context/reserva/reservaContext'
import CompraContext from '../../Context/registro_compra/compraContext'
import { useServices } from '../../Hooks/useServices';

import './StyleAdmin/adminS.css'

export default function Admin(props) {
    const [isMenuActive, setStateMenu] = useState(false);

    const platosContext = useContext(PlatosContext);
    const {crearPlatos, obtenerPlatos, borrarPlato, editarPlato, platos} = platosContext

    const comentContext = useContext(ComentContext);
    const {obtenerComentarios, borrarComentarios, comentarios} = comentContext

    const contactoContext = useContext(ContactoContext)
    const {obtenerContactos, borrarContacto, contactos} = contactoContext

    const reservaContext = useContext(ReservaContext)
    const {obtenerReserva, borrarReserva, reservas} = reservaContext

    const compraContext = useContext(CompraContext)
    const {obtenerCompra, borrarCompra, compras} = compraContext


    const { services } = useServices();

    useEffect(()=>{
        obtenerPlatos();
        obtenerContactos();
        obtenerCompra();
        obtenerReserva();
        obtenerComentarios();
    }, [])

    const handleClick = () => {
        setStateMenu(!isMenuActive);
    }

    const handleCloseMobileMenu = () => {
        setStateMenu(false);
    }

    function activeComponent(){
        if(props.active === 'menu'){
            return <Menu 
                obtenerPlatos = {obtenerPlatos}
                platos = {platos}
                addPlato = {crearPlatos}
                deletePlato = {borrarPlato}
                editPlato = {editarPlato}
            />
        }
        else if(props.active === 'home'){
            return <Home
                totalUsuer = {0}
                totalPlatos = {platos.length}
                totalComentarios = {comentarios.length}
                totalReservas = {reservas.length}
                comprasRealizadas = {compras}
                obtenerCompra = {obtenerCompra}
            />
        }
        else if(props.active === 'user'){
            return <Usuarios/>
        }
        else if(props.active === 'servicios'){
            return <Servicios servicios = {services}/>
        }
        else if(props.active === 'comentarios'){
            return <Comentarios 
                comentarios = {comentarios}
                platos = {platos}
                obtenerComentarios = {obtenerComentarios}
                deleteComentario = {borrarComentarios}
            />
        }
        else if(props.active === 'reservas'){
            return <Reservas
                preguntas = {contactos}
                reservaciones = {reservas}
                borrarReserva = {borrarReserva}
                obtenerReserva = {obtenerReserva}
                obtenerContactos = {obtenerContactos}
                borrarContacto = {borrarContacto}
            />
        }
        else if(props.active === 'nosotros'){
            return <Nosotros/>
        }
    }

    return <>
        <div className="body_Admin">
            <div className="container_Admin">

                <NavBar
                    active={isMenuActive}
                    handleCloseMobileMenu={handleCloseMobileMenu}
                />


                <div className="main">
                    <div className="topbar">
                        <div className="mobile__menu-icons" onClick={handleClick}>
                            {
                                isMenuActive
                                    ? <CloseMenu className="sideBar__icon" />
                                    : <MenuIcon className="sideBar__icon" />
                            }
                        </div>

                        {/* Search */}
                        <div className="search">
                            <label>
                                <input type="text" placeholder="Search here" />
                                <ion-icon name="search-outline"></ion-icon>
                            </label>
                        </div>

                        {/* userImg */}
                        <div className="user">
                            <img src="https://i.postimg.cc/28JTJD92/Joe-Uriah-Commission-by-The-Zombie-Cat-on-Deviant-Art.png" />
                        </div>
                    </div>

                    {activeComponent()}

                </div>
            </div>
        </div>
    </>
}
