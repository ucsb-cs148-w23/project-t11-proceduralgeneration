import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './style.css';

function NavBar (){
  
  const theme = useTheme();
  return(
    <nav className='NavBar'>
       <ul>
        <li>
          <NavLink to="/" className={theme.palette.mode === "dark" ? "aWhite" : "aBlack"}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={theme.palette.mode === "dark" ? "aWhite" : "aBlack"}>Wiki</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
