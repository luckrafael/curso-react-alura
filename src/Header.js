import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <nav>
        <div class="nav-wrapper indigo lighten-2">
          <Link to='/' class="brand-logo">Casa do código</Link>
          <ul class="right">
            <li><Link to ='/autores'>Autores</Link></li>
            <li><Link to ='/livros'>Livros</Link></li>
            <li><Link to ='/sobre'>Sobre</Link></li>
          </ul>
        </div>
      </nav>
    );
}

export default Header;