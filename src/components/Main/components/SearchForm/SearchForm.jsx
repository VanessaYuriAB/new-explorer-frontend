import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Inserir tema"
        required
      ></input>
      <button className="search__btn" type="submit">
        Procurar
      </button>
    </form>
  );
}

export default SearchForm;
