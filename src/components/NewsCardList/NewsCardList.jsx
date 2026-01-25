import NewsCard from './components/NewsCard/NewsCard';
import AuthContext from '../../contexts/AuthContext';
import { useContext /*, useCallback*/ } from 'react';
import './NewsCardList.css';

function NewsCardList({ searchedNews /*, handleCardSave, handleCardUnsave*/ }) {
  // Contexto de autenticação, extraindo estado de login
  const { loggedIn } = useContext(AuthContext);

  // Memoriza as funções passadas ao NewsCard, para não recriar a cada render
  // Em conjunto com React.memo() para os dados
  /*const memoizedHandleSave = useCallback(
    (card) => handleCardSave(card),
    [handleCardSave],
  );

  const memoizedHandleUnsave = useCallback(
    (card) => handleCardUnsave(card),
    [handleCardUnsave],
  );*/

  // Se a resposta de NewsApi for erro, renderiza a msg de erro
  // Se for o obj com artigos, renderiza os cartões

  if (searchedNews?.status === 'error') {
    return (
      <section className="searched-news main__searched-news">
        <p className="searched-news__msg-error">
          Desculpe, algo deu errado durante a solicitação. Pode haver um
          problema de conexão ou o servidor pode estar inativo. Por favor, tente
          novamente mais tarde.
        </p>
      </section>
    );
  }

  if (searchedNews?.totalResults > 0) {
    return (
      <section className="searched-news main__searched-news">
        <h2 className="searched-news__title">Procurar resultados</h2>
        <div className="searched-news__list">
          {/* Renderiza cards via .map, de acordo com a lista do array do resultado
          da pesquisa */}

          <ul className="searched-news__cards">
            {searchedNews?.articles.map((searchedNewsCard) => (
              /* Aqui, o return é necessário e está implícito: arrow function com
              parênteses, retornando JSX */
              <NewsCard
                key={
                  searchedNewsCard.url
                } /* A API da NewsAPI não fornece _id, então foi aplicado url, por ser
                algo único */
                searchedNewsCard={searchedNewsCard}
                /*handleCardSave={memoizedHandleSave} // valor memorizado
                handleCardUnsave={memoizedHandleUnsave}*/
              />
            ))}
          </ul>
        </div>

        {/* Condição para renderização de versões para o botão: logado e deslogado */}
        <button
          className={`searched-news__btn ${!loggedIn ? 'searched-news__btn_out' : ''} `}
          type="button"
        >
          Mostrar mais
        </button>
      </section>
    );
  }
}

export default NewsCardList;
