import { useState } from 'react';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import getNews from '../../../../utils/NewsApi';
import SearchTooltip from '../../../Popups/components/SearchTooltip/SearchTooltip';
import Popups from '../../../Popups/Popups';
import './SearchForm.css';

function SearchForm({
  popup,
  handleOpenPopup,
  handleClosePopup,
  setIsSearchLoading,
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
  // loading, onSubmit, onSuccess e onError)
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
        // E envia a solicitação de pesquisa do usuário
        return getNews(queryString); // retorna a Promisse, é aqui que será aguardado (vide hook)
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
    () => {
      // Define o final do estado de carregamento da pesquisa
      setIsSearchLoading(false);
    },
  );

  return (
    <form className="search__form-news" onSubmit={handleSubmit} noValidate>
      <input
        className="search__form-input"
        type="text"
        placeholder="Inserir tema"
        name="search-news"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > para evitar inserção de tags
        HTML diretamente > barreira simples contra injeção de HTML no campo */
        value={queryString}
        onChange={(e) => {
          setQueryString(e.target.value);
        }}
      ></input>
      <button className="search__form-btn" type="submit">
        Procurar
      </button>

      {/* Se o popup não for nulo, o componente será renderizado na tela:
      SearchTooltip*/}

      {popup && (
        <Popups
          popup={popup}
          handleClosePopup={handleClosePopup}
          type={popup.type}
        >
          {popup.children}
        </Popups>
      )}
    </form>
  );
}

export default SearchForm;
