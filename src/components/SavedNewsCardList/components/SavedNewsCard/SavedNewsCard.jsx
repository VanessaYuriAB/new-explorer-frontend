import React from 'react';
import useFormattedDateBR from '../../../../hooks/useformattedDateBR';
import imgIndisponivel from '../../../../assets/img-indisponivel.jpg';
import './SavedNewsCard.css';

function SavedNewsCard({ savedCard, memoizedHandleUnsave }) {
  // Desestruturação das propriedades de cada card salvo
  const { source, title, description, url, urlToImage, publishedAt, tag } =
    savedCard;

  const { name } = source;

  // Reformatação da data (publishedAt) com hook personalizado
  const formattedDateBR = useFormattedDateBR(publishedAt);

  return (
    <li className="saved-card">
      <article className="saved-card__article">
        <figure className="saved-card__figure">
          <img
            className="saved-card__img"
            src={urlToImage ? urlToImage : imgIndisponivel}
            alt={`Imagem do artigo: ${title ? title : 'descrição indisponível'}`}
          />
          <figcaption className="saved-card__tag">{`${tag}`}</figcaption>
        </figure>

        {/* Tooltip de aviso da lixeira implementado via CSS, com :hover::before (usando
        regra 'content') */}

        <button
          type="button"
          className="saved-card__btn"
          aria-label="Remover dos salvos"
          onClick={() => memoizedHandleUnsave(savedCard)}
        ></button>

        <div className="saved-card__infos">
          {/* Atualizar 'datetime' dinâmico */}

          <time className="saved-card__date" dateTime={publishedAt}>
            {`${formattedDateBR}`}
          </time>

          {/* Tag __title-link apenas para envolver o títutlo com link e redirecionar
          para a página da notícia */}

          <a
            className="saved-card__title-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="saved-card__title">
              {`${title ? title : 'Título indisponível'}`}
            </h3>
          </a>

          <p className="saved-card__text">
            {`${description ? description : 'Descrição indisponível'}`}
          </p>
          <cite className="saved-card__source">{`${name ? name : 'Fonte indisponível'}`}</cite>
        </div>
      </article>
    </li>
  );
}

// Exporta envolto em memo
export default React.memo(SavedNewsCard);
