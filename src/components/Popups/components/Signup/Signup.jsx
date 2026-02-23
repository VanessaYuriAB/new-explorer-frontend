import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import resetValidation from '../../../../utils/formsResetValidation';
import { signupConfig } from '../../../../utils/validationConfigs';
import Signin from '../Signin/Signin';
import SignupTooltip from '../SignupTooltip/SignupTooltip';
import './Signup.css';

function Signup({ popup, handleOpenPopup, handleClosePopup }) {
  // Variáveis de estado: controle dos inputs do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Variável de estado: controle do span para msg de erro de inscrição
  const [serverError, setServerError] = useState('');

  // Efeito para reset do span de erro de incrição, usando a função de limpeza (ao
  // desmontar componente)
  // React recomenda evitar efeitos de inicialização que apenas setam estado, ao invés
  // disso, usar o cleanup para resetar
  // Isso é aceito sem warnings porque: não dispara renderização no mount, só acontece
  // no unmount e é o padrão recomendado para limpar estados em componentes de formulário
  // exibidos dentro de modais/popups
  useEffect(() => {
    return () => {
      setServerError('');
    };
  }, []);

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
  const { handleSubmit, isLoading } = useFormSubmit(
    // onSubmit
    () => {
      // Envia dados de inscrição para a API do backend (servidor) e retorna a Promisse
      return handleRegistration({ email, password, name });
    },
    // onSuccess
    () => {
      // Limpa inputs (campos)
      setEmail('');
      setPassword('');
      setName('');
      // Reseta a validação do formulário
      resetValidation(signupConfig);
      // Abre o tooltip para msg de sucesso, que tbm é renderizado por Popup
      handleOpenPopup(signupTooltip);
    },
    // onError
    (error) => {
      console.error(
        'Erro ao enviar formulário de inscrição do usuário (handleRegistration) \n',
        error,
      );
      // Renderiza a msg de erro de inscrição no popup, no span acima do botão
      // Erro de usuário já cadastrado (409 Conflict) ou erro interno no servidor
      // (500 Internal Server) - ambos retornados pela Api do backend
      setServerError(error.message);
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
        pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
        title="E-mail válido, contento apenas letras, números, sublinhados, pontos ou hífens."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        aria-label="Inserir e-mail para cadastro"
        required
      ></input>
      <span className="popup__signup-span email-span"></span>
      <label className="popup__signup-label" htmlFor="password">
        Senha
      </label>
      <input
        className="popup__signup-input"
        type="password"
        placeholder="Insira a senha"
        id="password"
        pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
        title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        aria-label="Inserir senha para cadastro"
        required
      ></input>
      <span className="popup__signup-span password-span"></span>
      <label className="popup__signup-label" htmlFor="name">
        Nome de usuário
      </label>
      <input
        className="popup__signup-input"
        type="text"
        placeholder="Insira seu nome de usuário"
        id="name"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > para evitar inserção de tags
        HTML diretamente: barreira simples contra injeção de HTML no campo */
        title="Não permitidos: '<' e '>', por qiuestão de segurança."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        aria-label="Inserir seu nome de usuário"
        required
      ></input>
      <span className="popup__signup-span name-span"></span>
      <span
        className={`popup__signup-span ${serverError ? 'popup__signup-span_active' : ''}`}
        role="alert" /* atributo de acessibilidade (ARIA) usado para avisar tecnologias
        assistivas — como leitores de tela — que um conteúdo importante mudou na página
        e precisa ser anunciado imediatamente: leitores de tela interrompem o que estavam
        falando e anunciam a nova mensagem imediatamente, sem que o usuário precise focar
        ou navegar até o elemento; essencial para usuários com deficiência visual ou pessoas
        que utilizam navegação assistida */
      >
        {serverError}
      </span>
      <button className="popup__signup-btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Inscrevendo-se...' : 'Inscrever-se'}
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
