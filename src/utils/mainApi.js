import { baseMainApiUrl, makeApisRequest } from './utilsApis';
import { getToken } from './token';

// Assinatura: fetch(url-to-requested-resource, options-object);
// É um método assíncrono, retorna uma promisse e method padrão: GET

// POST - /articles > aplicado no botão 'salvar/des-salvar' do card
const saveNews = async (cardObject) => {
  const savedCard = await makeApisRequest({
    endpoint: `${baseMainApiUrl}/articles`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    reqBody: cardObject, // vem do componente NewsCardList/NewsCard, um obj simple pq a
    // conversão para JSON é aplicada no makeApisRequest
  });

  // Se a solicitação for bem-sucedida, retorna os dados
  return savedCard;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante > handleSaveCard
  // Try/catch desnecessário aqui tbm
};

// DELETE - /articles/:id > aplicado, tbm, no botão 'salvar/des-salvar' do card
const unsaveNews = async (cardId) => {
  const unsavedCard = await makeApisRequest({
    endpoint: `${baseMainApiUrl}/articles/${cardId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  // Se a solicitação for bem-sucedida, retorna os dados
  return unsavedCard;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante > memoizedHandleUnsave
  // Try/catch desnecessário aqui tbm
};

// GET - /articles > aplicado na inicialização do app, no efeito para merge
const getUserNews = async () => {
  const userNews = await makeApisRequest({
    endpoint: `${baseMainApiUrl}/articles`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  // Se a solicitação for bem-sucedida, retorna os dados
  return userNews;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante > efeito de montagem
  // Try/catch desnecessário aqui tbm
};

// GET - /users/me > aplicado no efeito de montagem da aplicação
const getCurrentUser = async () => {
  const userInfos = await makeApisRequest({
    endpoint: `${baseMainApiUrl}/users/me`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  // Se a solicitação for bem-sucedida, retorna os dados
  return userInfos;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante > efeito de montagem
  // Try/catch desnecessário aqui tbm
};

export { saveNews, unsaveNews, getUserNews, getCurrentUser };
