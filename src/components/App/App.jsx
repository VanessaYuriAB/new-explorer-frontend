import Header from '../Header/Header';
import SearchMain from '../SearchMain/SearchMain';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsCardList from '../SavedNewsCardList/SavedNewsCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import About from '../About/About';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import AuthContext from '../../contexts/AuthContext';
import getNews from '../../utils/NewsApi';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  // Hook de localização para saber a rota atual
  const location = useLocation();

  // Variável de estado: status de login
  const [loggedIn /*, setLoggedIn*/] = useState(false);

  // Variável de estado: controle dos popups (Signin, Signup e Tooltip)
  const [popup, setPopup] = useState(null);

  // Variável de estado: controle do header e nav para mobile
  const [mobile, setMobile] = useState(false);

  // Variável de estado: controle do Preloader
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Variável de estado: controle do resultado de notícias pesquisadas
  const [searchedNews, setSearchedNews] = useState(null);

  // Handler para getNews
  const handleGetNews = async (queryToSearch) => {
    try {
      const responseOfNews = await getNews(queryToSearch);

      // Define o estado do resultado de pesquisa, com o obj inteiro retornado
      // Para acesso às propriedades do obj em outras funcionalidades
      // Caso o status seja 'ok' ou, tbm, 'error'; condicionando a renderização de
      // componentes
      setSearchedNews(responseOfNews); // status 'ok'
    } catch (responseOfErrorNews) {
      setSearchedNews(responseOfErrorNews); // status 'error'
    }
  };

  // Handler: abre popup
  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  // Handler: fecha popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    // Provedor de contexto: compartilha dados de login e do usuário atual
    <AuthContext.Provider
      value={{
        loggedIn, // booleano de estado: status de login
      }}
    >
      <div className="page">
        {/* O Header é renderizado estando deslogado ou logado, em '/' */}

        {/* O SavedNewsHeader precisa ser renderizado caso o usuário esteja logado e
        acesse '/saved-news' */}

        {loggedIn && location.pathname === '/saved-news' ? (
          <SavedNewsHeader mobile={mobile} setMobile={setMobile} />
        ) : (
          <Header
            popup={popup}
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
            mobile={mobile}
            setMobile={setMobile}
          />
        )}

        <main className="main page__main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchMain
                    popup={popup}
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    setIsSearchLoading={setIsSearchLoading}
                    handleGetNews={handleGetNews}
                    setSearchedNews={setSearchedNews}
                  />

                  {/* Enquanto a solicitação de pesquisa estiver em loading, renderiza
                  o Preloader */}

                  {isSearchLoading && <Preloader />}

                  {/* Se não estiver em loading e não houver resultados para a pesquisa
                  realizada, renderiza o NothingFound */}

                  {!isSearchLoading &&
                    searchedNews?.status === 'ok' &&
                    searchedNews?.totalResults === 0 && <NothingFound />}

                  {/* Se não estiver em loading e houver resultados, renderiza o
                  NewsCardList */}

                  {/* {!isSearchLoading && searchedNews?.totalResults > 0 && <NewsCardList
                    searchedNews={searchedNews} />} */}

                  <About />
                </>
              }
            />

            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <SavedNewsCardList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
