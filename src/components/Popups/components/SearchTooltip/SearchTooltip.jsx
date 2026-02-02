import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import './SearchTooltip.css';

function SearchTooltip() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="search__tooltip">
      {loggedIn ? <h2 className="search__tooltip-title">Nome,</h2> : ''}
      <p className="search__tooltip-text">
        Por favor, insira uma palavra-chave.
      </p>
    </div>
  );
}

export default SearchTooltip;
