import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search__form-news">
      <input
        className="search__form-input"
        type="text"
        placeholder="Inserir tema"
        name="search-news"
        required
      ></input>
      <button className="search__form-btn" type="submit">
        Procurar
      </button>
    </form>
  );
}

export default SearchForm;
