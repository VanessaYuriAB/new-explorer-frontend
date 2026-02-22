import { hideInputError, toggleButtonState } from './formsValidation';

function resetValidation(config) {
  // Encontra o formulário com a classe especificada no DOM
  const formElement = document.querySelector(config.formSelector);

  // Encontra todos os campos dentro do formulário e cria um vetor deles usando o método
  // Array.from()
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, config);
  });

  // Encontra o botão de envio do formulário
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
}

export default resetValidation;
