// Todos os elementos de formulário necessários (form e input) são atribuídos a constantes
// dentro da própria função que os utiliza (setEventListener() para inputs e
// enableValidation() para forms)

// Cada elemento de mensagem de erro usa seu nome de classe exclusivo (conforme id do
// seu input)
// Nenhuma função pega o elemento de erro DOM do escopo externo, encontram o elemento de
// formulário correspondente individualmente para o campo de entrada atualmente verificado
// Para saber onde procurar por tal elemento, é passado o parâmetro formElement como
// primeiro argumento para as funções e procurado o elemento de erro nele

// Mostra o elemento de erro para notificar o usuário
const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Encontra o elemento da mensagem de erro dentro da própria função
  const spanElement = formElement.querySelector(`.${inputElement.id}-span`);

  inputElement.classList.add(config.inputErrorClass);

  // Substitue o conteúdo da mensagem de erro pelo argumento errorMessage validado
  spanElement.textContent = errorMessage;
  // Mostra a mensagem de erro
  spanElement.classList.add(config.spanClass);
};

// Oculta o elemento de erro
const hideInputError = (formElement, inputElement, config) => {
  // Encontra o elemento da mensagem de erro dentro da própria função
  const spanElement = formElement.querySelector(`.${inputElement.id}-span`);

  inputElement.classList.remove(config.inputErrorClass);

  // Oculta a mensagem de erro
  spanElement.classList.remove(config.spanClass);
  // Redefine o conteúdo da mensagem de erro
  spanElement.textContent = '';
};

// Verifica se o campo é válido, chamando showInputError() ou hideInputError()
// isValid() possue dois parâmetros: o elemento HTML <form> que contém o campo de entrada
// para ser verificado, sendo este último, o segundo parâmetro
const isValid = (formElement, inputElement, config) => {
  // setCustomValidity() é um método nativo da API de formulários do JavaScript, parte da
  // Constraint Validation API, faz parte do HTML5 e existe em qualquer navegador moderno
  // - funciona em qualquer input, select, textarea ou fieldset com validação
  // Define uma mensagem de erro personalizada, anula a validação padrão do navegador e
  // controla quando o campo é considerado válido ou inválido

  // Limpa msgs personalizadas anteriores
  inputElement.setCustomValidity('');

  // Se o padrão não for atendido e existir um title no input, usa-o como msg de erro
  if (inputElement.validity.patternMismatch && inputElement.title) {
    inputElement.setCustomValidity(inputElement.title);
  }

  // Atualiza o estado visual: msgs
  if (!inputElement.validity.valid) {
    // Se não (!), mostra o elemento de erro
    // O parâmetro de showInputError() é um formulário que contém um campo para ser
    // verificado
    // A própria mensagem de erro é o terceiro parâmetro da função
    // Todos os campos de entrada possuem a propriedade validationMessage
    // Ela contém o texto da mensagem que o navegador exibe por padrão se os dados de
    // entrada forem inválidos, mas, acima, foi configurada a exibição do texte de 'title'
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    // Se sim, oculta o elemento de erro
    // O parâmetro de hideInputError() é, tbm, o formulário que contém um campo para ser
    // verificado
    hideInputError(formElement, inputElement, config);
  }
};

// Para controle do status do botão: ativado ou desativado
// Pega um vetor de campos de formulário e retorna como true se pelo menos um campo for
// inválido, e retorna como false se todos eles forem válidos
// Utiliza o método some(), adequado para esse tipo de validação: itera sobre o vetor
// para encontrar o input inválido
// A função apenas procura por um campo inválido e sinaliza se o botão "Enviar" pode ser
// desbloqueado, não modifica o botão "Enviar" em si
const hasInvalidInput = (inputList) => {
  // Itera sobre o vetor usando o método some()
  return inputList.some((inputElement) => {
    // Se um campo for inválido, o retorno de chamada deste campo retorna como true, o
    // método para e a função hasInvalidInput() retorna como true

    return !inputElement.validity.valid; // existe algum input inválido?
  });
};

// Função toggleButtonState(): para alterar o status ativo do botão e aplicar estilos
// correspondentes a essa alteração
// hasInvalidInput() verifica a validade dos campos e retorna true ou false, com base
// nela, toggleButtonState() altera o estado do botão
// A função recebe um vetor de campos de entrada e o elemento de botão
const toggleButtonState = (inputList, buttonElement) => {
  // Se houver pelo menos uma entrada inválida
  if (hasInvalidInput(inputList)) {
    // torna o botão inativo,
    buttonElement.disabled = true;
  } else {
    // caso contrário, ativa-o
    buttonElement.disabled = false;
  }
};

// Adiciona o manipulador de eventos de entrada ('input'), chamando a função isValid()
// para cada entrada de caractere
// Função setEventListeners: para que o ouvinte de evento seja adicionado para todos os
// campos de entrada dentro do formulário, recebe um elemento de formulário como parâmetro
// e adiciona os manipuladores necessários em seus campos
const setEventListeners = (formElement, config) => {
  // Encontra todos os campos dentro do formulário e cria um vetor deles usando o método
  // Array.from()
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );

  // Encontra o botão de envio do formulário
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Chama o toggleButtonState() antes de começar a ouvir o evento de entrada
  // Pq o botão é desabilitado se o usuário inserir dados inválidos no campo, mas ele fica
  // ativo quando a página é carregada inicialmente
  toggleButtonState(inputList, buttonElement);

  // Itera sobre o vetor resultante
  inputList.forEach((inputElement) => {
    // Adiciona o manipulador de eventos de entrada em cada campo
    inputElement.addEventListener('input', () => {
      // Chama a função isValid() dentro do retorno de chamada e passa o formulário e o
      // elemento a ser verificado para ela, mais o obj de configuração do form
      isValid(formElement, inputElement, config);

      // Verifica se o botão deve estar ativo ou não após cada alteração nos campos do formulário, chamando toggleButtonState() e passando para ele um vetor de campos e o botão
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// A função enableValidation() processa o formulário configurado para validação,
// onde cada campo do formulário é verificado separadamente - encontra o
// formulário na página pelo objeto de configuração passado como parâmetro
// Para encontrar o formulário no DOM e chamar a função setEventListeners() para
// ele
const enableValidation = (config) => {
  // Encontra o formulário com a classe especificada no DOM
  const formElement = document.querySelector(config.formSelector);

  // Cancelamento do comportamento de envio padrão de formulários do navegador
  // realizado no hook useFormSubmit
  // formElement.addEventListener('submit', (evt) => {
  //  evt.preventDefault();
  // });

  // Chama a função setEventListeners() para o formulário, tomando um elemento de
  // formulário como um argumento, mais o seu objeto de configuração
  setEventListeners(formElement, config);
};

export { enableValidation, hideInputError, toggleButtonState };
