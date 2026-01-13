import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  return (
    <>
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
        <span className="popup__signup-span">
          Span para msg de Server-Error
        </span>
        <button className="popup__signup-btn" type="submit" disabled>
          Inscrever-se
        </button>
        <p className="popup__signup-plink">
          ou
          {/* O espaço antes do texto do Link é proposital para o espaçamento da frase inteira */}
          <Link className="popup__signup-link"> Entre</Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
