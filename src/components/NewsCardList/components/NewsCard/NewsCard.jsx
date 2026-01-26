import React, { useContext, useState, useMemo } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import './NewsCard.css';

function NewsCard({ searchedNewsCard /*, handleCardSave, handleCardUnsave*/ }) {
  // Desestruturação de propriedades do obj para cada notícia, dentro do array de
  // artigos da resposta bem-sucedida da NewsApi
  const { source, title, description, url, urlToImage, publishedAt } =
    searchedNewsCard;

  // Reformatação da data (publishedAt) com Intl.DateTimeFormat
  // For Brazilian Portuguese: "26 de janeiro de 2025"
  // useMemo para evitar processamento de cálculos desnecessários
  // Verificação da propriedade, com fallback caso não exista
  const formattedDateBR = useMemo(() => {
    return publishedAt
      ? new Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(publishedAt))
      : 'Data indisponível';
  }, [publishedAt]);

  // Contexto de autenticação, extraindo estado de login
  const { loggedIn } = useContext(AuthContext);

  // Variável de estado temporária para estado ativo do botão 'salvar'
  const [isSavedFromCurrentUser /*, setIsSavedFromCurrentUser*/] =
    useState(true);

  // Verificação para classe do botão 'salvar': a classe 'new-card__btn_active'
  // será aplicada para mostrar que o botão está no status "salvo"
  const getCardBtnClassName = `new-card__btn ${
    isSavedFromCurrentUser ? 'new-card__btn_active' : ''
  }`;

  return (
    <li className="new-card">
      <article className="new-card__article">
        <figure className="new-card__figure">
          <img className="new-card__img" src={urlToImage} alt={title} />
        </figure>

        {/* Tooltip de aviso do botão implementado via CSS, com :hover::before (usando
            regra 'content') */}

        {/* Condição para renderização de versões para o tooltip do botão: versão logada e
        versão deslogada */}

        {loggedIn ? (
          /* Logado */
          <>
            <button className={getCardBtnClassName} type="button"></button>
          </>
        ) : (
          /* Deslogado */
          <>
            <button
              className="new-card__btn new-card__btn_out"
              type="button"
            ></button>
          </>
        )}

        <div className="new-card__infos">
          <time className="new-card__date" dateTime={publishedAt}>
            {`${formattedDateBR}`}
          </time>

          {/* Tag __title-link apenas para envolver o títutlo com link e redirecionar
          para a página da notícia */}

          <a
            className="new-card__title-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="new-card__title">{`${title}`}</h3>
          </a>

          <p className="new-card__text">{`${description}`}</p>
          <cite className="new-card__source">{`${source.name}`}</cite>
        </div>
      </article>
    </li>
  );
}

// Exporta envolto em memo
// Evita renderizações desnecessárias de componentes funcionais, memoriza o resultado da
// renderização e só re-renderiza se as props mudarem
// Os cartões que não tiveram suas props alteradas não serão re-renderizados, apenas os
// novos a serem mostrados
export default React.memo(NewsCard);
