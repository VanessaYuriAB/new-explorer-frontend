import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../../contexts/AuthContext';
import Signin from '../../../PopupWithForm/components/Signin/Signin';
import PopupWithForm from '../../../PopupWithForm/PopupWithForm';
import btnOut from '../../../../assets/btn-out.svg';
import './Navigation.css';

function Navigation({ popup, handleOpenPopup, handleClosePopup }) {
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

  // Objeto para configurar children de PopupWithForm: abertura do popup de login (Signin)
  // Obj tbm criado em Signup, duplicado
  const signinPopup = {
    children: (
      <Signin
        popup={popup}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />
    ),
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
          <button className="header__btn" type="button">
            <p className="header__btn-text">Nome</p>
            <img
              className="header__btn-out"
              src={btnOut}
              alt="Ícone simbolizando saída/logout."
            />
          </button>
        </>
      ) : (
        <>
          <div className="header__links header__links_out">
            <NavLink className={getNavLinkClassOut} to="/">
              Início
            </NavLink>
          </div>
          <button
            className="header__btn header__btn_out"
            type="button"
            onClick={() => handleOpenPopup(signinPopup)}
          >
            <p className="header__btn-text header__btn-text_out">Entrar</p>
          </button>
        </>
      )}

      {/* Se o popup não for nulo, o componente será renderizado na tela */}

      {popup && (
        <PopupWithForm popup={popup} handleClosePopup={handleClosePopup}>
          {popup.children}
        </PopupWithForm>
      )}
    </nav>
  );
}

export default Navigation;
