import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import btnOut from '../../../../assets/btn-out.svg';

function Navigation() {
  // Contexto de autenticação, extraindo estado de login
  const { loggedIn } = useContext(AuthContext);

  // As funções getNavLinkClass e getNavLinkClassOut são nativas do componente <NavLink>
  // Aceitam um objeto como parâmetro, que possui uma propriedade, isActive, que é
  // verdadeira se o link estiver ativo
  const getNavLinkClass = ({ isActive }) => {
    return 'header__link' + (isActive ? ' header__link_active' : '');
  };

  const getNavLinkClassOut = ({ isActive }) => {
    return (
      'header__link header__link_out' +
      (isActive ? ' header__link_out_active' : '')
    );
  };

  return (
    <nav className="header__nav">
      {/* Se o link estiver ativo, as classes header__link_active e header__link_out_active
      serão adicionadas às listas de classes correspondentes */}

      {/* Se estiver logado, renderiza Navigation; se não, renderiza Navigation _out */}

      {loggedIn ? (
        <>
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
        </>
      ) : (
        <>
          <div className="header__links header__links_out">
            <NavLink className={getNavLinkClassOut} to="/">
              Início
            </NavLink>
          </div>
          <Link className="header__btn header__btn_out" to="/signin">
            <p className="header__btn-text header__btn-text_out">Entrar</p>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
