// ----------------------------------------------
// Componente para proteger a rota '/saved-news':
// usuários não autorizados não podem acessá-la
// ----------------------------------------------

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { loggedIn } = useContext(AuthContext);

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  // Caso contrário, renderiza o componente filho protegido (SavedNewsCardList)
  return children;
}

export default ProtectedRoute;
