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
import { setAndStorageToken, getToken, removeToken } from '../../utils/token';
import {
  saveNews,
  unsaveNews,
  getUserNews,
  getCurrentUser,
} from '../../utils/mainApi';
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

  // Variável de estado: token JWT
  const [tokenJwt, setTokenJwt] = useState(() => {
    const jwt = getToken();
    return jwt ? jwt : '';
  });

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
    return saved ? JSON.parse(saved) : { userArticles: [] };
    // Definição de vetor vazio para evitar verificações e erros, não podendo ser null,
    // savedUserNews.userArticles é um array de objs e pode ser iterado sem erros
  });

  // Variável de estado para verificar autenticação ao montar o app
  // Está verificando ou não?
  const [checkingAuth, setCheckingAuth] = useState(true);

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

    // Limpa infos do token com função utilitária (armazenamento local + variável de
    // estado)
    removeToken(setTokenJwt);

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
  // usuário atual (savedUserNews) mudar > para persistência dos dados ao recarregar a
  // página, configuração para cards salvos ou não salvos
  useEffect(() => {
    if (savedUserNews) {
      localStorage.setItem('savedUserNewsData', JSON.stringify(savedUserNews));
    }
  }, [savedUserNews]);

  // Efeito 'de montagem' e refresh: ciclo de autenticação + carregamento: autenticação,
  // fetch de dados do usuário, navegação e set dos estados globais
  // Só roda se estiver com backend ativo (com o token do usuário), se não usa dados do
  // localStorage configurados na variável de estado
  useEffect(() => {
    // Flag para verificar se o componente está montado:
    // evita setState após desmontar
    let isMounted = true;

    // Fetch e set do dados + navegação
    // Define e executa função assíncrona
    (async () => {
      // Verifica se há um JWT no armazenamento local, pela variável state
      // Se não houver, sai da função do efeito
      if (!tokenJwt) {
        setCheckingAuth(false); // sem token, login falso
        return;
      }

      try {
        // Busca infos de perfil do usuário atual
        const userInfos = await getCurrentUser();

        // Busca cards do usuário atual, na Api do banco de dados
        const userSavedCards = await getUserNews();

        // Verifica se o componente ainda está montado
        if (!isMounted) return;

        // Permite login para o usuário
        setLoggedIn(true);

        // Seta variável de estado com dados do backend (user)
        setCurrentUser({
          email: userInfos.user.email,
          name: userInfos.user.name,
        });

        // Seta a variável de estado com dados do backend (articles)
        setSavedUserNews(userSavedCards);

        // Só redireciona se estiver em outra rota
        if (window.location.pathname !== '/') {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error(
          `Erro no efeito 'de montagem', busca e set dos dados do usuário logado \n`,
          error,
        );

        if (!isMounted) return;

        // Se o token for inválido ou ocorrer erro, desloga o usuário
        handleLogout();
      } finally {
        // Se componente estiver montado, finaliza a verificação de autenticação
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    })();
  }, [tokenJwt, navigate, handleLogout]);

  // Efeito derivado, reagindo apenas aos estados relevantes: para sincronizar estados
  // derivados (merge de searchedNews com savedUserNews) e adicionar a info 'isSaved' aos
  // artigos (para o ícone do botão 'salvar', no NewsCard)
  useEffect(() => {
    // Se não estiver logado, não executa
    if (!loggedIn) return;

    // Verificação de segurança para erro de leitura de searchedNews.articles > null
    // Com o same dentro do setState, o efeito só altera o estado quando os articles
    // realmente mudam
    if (!searchedNews || !Array.isArray(searchedNews.articles)) return;

    async function mergeNewsLists() {
      // Lista de notícias da pesquisa > searchedNews.articles
      // Lista de notícias salvas do usuário atual > savedUserNews.userArticles

      try {
        // Dentro do array searchedNews.articles, existe algum elemento com a propriedade
        // url igual a algum elemento dentro do array savedUserNews.userArticles? Se sim,
        // adiciona flag isSaved como true, se não, como false
        const mergedArticles = searchedNews.articles.map((searchedItem) => {
          const isSaved = savedUserNews.userArticles.some((savedItem) => {
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
          // dependência profunda em efeitos pq o React avalia a dependência antes do
          // effect e o estado pode estar null em transições

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

  // Signup e signin sem try/catch para lançar erro, já será lançado naturalmente pela
  // função chamada em cada um (register() ou login()), subindo para o useFormSubmit
  // do seu componente, essencial para o funcionamento de onSuccess e onError

  // Handler: signup
  const handleRegistration = async (newUserData) => {
    await register(newUserData);
  };

  // Handler: signin
  const handleLogin = async (userData) => {
    const loggedUser = await login(userData);

    if (loggedUser.token) {
      // Antes de logar, limpa dados anteriores de perfil de usuário
      // Para reforço, pq a limpeza tbm é aplicada no logout
      setCurrentUser({
        email: '',
        name: '',
      });
      setSavedUserNews([]);

      // Seta token: variável de estado + armazenamento local
      setAndStorageToken(loggedUser.token, setTokenJwt);
    }

    // Login apenas ajusta token, focado na autenticação
    // Dados de perfil apenas no efeito de montagem
    // A lógica de carregamento de perfil pode ser aplicada tanto no login quanto no
    // refresh da página
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

      // Atualizado todo o objeto de resposta, com a atualização da flag 'tag' em cada
      // card, no array para artigos
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
        const normalizeCard = (card) => ({
          tag: card.tag,
          title: card.title,
          description: card.description,
          publishedAt: card.publishedAt,
          source: card.source?.name || null, // para ajustar formato da
          // propriedade source, como esperado no backend, e não retornar
          // 400, devido validação do celebrate/joi
          url: card.url,
          urlToImage: card.urlToImage,
        });

        // POST para o banco de dados
        savedCard = await saveNews(normalizeCard(searchedNewsCard));
      } catch {
        // Backend offline → usa fallback local
        savedCard = searchedNewsCard;
      }

      // Set do estado para cartões salvos do usuário (savedUserNews)
      // Atualiza o array (userArticles) dentro do objeto da variável (savedUserNews),
      // definindo nova lista de objetos de artigos do usuário com a inclusão do novo
      // card no começo do array
      setSavedUserNews((prev) => ({
        userArticles: [savedCard, ...prev.userArticles],
      }));
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
  // Enquanto estiver verificando o login, não renderiza o app,
  // renderiza uma tela de carregamento
  if (checkingAuth) {
    return (
      <div className="loading-screen">
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }

  // Depois que verificar, renderiza o app normalmente
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
