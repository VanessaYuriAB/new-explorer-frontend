import './SavedNewsCard.css';

import imgCard from '../../../../assets/card-img-nature.png';

function SavedNewsCard() {
  return (
    <li className="saved-card">
      <article className="saved-card__article">
        <figure className="saved-card__figure">
          {/* Atualizar 'alt' dinâmico, como nome da foto */}

          <img
            className="saved-card__img"
            src={imgCard}
            alt="Foto da notícia do cartão"
          />
          <figcaption className="saved-card__tag">Tag da News</figcaption>
        </figure>

        {/* Tooltip de aviso da lixeira implementado via CSS, com :hover::before (usando
        regra 'content') */}

        <button type="button" className="saved-card__btn"></button>

        <div className="saved-card__infos">
          {/* Atualizar 'datetime' dinâmico */}

          <time className="saved-card__date" dateTime="2026-01-09">
            09 de janeiro de 2026
          </time>
          <h3 className="saved-card__title">
            A natureza faz de você uma pessoa melhor
          </h3>
          <p className="saved-card__text">
            Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há
            milênios: o som dos oceanos, os aromas de uma floresta, a forma como
            a luz do sol dança através das folhas.
          </p>
          <cite className="saved-card__source">NATIONAL GEOGRAPHIC</cite>
        </div>
      </article>
    </li>
  );
}

export default SavedNewsCard;
