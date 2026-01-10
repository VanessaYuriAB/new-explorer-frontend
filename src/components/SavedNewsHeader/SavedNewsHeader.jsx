import './SavedNewsHeader.css';
import { Link } from 'react-router-dom';
import SavedNewsNavigation from './components/SavedNewsNavigation/SavedNewsNavigation';
import newsExplorerBlack from '../../assets/news-explorer-logo-black.svg';
import lineHeaderGray from '../../assets/line-header-gray.svg';

function SavedNewsHeader() {
  return (
    <header className="header-news">
      <div className="header-news__box">
        <Link className="header-news__logo-link" to="/">
          <img
            className="header-news__logo"
            src={newsExplorerBlack}
            alt="Logo, escrito NewsExplorer em branco."
          />
        </Link>
        <SavedNewsNavigation />
      </div>
      <img
        className="header-news__line"
        src={lineHeaderGray}
        alt="Linha de divisão do cabeçalho, em branco"
      />
    </header>
  );
}

export default SavedNewsHeader;
