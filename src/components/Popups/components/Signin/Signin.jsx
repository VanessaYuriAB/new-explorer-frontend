import Signup from '../Signup/Signup';
import Popups from '../../Popups';
import './Signin.css';

function Signin({ popup, handleOpenPopup, handleClosePopup }) {
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
        required
      ></input>
      <span className="popup__signin-span">
        Span para msg de erro do input-password
      </span>
      <button className="popup__signin-btn" type="submit" disabled>
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
