import { useState } from 'react';
import SearchTooltip from '../../../Popups/components/SearchTooltip/SearchTooltip';
import Popups from '../../../Popups/Popups';
import './SearchForm.css';

import getNews from '../../../../utils/NewsApi';

function SearchForm({ popup, handleOpenPopup, handleClosePopup }) {
  // Variável de estado: controle do input do formulário
  const [queryString, setQueryString] = useState('');

  // Objeto para configurar children de Popups: abertura do search tooltip
  // (SearchTooltip)
  const searchTooltip = {
    children: <SearchTooltip />,
    type: 'tooltip',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida formulário antes de enviar a requisição HTTP à API
    if (queryString.length === 0) {
      // Se não houver palavra-chave, abre modal de informativo ao usuário
      handleOpenPopup(searchTooltip);
    } else {
      // Se houver, envia a solicitação de pesquisa do usuário
      getNews(queryString);
      // E limpa o input e a variável de estado
      setQueryString('');
    }
  };

  return (
    <form className="search__form-news" noValidate onSubmit={handleSubmit}>
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
