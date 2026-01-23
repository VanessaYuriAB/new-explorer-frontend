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
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  // Variável de estado: status de login
  const [loggedIn /*, setLoggedIn*/] = useState(false);

  // Variável de estado: controle dos popups (Signin, Signup e Tooltip)
  const [popup, setPopup] = useState(null);

  // Variável de estado: controle do header e nav para mobile
  const [mobile, setMobile] = useState(false);

  // Hook de localização para saber a rota atual
  const location = useLocation();

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
                  />
                  <NewsCardList />
                  <Preloader />
                  <NothingFound />
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
