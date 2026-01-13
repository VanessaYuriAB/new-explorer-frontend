import NewsCard from './components/NewsCard/NewsCard';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
import './NewsCardList.css';

function NewsCardList() {
  // Contexto de autenticação, extraindo estado de login
  const { loggedIn } = useContext(AuthContext);

  return (
    <section className="searched-news main__searched-news">
      <h2 className="searched-news__title">Procurar resultados</h2>
      <div className="searched-news__list">
        {/* Renderizar Cards via .map, de acordo com a lista do resultado da pesquisa */}

        <ul className="searched-news__cards">
          <NewsCard />
          <NewsCard />
          <NewsCard />
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

export default NewsCardList;
