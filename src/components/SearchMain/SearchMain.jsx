import SearchForm from './components/SearchForm/SearchForm';
import './SearchMain.css';

function SearchMain({
  popup,
  handleOpenPopup,
  handleClosePopup,
  setIsSearchLoading,
  handleGetNews,
  setSearchedNews,
  queryString,
  setQueryString,
}) {
  return (
    <section className="search main__search">
      <h1 className="search__title">O que está acontecendo no mundo?</h1>
      <p className="search__text">
        Encontre as últimas notícias sobre qualquer tema e salve elas em sua
        conta pessoal
      </p>
      <div className="search__form-box">
        <SearchForm
          popup={popup}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
          setIsSearchLoading={setIsSearchLoading}
          handleGetNews={handleGetNews}
          setSearchedNews={setSearchedNews}
          queryString={queryString}
          setQueryString={setQueryString}
        />
      </div>
    </section>
  );
}

export default SearchMain;
