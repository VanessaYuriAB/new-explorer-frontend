import { useEffect } from 'react';
import { enableValidation } from '../utils/formsValidation';
import { signupConfig, signinConfig } from '../utils/validationConfigs';

// Hook para aplicar a validação em popups form (Signup e Signin)
function useFormValidation(popup, type) {
  useEffect(() => {
    if (popup && (type === 'signup' || type === 'signin')) {
      // Se for o popup do formulário de registro, define como signupConfig; se for o de
      // login, define signinConfig
      const config = type === 'signup' ? signupConfig : signinConfig;

      enableValidation(config);
    }
  }, [popup, type]);
}

export default useFormValidation;
