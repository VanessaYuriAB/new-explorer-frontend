import { useContext, useState } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import Signup from '../Signup/Signup';
import './Signin.css';

function Signin({ popup, handleOpenPopup, handleClosePopup }) {
  // Variáveis de estado: controle dos inputs do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Contexto de autenticação, extraindo set do estado de login
  const { handleLogin } = useContext(AuthContext);

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

  // Envio do formulário com hook personalizado (inclui preventDefault,
  // loading, onSubmit, onSuccess e onError)
  const { handleSubmit } = useFormSubmit(
    // onSubmit
    () => {
      // Envia dados de login e retorna a Promisse
      return handleLogin({ email, password });
    },
    // onSuccess
    () => {
      handleClosePopup();
    },
    (error) => {
      console.error(
        'Erro ao enviar formulário de login (handleLogin) \n',
        error,
      );
    },
  );

  return (
    <form className="popup__signin" onSubmit={handleSubmit} noValidate>
      <h2 className="popup__signin-title">Entrar</h2>
      <label className="popup__signin-label" htmlFor="email">
        E-mail
      </label>
      <input
        className="popup__signin-input"
        type="email"
        placeholder="Insira e-mail"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
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
        pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
        /* title="Mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)." */
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        aria-label="Inserir senha cadastrada"
        required
      ></input>
      <span className="popup__signin-span">
        Span para msg de erro do input-password
      </span>
      <button
        className="popup__signin-btn"
        type="submit"
        /*disabled*/
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

      {/* Signup será renderizado por Popups em App */}
    </form>
  );
}

export default Signin;
