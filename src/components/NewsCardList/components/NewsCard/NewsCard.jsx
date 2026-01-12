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

  // Verificação para classe do botão 'salvar': a classe 'searched-news__card-btn_active'
  // será aplicada para mostrar que o botão está no status "salvo"
  const getCardBtnClassName = `searched-news__card-btn ${
    isSavedFromCurrentUser ? 'searched-news__card-btn_active' : ''
  }`;

  return (
    <li className="searched-news__card">
      <article className="searched-news__card-art">
        <figure className="searched-news__card-fig">
          {/* Atualizar 'alt' dinâmico, como nome da foto */}

          <img
            className="searched-news__card-img"
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
            <button type="button" className={getCardBtnClassName}></button>
          </>
        ) : (
          /* Deslogado */
          <>
            <button
              type="button"
              className="searched-news__card-btn searched-news__card-btn_out"
            ></button>
          </>
        )}

        <div className="searched-news__card-infos">
          {/* Atualizar 'datetime' dinâmico */}

          <time className="searched-news__card-date" dateTime="2026-01-12">
            12 de janeiro de 2026
          </time>
          <h3 className="searched-news__card-title">
            A natureza faz de você uma pessoa melhor
          </h3>
          <p className="searched-news__card-text">
            Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há
            milênios: o som dos oceanos, os aromas de uma floresta, a forma como
            a luz do sol dança através das folhas.
          </p>
          <cite className="searched-news__card-source">
            NATIONAL GEOGRAPHIC
          </cite>
        </div>
      </article>
    </li>
  );
}

export default NewsCard;
