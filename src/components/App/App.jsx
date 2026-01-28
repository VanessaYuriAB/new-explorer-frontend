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
import { saveNews, unsaveNews /*, getUserNews*/ } from '../../utils/mainApi';
import { useState, useEffect } from 'react';
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
  // Inicia com os dados do localStorage, se houver
  const [searchedNews, setSearchedNews] = useState(() => {
    const searched = localStorage.getItem('searchedNewsData');
    return searched
      ? JSON.parse(searched)
      : { status: null, totalResults: 0, articles: [] };
    // Definição do obj para evitar verificações e erros, não podendo ser null, articles é um array e pode ser iterado sem erros
  });

  // Variável de estado: controle da lista de cartões salvos do usuário atual
  // Inicia, tbm, com os dados do localStorage, se houver
  const [/*savedUserNews,*/ setSavedUserNews] = useState(() => {
    const saved = localStorage.getItem('savedUserNewsData');
    return saved ? JSON.parse(saved) : [];
    // Definição de obj vazio para evitar verificações e erros, não podendo ser null, savedUserNews é um array de objs e pode ser iterado sem erros
  });

  // Efeito para sincronizar o localStorage sempre que o estado para notícias pesquisadas
  // (searchedNews) mudar > para persistência dos dados ao recarregar a página
  useEffect(() => {
    if (searchedNews) {
      localStorage.setItem('searchedNewsData', JSON.stringify(searchedNews));
    }
  }, [searchedNews]);

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
      setSearchedNews(responseOfErrorNews); // status 'error' > para renderização da
      // msg de erro
    }
  };

  // Handler: salvar cards
  const handleSaveCard = async (searchedNewsCard) => {
    try {
      // POST para o banco de dados
      const savedCard = await saveNews(searchedNewsCard);

      // Set do estado para cartões salvos do usuário (savedUserCards)
      setSavedUserNews((prev) => {
        return [...prev, savedCard];
      });
    } catch (error) {
      console.error(`Erro no handleSaveCard: ${error}`);
    }
  };

  // Handlers: des-salvar cards
  const handleUnsaveCard = async (searchedNewsCard) => {
    try {
      // DELETE para o banco de dados
      const unsavedCard = await unsaveNews(searchedNewsCard);

      // Set do estado para cartões salvos do usuário (savedUserCards)
      setSavedUserNews((prev) => {
        // .filter(): cria um novo vetor baseado no original, filtrando elementos e
        // retornando apenas os que estão de acordo com a verificação fornecida
        return prev.filter((userCard) => {
          return userCard.url !== unsavedCard.url; // verificação feita pela .url pq a
          // NewsApi não utiliza o _id no obj do elemento
        });
      });
    } catch (error) {
      console.error(`Erro no handleUnsaveCard: ${error}`);
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
                    searchedNews.status === 'ok' &&
                    searchedNews.totalResults === 0 && <NothingFound />}

                  {/* Se não estiver em loading e houver resultados ou se não estiver em
                  loading e o status for 'error', renderiza o NewsCardList com o devido
                  conteúdo */}

                  {!isSearchLoading &&
                    (searchedNews.totalResults > 0 ||
                      searchedNews.status === 'error') && (
                      <NewsCardList
                        searchedNews={searchedNews}
                        handleSaveCard={handleSaveCard}
                        handleUnsaveCard={handleUnsaveCard}
                      />
                    )}

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
