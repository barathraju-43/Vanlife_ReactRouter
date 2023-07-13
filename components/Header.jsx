import { NavLink } from 'react-router-dom'

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
            </nav>
        </header>
    )
}