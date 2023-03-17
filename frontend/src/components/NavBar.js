import { NavLink } from 'react-router-dom';
import './style.css';

function NavBar (){
  return(
    <nav className='NavBar'>
       <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">Wiki</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
