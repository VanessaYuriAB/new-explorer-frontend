import './Header.css';
import { Link } from 'react-router-dom';
import newsExplorer from '../../assets/news-explorer-logo.svg';
import Navigation from './components/Navigation/Navigation';
import lineHeader from '../../assets/line-header.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__box">
        <Link className="header__logo-link" to="/">
          <img
            className="header__logo"
            src={newsExplorer}
            alt="Logo, escrito NewsExplorer em branco."
          />
        </Link>
        <Navigation />
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
