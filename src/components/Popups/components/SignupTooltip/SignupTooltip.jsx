import Signin from '../Signin/Signin';
import './SignupTooltip.css';

function SignupTooltip({ handleOpenPopup, signinPopup }) {
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

      {/* Signin será renderizado por Popups em App */}
    </div>
  );
}

export default SignupTooltip;
