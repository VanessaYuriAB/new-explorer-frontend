import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import Signup from '../Signup/Signup';
import Popups from '../../Popups';
import './Signin.css';

function Signin({ popup, handleOpenPopup, handleClosePopup }) {
  // Contexto de autenticação, extraindo set do estado de login
  const { setLoggedIn } = useContext(AuthContext);

  // Objeto para configurar children de Popups: abertura do popup de inscrição (Signup)
  const signupPopup = {
    children: (
      <Signup
        popup={popup}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />
    ),
    type: 'signup',
  };

  return (
    <form className="popup__signin">
      <h2 className="popup__signin-title">Entrar</h2>
      <label className="popup__signin-label" htmlFor="email">
        E-mail
      </label>
      <input
        className="popup__signin-input"
        type="email"
        placeholder="Insira e-mail"
        id="email"
        aria-label="Inserir e-mail cadastrado"
        required
      ></input>
      <span className="popup__signin-span">
        Span para msg de erro do input-email
      </span>
      <label className="popup__signin-label" htmlFor="password">
        Senha
      </label>
      <input
        className="popup__signin-input"
        type="password"
        placeholder="Insira a senha"
        id="password"
        aria-label="Inserir senha cadastrada"
        required
      ></input>
      <span className="popup__signin-span">
        Span para msg de erro do input-password
      </span>
      <button
        className="popup__signin-btn"
        type="submit"
        onClick={() => {
          setLoggedIn(true);
          handleClosePopup();
        }} /*disabled*/
      >
        Entrar
      </button>
      <p className="popup__signin-plink">
        {/* O espaço depois do texto é proposital para o espaçamento da frase inteira */}
        ou {/* Uso da tag button, e não Link, pq o clique não muda de rota */}
        <button
          className="popup__signin-link"
          type="button"
          onClick={() => handleOpenPopup(signupPopup)}
        >
          Inscreva-se
        </button>
      </p>

      {/* Se o popup não for nulo, o componente será renderizado na tela */}

      {popup && (
        <Popups
          popup={popup}
          handleClosePopup={handleClosePopup}
          type={popup.type}
        >
          {popup.children}
        </Popups>
      )}
    </form>
  );
}

export default Signin;
