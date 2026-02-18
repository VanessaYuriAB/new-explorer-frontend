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
import Signin from '../Popups/components/Signin/Signin';
import Popups from '../Popups/Popups';
import AuthContext from '../../contexts/AuthContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import getNews from '../../utils/NewsApi';
import { register, login } from '../../utils/authApi';
import { saveNews, unsaveNews } from '../../utils/mainApi';
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  // Hook de localização para saber a rota atual
  const location = useLocation();

  // Hook de navegação para redirecionamento de rota
  const navigate = useNavigate();

  /* ------------------------------
              ESTADOS
  ------------------------------- */

  // Variável de estado: status de login
  const [loggedIn, setLoggedIn] = useState(false);

  // Variável de estado: dados do usuário atualmente logado
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
  });

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
      : {
          status: null,
          totalResults: 0,
          articles: [],
          code: null,
          message: null,
        };
    // Definição do obj para evitar verificações e erros, não podendo ser null, articles
    // é um array e pode ser iterado sem erros
    // Propriedades do obj de retorno de erro da Api inclusas no mesmo objeto definido
  });

  // Variável de estado: controle da lista de cartões salvos do usuário atual
  // Inicia, tbm, com os dados do localStorage, se houver
  const [savedUserNews, setSavedUserNews] = useState(() => {
    const saved = localStorage.getItem('savedUserNewsData');
    return saved ? JSON.parse(saved) : [];
    // Definição de vetor vazio para evitar verificações e erros, não podendo ser null,
    // savedUserNews é um array de objs e pode ser iterado sem erros
  });
  /* ------------------------------
              LOGOUT
  ------------------------------- */

  // Manipulador para deslogar: configurado antes do efeito de montagem e memorizado em
  // useCallback para estabilizar e não causar re-render
  const handleLogout = useCallback(() => {
    // Para evitar execução dupla, pq o efeito de montagem tbm chama o logoff
    if (!loggedIn) return;

    // Desabilita o login
    setLoggedIn(false);

    // Limpa estados: perfil + artigos
    setCurrentUser({ email: '', name: '' });
    setSavedUserNews([]);

    // Redireciona para página de início
    navigate('/', { replace: true });
  }, [loggedIn, navigate]);

  /* ------------------------------
              EFEITOS
  ------------------------------- */

  // Efeito para atualizar o localStorage sempre que o estado para notícias pesquisadas
  // (searchedNews) mudar > para persistência dos dados ao recarregar a página
  useEffect(() => {
    if (searchedNews) {
      localStorage.setItem('searchedNewsData', JSON.stringify(searchedNews));
    }
  }, [searchedNews]);

  // Efeito para atualizar o localStorage sempre que o estado para notícias salvas do
  // usuário atual (savedUserNews) mudar > para persistência dos dados ao recarregar a página,
  // configuração para cards salvos ou não salvos
  useEffect(() => {
    if (savedUserNews) {
      localStorage.setItem('savedUserNewsData', JSON.stringify(savedUserNews));
    }
  }, [savedUserNews]);

  /*
  // Efeito 'de montagem' para cards salvos na Api do servidor > apenas com backend ativo
  // Só roda se estiver logado, se não usa dados do localStorage configurados na
  // variável de estado
  useEffect(() => {
    if (!loggedIn) return;

    async function fetchSavedCards() {
      try {
        // Busca cards do usuário atual, na Api do banco de dados
        const userSavedCards = await getUserNews();
        // Seta a variável de estado
        setSavedUserNews(userSavedCards);
      } catch (error) {
        console.error(
          `Erro no efeito 'de montagem' para cards salvos, fetchSavedCards: ${error}`,
        );
      }
    }

    fetchSavedCards();
  }, [loggedIn]);
  */

  // Efeito para mergear lista de cards salvos (do usuário) com a lista de cards
  // retornados da pesquisa > para o ícone do botão 'salvar', no NewsCard
  // Apenas se estiver logado
  useEffect(() => {
    // Se não estiver logado, não executa
    if (!loggedIn) return;

    // Verificação de segurança para erro de leitura de searchedNews.articles > null
    // Com o same dentro do setState, o efeito só altera o estado quando os articles
    // realmente mudam
    if (!searchedNews || !Array.isArray(searchedNews.articles)) return;

    async function mergeNewsLists() {
      // Lista de notícias da pesquisa > searchedNews.articles
      // Lista de notícias salvas do usuário atual > savedUserNews

      try {
        // Dentro do array searchedNews.articles, existe algum elemento com a propriedade
        // url igual a algum elemento dentro do array savedUserNews? Se sim, adiciona flag
        // isSaved como true, se não, como false
        const mergedArticles = searchedNews.articles.map((searchedItem) => {
          const isSaved = savedUserNews.some((savedItem) => {
            return searchedItem.url === savedItem.url;
          });

          return { ...searchedItem, isSaved };
        });

        // Merge: atualizando estado
        setSearchedNews((prev) => {
          // Verificação: evita loop

          // E o efeito só altera o estado quando os articles realmente mudam, por causa
          // do searchedNews nas dependências do efeito e não searchedNews.articles que é
          // o que é realmente utilizado no efeito > recomendado pelo React: não coloque
          // dependência profunda em efeitos pq o React avalia a dependência antes do effect
          // e o estado pode estar null em transições

          // Gerada por I.A. (Copilot)
          const same =
            prev.articles.length === mergedArticles.length &&
            prev.articles.every(
              (a, i) =>
                a.url === mergedArticles[i].url &&
                a.isSaved === mergedArticles[i].isSaved,
            );

          if (same) return prev; // evita re-render

          return { ...prev, articles: mergedArticles };
        });
      } catch (error) {
        console.error(
          'Erro no efeito de merge das listas de cards, mergeNewsLists \n',
          error,
        );
      }
    }

    mergeNewsLists();
  }, [loggedIn, searchedNews, savedUserNews]);

  /* ------------------------------
              HANDLERS
  ------------------------------- */

  // Handler: signup
  const handleRegistration = async (newUserData) => {
    try {
      await register(newUserData);
    } catch (error) {
      console.error(
        'Erro na inscrição do usuário, handleRegistration \n',
        error,
      );
    }
  };

  // Handler: signin
  const handleLogin = async (userData) => {
    try {
      const loggedUser = await login(userData);

      if (loggedUser.token) {
        // Antes de logar, limpa dados anteriores de perfil de usuário
        // Para reforço, pq a limpeza tbm é aplicada no logout
        setCurrentUser({
          email: '',
          name: '',
        });
        setSavedUserNews([]);
      }

      // Login apenas ajusta token, focado na autenticação
      // Dados de perfil apenas no efeito de montagem
      // A lógica de carregamento de perfil pode ser aplicada tanto no login quanto no refresh da página
    } catch (error) {
      console.error('Erro no login, handleLogin \n', error);
    }
  };

  // Handler para getNews + adicionar queryString para a tag do card
  const handleGetNews = async (queryToSearch) => {
    try {
      // GET para a API externa: News Api
      const responseOfNews = await getNews(queryToSearch);

      // Adiciona uma nova propriedade ('tag') no obj de cada cartão, para implementar na
      // tag, se salvo
      const articlesWithTag = responseOfNews.articles.map((card) => {
        return {
          ...card,
          tag: queryToSearch,
        };
      });

      // Atualizado todo o objeto de resposta, com a atualização da flag 'tag' em cada card,
      // no array para artigos
      const responseOfNewsWithTag = {
        ...responseOfNews,
        articles: articlesWithTag,
      };

      // Define o estado do resultado de pesquisa, com o obj inteiro retornado
      // Para acesso às propriedades do obj em outras funcionalidades
      // Caso o status seja 'ok' ou, tbm, 'error'; condicionando a renderização de
      // componentes
      setSearchedNews(responseOfNewsWithTag); // status 'ok'
    } catch (responseOfError) {
      setSearchedNews({
        status: 'error',
        code: responseOfError.code,
        message: responseOfError.message,
        totalResults: 0,
        articles: [],
      }); // status 'error' > para renderização da msg de erro em NewsCardList
    }
  };

  // Handler: salvar cards
  const handleSaveCard = async (searchedNewsCard) => {
    try {
      let savedCard;

      try {
        // POST para o banco de dados
        savedCard = await saveNews(searchedNewsCard);
      } catch {
        // Backend offline → usa fallback local
        savedCard = searchedNewsCard;
      }

      // Set do estado para cartões salvos do usuário (savedUserNews)
      setSavedUserNews((prev) => {
        return [savedCard, ...prev];
      });
    } catch (error) {
      console.error('Erro ao salvar artigo, handleSaveCard \n', error);
    }
  };

  // Handler: des-salvar cards de pesquisa (NewsCard) e remover cards de salvos
  // (SavedNewsCard)
  // useCallback: para memorizar a função e não recriar a cada render > NewsCard
  // e SavedNewsCard
  // Em conjunto com React.memo() e useMemo() para os dados
  const memoizedHandleUnsave = useCallback(async (card) => {
    try {
      let unsavedCard;

      try {
        // DELETE para o banco de dados
        unsavedCard = await unsaveNews(card);
      } catch {
        // backend offline → fallback local
        unsavedCard = card;
      }

      // Set do estado para cartões salvos do usuário (savedUserNews)
      setSavedUserNews((prev) => {
        // .filter(): cria um novo vetor baseado no original, filtrando elementos e
        // retornando apenas os que estão de acordo com a verificação fornecida
        return prev.filter((userCard) => {
          return userCard.url !== unsavedCard.url; // verificação feita pela .url pq a
          // NewsApi não utiliza o _id no obj do elemento
        });
      });
    } catch (error) {
      console.error(
        'Erro ao des-salvar artigo, memoizedHandleUnsave \n',
        error,
      );
    }
  }, []);

  // Handler: abre popup
  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  // Handler: fecha popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  /* ------------------------------
          OBJ SIGNIN POPUP
  ------------------------------- */

  // Objeto para configurar children de Popups para abertura do popup de login (Signin)
  // Obj duplicado, este usado em Navigation e em ForMobileHeaderAndNav
  const signinPopup = {
    children: (
      <Signin
        popup={popup}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />
    ),
    type: 'signin',
  };

  /* ------------------------------
                JSX
  ------------------------------- */

  return (
    // Provedores de contexto: compartilha dados de login e do usuário atual
    <AuthContext.Provider
      value={{
        loggedIn, // booleano de estado: status de login
        setLoggedIn,
        handleRegistration,
        handleLogin,
        handleLogout,
      }}
    >
      <CurrentUserContext.Provider
        value={{ currentUser }} // obj de estado: dados do usuário atual
      >
        <div className="page">
          {/* O Header é renderizado estando deslogado ou logado, em '/' */}

          {/* O SavedNewsHeader precisa ser renderizado caso o usuário esteja logado e
        acesse '/saved-news' */}

          {loggedIn && location.pathname === '/saved-news' ? (
            <SavedNewsHeader mobile={mobile} setMobile={setMobile} />
          ) : (
            <Header
              handleOpenPopup={handleOpenPopup}
              mobile={mobile}
              setMobile={setMobile}
              signinPopup={signinPopup}
            />
          )}

          <main className="main page__main">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchMain
                      handleOpenPopup={handleOpenPopup}
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
                          memoizedHandleUnsave={memoizedHandleUnsave}
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
                    <SavedNewsCardList
                      savedUserNews={savedUserNews}
                      memoizedHandleUnsave={memoizedHandleUnsave}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Se o popup não for nulo, algum dos componentes será renderizado na tela:
        Signup, Signin, SignupTooltip ou SearchTooltip,  */}

          {popup && (
            <Popups
              popup={popup}
              handleClosePopup={handleClosePopup}
              type={popup.type}
            >
              {popup.children}
            </Popups>
          )}
        </div>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
