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

    if (queryString.length === 0) {
      handleOpenPopup(searchTooltip);
    } else {
      getNews(queryString);
    }
  };

  return (
    <form className="search__form-news" onSubmit={handleSubmit}>
      <input
        className="search__form-input"
        type="text"
        placeholder="Inserir tema"
        name="search-news"
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
