import { useState } from 'react';
import './SearchForm.css';

import getNews from '../../../../utils/NewsApi';

function SearchForm() {
  // Variável de estado: controle do input do formulário
  const [queryString, setQueryString] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getNews(queryString);
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
    </form>
  );
}

export default SearchForm;
