import { useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';
import './ApiErrorTooltip.css';

// Popup tooltip, para exibir erros ao salvar e des-salvar artigos
// Registro e login são exibidos no próprio componente do form

function ApiErrorTooltip({ message }) {
  // Contexto extraindo currentUser para aplicação do nome do usuário logado
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="popup__error">
      <h2 className="popup__error-user">
        {currentUser.name ? `${currentUser.name},` : 'Algo deu errado:'}
      </h2>
      <p className="popup__error-message">{message}</p>
    </div>
  );
}

export default ApiErrorTooltip;
