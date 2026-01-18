import { Link } from 'react-router-dom';
import SavedNewsNavigation from './components/SavedNewsNavigation/SavedNewsNavigation';
import ForMobileSavedNewsHeaderAndNav from './components/ForMobileSavedNewsHeaderAndNav/ForMobileSavedNewsHeaderAndNav';
import newsExplorerBlack from '../../assets/news-explorer-logo-black.svg';
import lineHeaderGray from '../../assets/line-header-gray.svg';
import './SavedNewsHeader.css';

function SavedNewsHeader({ mobile, setMobile }) {
  return (
    <header className="header-news page__header-news">
      <div className="header-news__box">
        {/* __logo-box adicionado para configuração do layout de menu para mobile */}
        <div className="header-news__logo-box">
          <Link className="header-news__logo-link" to="/">
            <img
              className="header-news__logo-img"
              src={newsExplorerBlack}
              alt="Logo, escrito NewsExplorer em branco."
            />
          </Link>
          <button
            className="header-news__logo-menu"
            type="button"
            onClick={() => setMobile(true)}
          ></button>
        </div>
        <SavedNewsNavigation />
      </div>
      <img
        className="header-news__line"
        src={lineHeaderGray}
        alt="Linha de divisão do cabeçalho, em branco"
      />

      {mobile && <ForMobileSavedNewsHeaderAndNav setMobile={setMobile} />}
    </header>
  );
}

export default SavedNewsHeader;
