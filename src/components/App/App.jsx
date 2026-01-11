import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import AuthContext from '../../contexts/AuthContext';
import { useState } from 'react';
import './App.css';

function App() {
  // Variável de estado: status de login
  const [loggedIn /*, setLoggedIn*/] = useState(false);

  return (
    // Provedor de contexto: compartilha dados de login e do usuário atual
    <AuthContext.Provider
      value={{
        loggedIn, // booleano de estado: status de login
      }}
    >
      <div className="page">
        <Header />
        <Main />
        <About />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
