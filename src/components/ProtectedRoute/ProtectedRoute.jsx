// ----------------------------------------------
// Componente para proteger a rota '/saved-news':
// usuários não autorizados não podem acessá-la
// ----------------------------------------------

import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function ProtectedRoute({ children, handleOpenPopup, signinPopup }) {
  const { loggedIn } = useContext(AuthContext);

  // Efeito colaral: se não estiver logado, além de redirecionar para '/', abre
  // popup de login
  useEffect(() => {
    if (!loggedIn) {
      handleOpenPopup(signinPopup);
    }
  }, [handleOpenPopup, signinPopup, loggedIn]);

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  // Caso contrário, renderiza o componente filho protegido (SavedNewsCardList)
  return children;
}

export default ProtectedRoute;
