import Signin from '../Signin/Signin';
import SignupTooltip from '../SignupTooltip/SignupTooltip';
import Popups from '../../Popups';
import './Signup.css';

function Signup({ popup, handleOpenPopup, handleClosePopup }) {
  // Objeto para configurar children de Popups: abertura do popup de login (Signin)
  // Obj criado em Navigation, SignupTooltip, ForMobileHeaderAndNav e aqui
  const signinPopup = {
    children: (
      <Signin
        popup={popup}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />
    ),
    type: 'signin',
  };

  // Objeto para configurar children de Popups: abertura do popup tooltip
  // (SignupTooltip)
  const signupTooltip = {
    children: (
      <SignupTooltip
        popup={popup}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />
    ),
    type: 'tooltip',
  };

  return (
    <form className="popup__signup">
      <h2 className="popup__signup-title">Inscrever-se</h2>
      <label className="popup__signup-label" htmlFor="email">
        E-mail
      </label>
      <input
        className="popup__signup-input"
        type="email"
        placeholder="Insira e-mail"
        id="email"
        required
      ></input>
      <span className="popup__signup-span">
        Span para msg de erro do input-email
      </span>
      <label className="popup__signup-label" htmlFor="password">
        Senha
      </label>
      <input
        className="popup__signup-input"
        type="password"
        placeholder="Insira a senha"
        id="password"
        required
      ></input>
      <span className="popup__signup-span">
        Span para msg de erro do input-password
      </span>
      <label className="popup__signup-label" htmlFor="name">
        Nome de usuário
      </label>
      <input
        className="popup__signup-input"
        type="text"
        placeholder="Insira seu nome de usuário"
        id="name"
        required
      ></input>
      <span className="popup__signup-span">
        Span para msg de erro do input-name
      </span>
      <span className="popup__signup-span">Span para msg de Server-Error</span>
      <button
        className="popup__signup-btn"
        type="submit"
        onClick={() => handleOpenPopup(signupTooltip)}
        /*disabled*/
      >
        Inscrever-se
      </button>
      <p className="popup__signup-plink">
        {/* O espaço depois do texto é proposital para o espaçamento da frase inteira */}
        ou {/* Uso da tag button, e não Link, pq o clique não muda de rota */}
        <button
          className="popup__signup-link"
          type="button"
          onClick={() => handleOpenPopup(signinPopup)}
        >
          Entre
        </button>
      </p>

      {/* Se o popup não for nulo, o componente será renderizado na tela:
      Signin ou SignupTooltip*/}

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

export default Signup;
