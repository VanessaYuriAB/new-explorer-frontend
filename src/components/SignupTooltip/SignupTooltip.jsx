import { Link } from 'react-router-dom';
import './SignupTooltip.css';

function SignupTooltip() {
  return (
    <div className="tooltip-signup">
      <div className="tooltip-signup__content">
        <h2 className="tooltip-signup__title">
          Cadastro concluído com sucesso!
        </h2>
        <Link className="tooltip-signup__link" to="/">
          Entrar
        </Link>
        <button className="tooltip-signup__close-btn" type="button"></button>
      </div>
    </div>
  );
}

export default SignupTooltip;
