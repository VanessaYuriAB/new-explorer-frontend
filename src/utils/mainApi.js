import { baseMainApiUrl, makeApisRequest } from './utilsApis';

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
    },
    reqBody: cardObject, // vem do componente NewsCardList, um obj simple pq a
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
  });

  // Se a solicitação for bem-sucedida, retorna os dados
  return unsavedCard;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante > handleUnsaveCard
  // Try/catch desnecessário aqui tbm
};

// GET - /articles > aplicado na inicialização do app, no efeito para merge
const getUserNews = async () => {
  const userNews = await makeApisRequest({
    endpoint: `${baseMainApiUrl}/articles`,
    method: 'GET',
  });

  // Se a solicitação for bem-sucedida, retorna os dados
  return userNews;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante > efeito de montagem
  // Try/catch desnecessário aqui tbm
};

export { saveNews, unsaveNews, getUserNews };
