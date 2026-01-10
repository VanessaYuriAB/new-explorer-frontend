import './Main.css';
import SearchForm from './components/SearchForm/SearchForm';

function Main() {
  return (
    <section className="main">
      <h1 className="main__title">O que está acontecendo no mundo?</h1>
      <p className="main__text">
        Encontre as últimas notícias sobre qualquer tema e salve elas em sua
        conta pessoal
      </p>
      <div className="main__search-news">
        <SearchForm />
      </div>
    </section>
  );
}

export default Main;
