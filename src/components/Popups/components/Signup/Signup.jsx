import { useContext, useState } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import Signin from '../Signin/Signin';
import SignupTooltip from '../SignupTooltip/SignupTooltip';
import './Signup.css';

function Signup({ popup, handleOpenPopup, handleClosePopup }) {
  // Variáveis de estado: controle dos inputs do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Contexto de autenticação, extraindo set do estado de login
  const { handleRegistration } = useContext(AuthContext);

  // Objeto para configurar children de Popups para abertura do popup de login (Signin)
  // Obj duplicado, este usado aqui e em SignupTooltip
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
        handleOpenPopup={handleOpenPopup}
        signinPopup={signinPopup}
      />
    ),
    type: 'tooltip',
  };

  // Envio do formulário com hook personalizado (inclui preventDefault,
  // loading, onSubmit, onSuccess e onError)
  const { handleSubmit } = useFormSubmit(
    // onSubmit
    () => {
      // Envia informações do formulário para a API do backend (servidor) e retorna a Promisse
      return handleRegistration({ email, password, name });
    },
    // onSuccess
    () => {
      // Abre o tooltip para msg de sucesso, que tbm é renderizado por Popup
      handleOpenPopup(signupTooltip);
    },
    // onError
    (error) => {
      console.error('Erro ao enviar formulário de inscrição \n', error);
    },
  );

  return (
    <form className="popup__signup" onSubmit={handleSubmit} noValidate>
      <h2 className="popup__signup-title">Inscrever-se</h2>
      <label className="popup__signup-label" htmlFor="email">
        E-mail
      </label>
      <input
        className="popup__signup-input"
        type="email"
        placeholder="Insira e-mail"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        aria-label="Inserir e-mail para cadastro"
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
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        aria-label="Inserir senha para cadastro"
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
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        aria-label="Inserir seu nome de usuário"
        required
      ></input>
      <span className="popup__signup-span">
        Span para msg de erro do input-name
      </span>
      <span className="popup__signup-span">Span para msg de Server-Error</span>
      <button
        className="popup__signup-btn"
        type="submit"
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

      {/* Signin ou SignupTooltip serão renderizados por Popups em App */}
    </form>
  );
}

export default Signup;
