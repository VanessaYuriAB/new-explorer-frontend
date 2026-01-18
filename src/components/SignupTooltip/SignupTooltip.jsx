import { Link } from 'react-router-dom';
import Signin from '../PopupWithForm/components/Signin/Signin';
import './SignupTooltip.css';

function SignupTooltip({ popup, handleOpenPopup, handleClosePopup }) {
  // Objeto para configurar children de PopupWithForm: abertura do popup de login (Signin)
  // Obj criado em Navigation, Signup, ForMobileHeaderAndNav e aqui
  const signinPopup = {
    children: (
      <Signin
        popup={popup}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />
    ),
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
        <PopupWithForm popup={popup} handleClosePopup={handleClosePopup}>
          {popup.children}
        </PopupWithForm>
      )}
    </div>
  );
}

export default SignupTooltip;
