// Usando em packages.json o pacote react-router-dom :
// dependencies => react-router-dom na versao 5.2.0
// devDependencies => @Types/react-router-dom na versao 5.1.8
import {
  // BrowserRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import HomeView from './views/Home.view';
import CashFlowExpensesView from './views/CashFlowExpenses.view';
import CashFlowRevenuesView from './views/CashFlowRevenues.view';
import PaymentCreateView from './views/PaymentCreate.view';
import PaymentListView from './views/PaymentList.view';
import UserCreateView from './views/UserCreate.view';
import UserEditView from './views/UserEdit.view';
import UserListView from './views/UserList.view';
import { useEffect, useMemo } from 'react';
import CustomError from 'danielbonifacio-sdk/dist/CustomError';
import { message, notification } from 'antd';
import UserDetailsView from './views/UserDetails.view';
import PaymentDetailsView from './views/PaymentDetails.view';
import AuthService from '../auth/Authorization.service';
import jwtDecode from 'jwt-decode';
import { Authentication } from '../auth/Auth';
import useAuth from '../core/hooks/useAuth';
import GlobalLoading from './components/GlobalLoading';

// Usando variavel de ambiente para determinar valores
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Routes() {
  // Necessários na lógica de autenticação
  const history = useHistory();
  const location = useLocation();
  const { fetchUser, user } = useAuth();

  useEffect(() => {
    window.onunhandledrejection = ({ reason }) => {
      if (reason instanceof CustomError) {
        if (reason.data?.objects) {
          reason.data.objects.forEach((error) => {
            message.error(error.userMessage);
          });
        } else {
          notification.error({
            message: reason.message,
            description:
              reason.data?.detail === 'Network Error'
                ? 'Erro na rede'
                : reason.data?.detail,
          });
        }
      } else {
        reason?.data?.objects?.forEach((object: { userMessage: string }) => {
          message.error(object.userMessage);
        });

        notification.error({
          message: reason?.message || 'Houve um erro',
        });
      }
    };

    return () => {
      window.onunhandledrejection = null;
    };
  }, []);

  // -- Lógica de autenticação - início ---
  // --
  useEffect(() => {
    // Define uma funcão assincrona com await a ser chamada posteriormente (identify)
    async function identify() {
      // Verifica se o usuario está em uma rota de identificação
      // Cria constante para armazenar esta informaçào
      const isInAuthorizationRoute = window.location.pathname === '/authorize';

      // Armazena o code que vem retornado na rota de identificacao após
      // informação das credenciais do usuário que está se cadastrando para uso da aplicação
      const code = new URLSearchParams(window.location.search).get('code');

      // Obtém codeVerifier
      const codeVerifier = AuthService.getCodeVerifier();
      // Obtém accessToken
      const accessToken = AuthService.getAccessToken();

      // Não exista o Access Token armazenado na aplicação e
      //  não estiver na rota de identificação, enviar para tela de login
      if (!accessToken && !isInAuthorizationRoute) {
        AuthService.imperativelySendToLoginScreen();
      }

      // verifica se está na rota de autorização
      if (isInAuthorizationRoute) {
        // Verifica se não tem o código
        if (!code) {
          notification.error({
            message: 'Código não foi informado',
          });
          // Envia para a tela de login
          AuthService.imperativelySendToLoginScreen();
          return; // interrompe a execução
        }

        // verifica se não tem um codeVerifier
        if (!codeVerifier) {
          // necessario fazer logout
          AuthService.imperativelySendToLogout();
          return;
        }

        // busca o primeiro token de acesso
        const { access_token, refresh_token } =
          await AuthService.getFirsAccessTokens({
            code,
            codeVerifier,
            //redirectUri: 'http://localhost:3000/authorize',
            redirectUri: `${APP_BASE_URL}/authorize`,
          });

        // armazena o AccessToken no storage local
        AuthService.setAccessToken(access_token);
        // armazena o RefreshToken no storage local
        AuthService.setRefreshToken(refresh_token);

        // Decodifica o token
        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(access_token);
        // Busca o usuario
        fetchUser(decodedToken['alganews:user_id']);

        // envia o usuario para a home
        history.push('/');
      }

      // Verifica se tem um accessToken
      if (accessToken) {
        // Decodifica o token
        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(accessToken);
        // Busca o usuario
        fetchUser(decodedToken['alganews:user_id']);
      }
    }

    // Executa funcao assincrona de identificação
    identify();
  }, [history, fetchUser]);

  const isAuthorizationRoute = useMemo(
    () => location.pathname === '/authorize',
    [location.pathname]
  );

  if (isAuthorizationRoute || !user) return <GlobalLoading />;
  // --
  // -- Lógica de autenticação - fim ---

  return (
    // <BrowserRouter> // transferido para src/index.tsx para evitar erro
    <Switch>
      <Route path={'/'} exact component={HomeView} />
      <Route path={'/usuarios/cadastro'} exact component={UserCreateView} />
      <Route path={'/usuarios/edicao/:id'} exact component={UserEditView} />
      <Route path={'/usuarios/:id'} exact component={UserDetailsView} />{' '}
      <Route path={'/usuarios'} exact component={UserListView} />
      <Route path={'/pagamentos'} exact component={PaymentListView} />
      <Route
        path={'/pagamentos/cadastro'}
        exact
        component={PaymentCreateView}
      />
      <Route path={'/pagamentos/:id'} exact component={PaymentDetailsView} />
      <Route
        path={'/fluxo-de-caixa/despesas'}
        exact
        component={CashFlowExpensesView}
      />
      <Route
        path={'/fluxo-de-caixa/receitas'}
        exact
        component={CashFlowRevenuesView}
      />
    </Switch>
    // </BrowserRouter>
  );
}
