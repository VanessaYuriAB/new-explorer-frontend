import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedNewsCard from './components/SavedNewsCard/SavedNewsCard';
import './SavedNewsCardList.css';

function SavedNewsCardList({ savedUserNews, memoizedHandleUnsave }) {
  // Contexto do usuário atual: assina o contexto CurrentUserContext
  const { currentUser } = useContext(CurrentUserContext);

  // Se o array do estado para os cards salvos do usuário estiver vazio, renderiza msg
  if (savedUserNews.userArticles.length === 0) {
    return (
      <section className="saved-news main__saved-news">
        <div className="saved-news__no-saveds">
          Você não tem nenhum cartão de notícia salvo,{' '}
          <span className="saved-news__username">{currentUser.name}</span>.
        </div>
      </section>
    );
  }

  // Se houver objs de cards salvos, renderiza lista do usuário
  if (savedUserNews.userArticles.length > 0) {
    /* ----------------
        PRIMEIRA KEY
    -----------------*/

    const firstKeyword =
      savedUserNews.userArticles[savedUserNews.userArticles.length - 1].keyword;

    /* ----------------
        SEGUNDA KEY
    -----------------*/

    // Retorna array com tags diferentes da primeira
    const diferentKey = savedUserNews.userArticles.filter((card) => {
      return card.keyword !== firstKeyword;
    });

    // Retorna o valor da segunda palavra-chave, se houver
    // Se não houver, não quebra a aplicação (?.)
    const secondKey = diferentKey[diferentKey.length - 1]?.keyword;

    // Configura estrutura do texto para a segunda palavra-chave, de acordo com a qtdd
    const secondKeyword = () => {
      // Se houver 1 ou mais
      if (diferentKey.length >= 1) {
        return `, ${secondKey}`;
      }

      // Se não houver nenhuma
      return '';
    };

    /* ----------------
       ANOTHERS KEYS
    -----------------*/

    // Array de palavras-chave totais diferentes das tags do primeiro e segundo span,
    // baseado no vetor resultante para a segunda palavra-chave
    const totalAnothersKeywords = diferentKey.filter((item) => {
      return item.keyword !== secondKey;
    });

    // Transforma totalAnothersKeywords em array contendo apenas tags
    const totalAnothersTags = totalAnothersKeywords.map((item) => {
      return item.keyword;
    });

    // Contabiliza apenas palavras-chave diferentes uma das outras, a partir de
    // totalAnothersTags - se a palavra for repetida, não contabiliza

    /*
    const amountAnothersKeys = [...new Set(totalAnothersTags)].length;
    */

    // 1. Cria um Set a partir do array (remove duplicatas)
    // 2. Transforma o Set de volta em array com [...] ou Array.from()
    // 3. Pega o .length

    const anothersTags = new Set(totalAnothersTags);
    const anothersTagsInArray = Array.from(anothersTags);
    const amountAnothersTags = anothersTagsInArray.length;

    // Configura o texto do span de acordo com a qtdd total
    const amountAnothersKeywords = () => {
      return amountAnothersTags > 0
        ? ` e ${amountAnothersTags} outra(s)`
        : ` e 0 outra(s)`;
    };

    /* ----------------
           JSX
    -----------------*/

    return (
      <section className="saved-news main__saved-news">
        <div className="saved-news__infos">
          <h2 className="saved-news__title">Artigos salvos</h2>
          <p className="saved-news__info">
            <span className="saved-news__username">{currentUser.name}</span>
            {`, você tem ${savedUserNews.userArticles.length} artigo(s) salvo(s)`}
          </p>
          <p className="saved-news__keywords">
            Por palavras-chave:
            {/* Primeira key */}
            <span className="saved-news__keyword">{` ${firstKeyword}`}</span>
            {/* Segunda key */}
            <span className="saved-news__keyword">{`${secondKeyword()}`}</span>
            {/* Anothers Key */}
            <span className="saved-news__keyword">{`${amountAnothersKeywords()}`}</span>
          </p>
        </div>
        <div className="saved-news__list">
          {/* Renderiza cards salvos do usuário via .map, de acordo com a lista (array) do
        usuário na API do servidor */}

          <ul className="saved-news__cards">
            {savedUserNews.userArticles.map((savedCard) => {
              // A lista de cards salvos possui a propriedade _id em cada elemento, pois
              // é o servidor do banco de dados (Mongo DB) > mas, para simplificar
              // renderização, com backend inativo, usar a url de cada notícia como 'key'
              return (
                <SavedNewsCard
                  key={savedCard._id}
                  savedCard={savedCard}
                  memoizedHandleUnsave={memoizedHandleUnsave}
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
