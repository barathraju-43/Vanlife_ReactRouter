import { NavLink } from 'react-router-dom'
import imageUrl from '../assets/images/avatar-icon.png';

export default function Header(){

    const activeNavStyle = {
        fonweight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return(
        <header>
            <NavLink className="site-logo" to="/">#VanLife</NavLink>
            <nav>
                <NavLink to="host" style={({isActive})=> isActive ? activeNavStyle : null}>Host</NavLink>
                <NavLink to="about" style={({isActive})=> isActive ? activeNavStyle : null}>About</NavLink>
                <NavLink to="vans" style={({isActive})=> isActive ? activeNavStyle : null}>Vans</NavLink>
                <NavLink to="login" style={({isActive})=> isActive ? activeNavStyle : null}>
                    <img 
                        src={imageUrl}
                        className="login-icon"
                    />
                </NavLink>
            </nav>
        </header>
    )
}