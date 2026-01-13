import './PopupWithForm.css';

import Signin from './components/Signin/Signin';

function PopupWithForm() {
  return (
    <div className="popup">
      <div className="popup__content">
        <Signin />
        <button className="popup__close-btn" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
