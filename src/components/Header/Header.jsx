import { Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import lineHeader from '../../assets/line-header.svg';
import newsExplorer from '../../assets/news-explorer-logo.svg';
import './Header.css';

function Header({ popup, handleOpenPopup, handleClosePopup }) {
  return (
    <header className="header page__header">
      <div className="header__box">
        <Link className="header__logo-link" to="/">
          <img
            className="header__logo"
            src={newsExplorer}
            alt="Logo, escrito NewsExplorer em branco."
          />
        </Link>
        <Navigation
          popup={popup}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
        />
      </div>
      <img
        className="header__line"
        src={lineHeader}
        alt="Linha de divisão do cabeçalho, em branco"
      />
    </header>
  );
}

export default Header;
