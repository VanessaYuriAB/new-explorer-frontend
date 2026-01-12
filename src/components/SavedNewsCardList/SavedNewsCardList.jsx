import SavedNewsCard from './components/SavedNewsCard/SavedNewsCard';
import './SavedNewsCardList.css';

function SavedNews() {
  return (
    <section className="saved-news">
      <div className="saved-news__infos">
        <h2 className="saved-news__title">Artigos salvos</h2>
        <p className="saved-news__info">Nome, você tem 5 artigos salvos</p>
        <p className="saved-news__keywords">
          Por palavras-chave:{' '}
          <span className="saved-news__keyword">Natureza</span>,
          <span className="saved-news__keyword"> Yellowstone</span>,
          <span className="saved-news__keyword"> e 2 outras</span>
        </p>
      </div>
      <div className="saved-news__list">
        {/* Renderizar Cards via .map, de acordo com a lista do usuário na API */}

        <ul className="saved-news__cards">
          <SavedNewsCard />
          <SavedNewsCard />
          <SavedNewsCard />
          <SavedNewsCard />
        </ul>
      </div>
    </section>
  );
}

export default SavedNews;
