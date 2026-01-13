import { useContext, useState } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import './NewsCard.css';

import imgNewCard from '../../../../assets/card-img-nature.png';

function NewsCard() {
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
          {/* Atualizar 'alt' dinâmico, como nome da foto */}

          <img
            className="new-card__img"
            src={imgNewCard}
            alt="Foto da notícia do cartão"
          />
        </figure>

        {/* Tooltip de aviso do botão implementado via CSS, com :hover::before (usando
            regra 'content') */}

        {/* Condição para renderização de versões para o tooltip do botão: versão logada e versão deslogada */}

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
          {/* Atualizar 'datetime' dinâmico */}

          <time className="new-card__date" dateTime="2026-01-12">
            12 de janeiro de 2026
          </time>
          <h3 className="new-card__title">
            A natureza faz de você uma pessoa melhor
          </h3>
          <p className="new-card__text">
            Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há
            milênios: o som dos oceanos, os aromas de uma floresta, a forma como
            a luz do sol dança através das folhas.
          </p>
          <cite className="new-card__source">NATIONAL GEOGRAPHIC</cite>
        </div>
      </article>
    </li>
  );
}

export default NewsCard;
