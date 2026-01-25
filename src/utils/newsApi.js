import {
  baseNewsApiUrl,
  newsApiKey,
  makeApisRequest,
  dataFromSevenDays,
} from './utilsApis';

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

    // Se a solicitação for bem-sucedida, retorna os dados para serem aplicados
    // no handleGetNews
    return news;
  } catch (error) {
    // Se a solicitação não for bem-sucedida, repassa o erro adiante
    console.error('Erro em getNews, repassado à handleGetNews em App:', error);
    throw error;
  }
};

export default getNews;
