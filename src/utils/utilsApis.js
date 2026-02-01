const baseNewsApiUrl = import.meta.env.VITE_BASE_NEWS_API_URL;
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

const baseMainApiUrl = import.meta.env.VITE_BASE_MAIN_API_URL;
// baseMainApiUrl === undefined se não existir no .env

// Função genérica para enviar requisições HTTP
const makeApisRequest = async ({
  endpoint,
  reqParams = {}, // valor padrão para evitar erro com o método URLSearchParams, caso
  // o obj não seja passado na chamada da função, em requisições que não sejam GET
  method,
  headers = {}, // valor padrão para evitar erro caso não passe headers na chamada,
  // permite que a função seja usada para requisições sem cabeçalhos (como GET simples)
  reqBody,
}) => {
  // Converte objeto em query string
  const paramsForQuery = Object.keys(reqParams).length
    ? new URLSearchParams(reqParams).toString()
    : '';

  const url = paramsForQuery ? `${endpoint}?${paramsForQuery}` : endpoint;

  const options = {
    headers,
    method,
    body: reqBody ? JSON.stringify(reqBody) : undefined,
  };

  const response = await fetch(url, options);

  // O método fetch retorna o objeto de resposta no formato JSON
  // O método res.json() converte o obj para JavaScript
  // res é a resposta em JSON
  // .json() converte res para JS e o return retorna os dados

  const data = await response.json();

  // Verifica se a solicitação foi bem ou mal sucedida
  // Se bem, retorna o obj com dados, convertidos para JS
  // Se mal, vai para o bloco .catch()

  if (!response.ok) {
    // Repassa obj de erro original da API
    throw data;
  }

  return data;

  // Se a solicitação não for bem-sucedida, repassa o erro adiante

  // Try/catch desnecessário aqui

  // Esse bloco captura falhas do fetch (erros de rede, DNS, servidor offline) ou erros
  // inesperados no código; erros HTTP (status não OK) são tratados antes, lançando o
  // objeto original da API
};

// Função para data from > reqParams, em getNews
// getDate() → retorna o dia do mês (1 a 31) da data, pega o dia atual
// setDate() → define o dia do mês para a data, permite alterar o dia
const dataFromSevenDays = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7); // subtrai 7 dias
  return date.toISOString(); // formato ISO 8601 completo
};

export {
  baseNewsApiUrl,
  newsApiKey,
  makeApisRequest,
  dataFromSevenDays,
  baseMainApiUrl,
};
