// Manipulação da variável de estado e do localStorage para o Token JWT

// Seta
const setAndStorageToken = (token, setJwt) => {
  localStorage.setItem('jwt', token); // armazena o token no localStorage
  setJwt(token); // atualiza a variável de estado do token
};

// Busca
const getToken = () => {
  return localStorage.getItem('jwt'); // busca o token armazenado no localStorage
};

// Deleta
const removeToken = (setJwt) => {
  localStorage.removeItem('jwt'); // remove o token do localStorage
  setJwt(''); // limpa a variável de estado do token
};

export { setAndStorageToken, getToken, removeToken };
