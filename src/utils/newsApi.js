import {
  baseNewsApiUrl,
  newsApiKey,
  makeApisRequest,
  dataFromSevenDays,
} from './utils';

// Assinatura: fetch(url-to-requested-resource, options-object);
// É um método assíncrono, retorna uma promisse e method padrão: GET

// GET - /everything > aplicado no botão do SearchForm
const getNews = async (queryString) => {
  try {
    const news = await makeApisRequest({
      endpoint: `${baseNewsApiUrl}/everything`,
      reqParams: {
        q: queryString /* vem do componente (input do SearchForm) */,
        from: dataFromSevenDays() /* função para calcular 7 dias atrás */,
        to: new Date().toISOString() /* data atual no formato ISO 8601 completo */,
        pageSize: 100,
      },
      method: 'GET',
      headers: {
        'X-Api-Key': `${newsApiKey}`,
      },
    });

    // Se a solicitação for bem-sucedida, aplica os dados onde necessário

    console.log(news); // Implementação: atualizar o estado ou renderizar os dados
  } catch (error) {
    // Se a solicitação não for bem-sucedida, aplica devido tratamento de erro
    // Ex: .error() e/ou informativo ao usuário

    console.error('Erro ao buscar notícias:', error.message);

    // Implementação do tratamento de erros: exibir uma mensagem amigável para o usuário
  }
};

export default getNews;
