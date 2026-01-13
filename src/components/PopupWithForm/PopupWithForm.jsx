import './PopupWithForm.css';

import Signup from './components/Signup/Signup';

function PopupWithForm() {
  return (
    <div className="popup">
      <div className="popup__content">
        <Signup />
        <button className="popup__close-btn" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
