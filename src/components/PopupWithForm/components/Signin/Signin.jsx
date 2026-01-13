import { Link } from 'react-router-dom';
import './Signin.css';

function Signin() {
  return (
    <>
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
          ou
          {/* O espaço antes do texto do Link é proposital para o espaçamento da frase inteira */}
          <Link className="popup__signin-link"> Inscreva-se</Link>
        </p>
      </form>
    </>
  );
}

export default Signin;
