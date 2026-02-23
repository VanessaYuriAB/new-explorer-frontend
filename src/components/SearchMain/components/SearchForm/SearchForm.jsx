import { useState } from 'react';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import SearchTooltip from '../../../Popups/components/SearchTooltip/SearchTooltip';
import './SearchForm.css';

function SearchForm({
  handleOpenPopup,
  setIsSearchLoading,
  handleGetNews,
  setSearchedNews,
}) {
  // Variável de estado: controle do input do formulário
  const [queryString, setQueryString] = useState('');

  // Objeto para configurar children de Popups: abertura do search tooltip
  // (SearchTooltip)
  const searchTooltip = {
    children: <SearchTooltip />,
    type: 'tooltip',
  };

  // Envio do formulário com hook personalizado (inclui preventDefault,
  // onSubmit, onSuccess e onError)
  // Configuração para o loading do hook não é utilizada, é configurado manualmente,
  // devido ordem das funcionalidades por causa da validação para envio da pesquisa
  // sem palavra-chave
  const { handleSubmit } = useFormSubmit(
    // onSubmit
    () => {
      // Valida formulário antes de enviar a requisição HTTP à API
      if (queryString.length === 0) {
        // Se não houver palavra-chave, abre modal de informativo ao usuário
        handleOpenPopup(searchTooltip);
      } else {
        // Se houver, define o início do estado de carregamento da pesquisa
        setIsSearchLoading(true);
        // Reset do estado de notícias pesquisadas para 'null' antes da nova pesquisa, pois
        // havendo ou não resultados para a busca, o obj é retornado
        setSearchedNews({
          status: null,
          totalResults: 0,
          articles: [],
          code: null,
          message: null,
        });
        // E envia a solicitação de pesquisa do usuário
        return handleGetNews(queryString); // retorna a Promisse, é aqui que será aguardado (vide hook)
      }
    },
    // onSuccess
    () => {
      // Define o final do estado de carregamento da pesquisa
      setIsSearchLoading(false);
      // Limpa o input e a variável de estado
      setQueryString('');
    },
    // onError
    (error) => {
      // Define o final do estado de carregamento da pesquisa
      setIsSearchLoading(false);
      console.error(
        'Erro ao enviar formulário de pesquisa para News Api (handleGetNews) \n',
        error,
      );
    },
  );

  return (
    <form className="search__form-news" onSubmit={handleSubmit}>
      <input
        className="search__form-input"
        type="text"
        placeholder='Tema: "<" e ">" não são permitidos.'
        name="search-news"
        pattern="^[^<>]*$"
        /* bloqueia os caracteres < e > para evitar inserção de tags
        HTML diretamente > barreira simples contra injeção de HTML no campo */
        value={queryString}
        onChange={(e) => {
          setQueryString(e.target.value);
        }}
        aria-label="Inserir tema para pesquisa"
      ></input>
      <button
        className="search__form-btn"
        type="submit"
        aria-label="Procurar notícias"
      >
        Procurar
      </button>

      {/* SearchTooltip será renderizado por Popups em App */}
    </form>
  );
}

export default SearchForm;
