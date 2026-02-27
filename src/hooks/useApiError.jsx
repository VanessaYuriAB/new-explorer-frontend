import { useCallback } from 'react';
import ApiErrorTooltip from '../components/Popups/components/ApiErrorTooltip/ApiErrorTooltip';

// Para as funções de salvar e des-salvar artigos
// Registro e login são configurados no estado para o span de msg de erro de requisição,
// no próprio componente do form]

// Com useCallback: showApiError fica estável enquanto handleOpenPopup for estável,
// evitando erros por ter showApiError nas dependências do useEffect de montagem

function useApiError(handleOpen) {
  return useCallback(
    (error) => {
      // Define mensagem de erro conforme status
      const message =
        error.status === 429 ? (
          <>
            Foram feitas muitas solicitações para o servidor da página em pouco
            tempo e o acesso foi bloqueado temporariamente.
            <br />
            <br />
            Você pode continuar a pesquisar notícias em alguns minutos.
          </>
        ) : (
          `Não foi possível carregar seus dados agora, por algum erro no servidor.
          Tente recarregar a página ou acessar novamente mais tarde.`
        );

      // Objeto para configurar children de Popups: abertura do popup para msg de erro da
      // Api do backend (servidor), passando msg como props
      // tooltipType para verificação no handleOpenPopup
      const apiErrorTooltip = {
        children: <ApiErrorTooltip message={message} />,
        type: 'tooltip',
        tooltipType: 'apiError',
      };

      // Chama o handle de abertura de Popups
      handleOpen(apiErrorTooltip);
    },
    [handleOpen],
  );
}

export default useApiError;

/*
O error não precisa ser passado para a função “maior” (useApiError), porque ele é passado
no momento certo, para a função retornada, graças a closures

useApiError retorna uma função e essa função recebe error depois

Padrão clássico de closures em JavaScript. Segundo a definição formal, uma closure é uma
função que “lembra” do escopo onde foi criada, mesmo sendo executada depois, em outro momento
do tempo

Render do componente
const showApiError = useApiError(handleOpenPopup)

useApiError é executado
não tem erro nenhum ainda
retorna uma função
essa função fecha (closure) sobre openPopup

Não acontece nada relacionado a error

Algum evento acontece (ex: click → API → erro)
catch (error) {
  showApiError(error);
}

a função retornada é executada
agora sim o error existe
ele entra como argumento da função interna

useApiError
conhece como exibir erro
conhece o popup
conhece o texto

catch
só passa o erro
não sabe nada de UI

É o que o React recomenda para reutilização de lógica via custom hooks

O que showApiError realmente é
const showApiError = useApiError(handleOpenPopup);

O que acontece é:

useApiError(handleOpenPopup) é executado agora
ele retorna uma função
essa função retornada é atribuída a showApiError

Na prática:
showApiError === (error) => { ... }

Padrão clássico de função que retorna função (closure) em JavaScript, conforme a definição
formal de closures: a função interna mantém acesso ao escopo onde foi criada (neste caso,
openPopup) e recebe seus próprios parâmetros quando for chamada

Closure + função de ordem superior
*/
