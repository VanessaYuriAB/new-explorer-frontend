import SavedNewsCard from './components/SavedNewsCard/SavedNewsCard';
import './SavedNewsCardList.css';

function SavedNewsCardList({ savedUserNews, handleUnsaveCard }) {
  // Se o array do estado para os cards salvos do usuário estiver vazio, renderiza msg
  if (savedUserNews.length === 0) {
    return (
      <section className="saved-news main__saved-news">
        <div className="saved-news__no-saveds">
          Você não tem nenhum cartão de notícia salvo, Nome.
        </div>
      </section>
    );
  }

  // Se houver objs de cards salvos, renderiza lista do usuário
  if (savedUserNews.length > 0) {
    const firstKeyword = savedUserNews[savedUserNews.length - 1].tag;

    const secondKeyword = savedUserNews[savedUserNews.length - 2]
      ? savedUserNews[savedUserNews.length - 2].tag
      : '';

    const secondSpan = () => {
      // Se houver mais de 2
      if (savedUserNews[savedUserNews.length - 3]) {
        return savedUserNews[savedUserNews.length - 2]
          ? `, ${secondKeyword} `
          : '';
      } else if (savedUserNews[savedUserNews.length - 2]) {
        // Se houverem 2
        return ` e ${secondKeyword} `;
      } else {
        // Se houver apenas 1
        return '';
      }
    };

    const anothersKeywords = savedUserNews[savedUserNews.length - 3]
      ? savedUserNews.length - 2
      : '';

    const anothersSpan = savedUserNews[savedUserNews.length - 3]
      ? `e ${anothersKeywords} outras`
      : '';

    return (
      <section className="saved-news main__saved-news">
        <div className="saved-news__infos">
          <h2 className="saved-news__title">Artigos salvos</h2>
          <p className="saved-news__info">{`Nome, você tem ${savedUserNews.length} artigos salvos`}</p>
          <p className="saved-news__keywords">
            Por palavras-chave: {/* A tag do último e penúlitmo card salvo */}
            <span className="saved-news__keyword">{` ${firstKeyword}`}</span>
            <span className="saved-news__keyword">{`${secondSpan()}`}</span>
            {/* O total de cards salvos no array, subtraído os dois acima */}
            <span className="saved-news__keyword">{`${anothersSpan}`}</span>
          </p>
        </div>
        <div className="saved-news__list">
          {/* Renderiza cards salvos do usuário via .map, de acordo com a lista (array) do
        usuário na API do servidor */}

          <ul className="saved-news__cards">
            {savedUserNews.map((savedCard) => {
              // A lista de cards salvos possui a propriedade _id em cada elemento, pois
              // é o servidor do banco de dados (Mongo DB), mas, para simplificar renderização
              // com backend inativo, é usado a url de cada notícia como 'key'
              return (
                <SavedNewsCard
                  key={savedCard.url}
                  savedCard={savedCard}
                  handleUnsaveCard={handleUnsaveCard}
                />
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default SavedNewsCardList;
