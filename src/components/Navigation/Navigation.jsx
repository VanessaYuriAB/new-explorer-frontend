import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import btnOut from '../../assets/btn-out.svg';

function Navigation() {
  // A função getNavLinkClass é nativa do componente <NavLink>
  // Aceita um objeto como um parâmetro, que possui uma propriedade,
  // isActive, que é verdadeira se o link estiver ativo
  const getNavLinkClass = ({ isActive }) => {
    return 'header__link' + (isActive ? ' header__link_active' : '');
  };

  return (
    <nav className="header__nav">
      {/* Se o link estiver ativo, a classe header__link_active será adicionada à lista de
      classes. */}

      <div className="header__links">
        <NavLink className={getNavLinkClass} to="/">
          Início
        </NavLink>
        <NavLink className={getNavLinkClass} to="/saved-news">
          Artigos salvos
        </NavLink>
      </div>
      <Link className="header__btn" to="/">
        <p className="header__btn-text">Nome</p>
        <img
          className="header__btn-out"
          src={btnOut}
          alt="Ícone simbolizando saída/logout."
        />
      </Link>
    </nav>
  );
}

export default Navigation;
