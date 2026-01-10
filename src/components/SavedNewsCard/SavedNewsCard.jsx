import './SavedNewsCard.css';

import imagemTeste from '../../assets/georgia-de-lotz-unsplash.png';

function SavedNewsCard() {
  return (
    <li className="saved-news__card">
      <article className="saved-news__card-art">
        <figure className="saved-news__card-fig">
          {/* Atualizar 'alt' dinâmico, como nome da foto */}

          <img
            className="saved-news__card-img"
            src={imagemTeste}
            alt="Foto da notícia do cartão"
          />
          <figcaption className="saved-news__card-tag">Tag da News</figcaption>
        </figure>

        {/* Tooltip de aviso da lixeira implementado via CSS, com :hover::before (usando
        regra 'content') */}

        <div className="saved-news__card-trash"></div>

        <div className="saved-news__card-infos">
          {/* Atualizar 'datetime' dinâmico */}

          <time className="saved-news__card-date" dateTime="2026-01-09">
            09 de janeiro de 2026
          </time>
          <h3 className="saved-news__card-title">
            A natureza faz de você uma pessoa melhor
          </h3>
          <p className="saved-news__card-text">
            Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há
            milênios: o som dos oceanos, os aromas de uma floresta, a forma como
            a luz do sol dança através das folhas.
          </p>
          <cite className="saved-news__card-source">NATIONAL GEOGRAPHIC</cite>
        </div>
      </article>
    </li>
  );
}

export default SavedNewsCard;
