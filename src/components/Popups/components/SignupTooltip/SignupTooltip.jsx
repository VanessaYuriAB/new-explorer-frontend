import { Link } from 'react-router-dom';
import Signin from '../Signin/Signin';
import './SignupTooltip.css';

function SignupTooltip({ popup, handleOpenPopup, handleClosePopup }) {
  // Objeto para configurar children de Popups: abertura do popup de login (Signin)
  // Obj criado em Navigation, Signup, ForMobileHeaderAndNav e aqui
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

  return (
    <div className="popup__tooltip">
      <h2 className="popup__tooltip-title">Cadastro concluído com sucesso!</h2>
      <button
        className="popup__tooltip-link"
        type="button"
        onClick={() => handleOpenPopup(signinPopup)}
      >
        Entrar
      </button>

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
    </div>
  );
}

export default SignupTooltip;
