import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsCardList from '../SavedNewsCardList/SavedNewsCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import About from '../About/About';
import AuthContext from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function App() {
  // Variável de estado: status de login
  const [loggedIn /*, setLoggedIn*/] = useState(true);

  // Hook de localização para saber a rota atual
  const location = useLocation();

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
          <>
            <SavedNewsHeader />
            <SavedNewsCardList />
          </>
        ) : (
          <>
            <Header />
            <Main />
            <Preloader />
            <NothingFound />
            <About />
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
