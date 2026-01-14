import { useEffect, useRef } from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {
  // Desestruturação do objeto passado como props, onde children é o conteúdo de popup
  // que pode ser Signin ou Signup, configurado no componente de abertura
  const { popup, handleClosePopup, children } = props;

  // Ref para encapsulamento de children: para fechamento do popup por clique fora da
  // caixa
  const childrenPopupRef = useRef(null);

  // Fechamento do popup pela tecla 'Esc', ativado sempre que o popup for aberto
  useEffect(() => {
    const handleEscClose = (evt) => {
      const keyIsEsc = evt.code === 'Escape'; // escape: esc

      if (popup && keyIsEsc) handleClosePopup(); // se o popup estiver aberto e a tecla pressionada
      // for a esc, o popup fecha
    };

    document.addEventListener('keydown', handleEscClose); // adiciona o evento em document >
    // escuta globalmente → essencial para capturar a tecla Esc mesmo sem foco

    // Wipe function: função de limpeza
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      // remove o listener ao desmontar ou ao mudar dependências → evita múltiplas inscrições
      // ou vazamentos
    };
  }, [popup, handleClosePopup]); // aciona sempre que o popup for aberto e limpa sempre que fechar

  // Handler: fechamento por clique fora
  const handleClickClose = (evt) => {
    const childrenContent = childrenPopupRef.current;
    const clickOutside =
      childrenContent && !childrenContent.contains(evt.target);

    if (clickOutside) handleClosePopup(); // se children estiver aberto e o click não for em
    // children, fecha o popup
  };

  return (
    <div className="popup" onClick={handleClickClose}>
      {/* Para configuração do fechamento dos popups por clique na tela */}
      <div className="popup__content" ref={childrenPopupRef}>
        {/* Para posicionamento do botão fechar */}
        <div className="popup__position-btn">
          {children}
          <button
            className="popup__close-btn"
            type="button"
            onClick={handleClosePopup}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
