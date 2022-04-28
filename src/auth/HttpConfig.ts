import axios from 'axios';
import Service from 'danielbonifacio-sdk/dist/Service';
import AuthService from './Authorization.service';

// Define um interceptador de requisiçoes
Service.setRequestInterceptors(async (request) => {
  //console.log(request); // Mostra as requisicoes http interceptadas

  // Pega o Access Token
  const accessToken = AuthService.getAccessToken();

  // Se o AccessToken existir
  // injeta o token de acesso na requisição
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // Retorna o objeto de requisição com o AccessToken adicionado, se ele existir
  return request;
});

// Define um interceptador de respostas
Service.setResponseInterceptors(
  (response) => response,
  async (error) => {
    //console.dir(error);
    // recupera informações da requisição
    const originalRequest = error.config;

    // verifica se enviou um token errado ou nao passou um token
    // caso o erro seja de autenticação e ainda não foi feito o retry
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // vai tentar buscar essa informação novamente

      // recupera o code verifier e o refresh token
      const storage = {
        codeVerifier: AuthService.getCodeVerifier(),
        refreshToken: AuthService.getRefreshToken(),
      };

      const { codeVerifier, refreshToken } = storage;

      // caso algum não exita, não é possível renovar o token
      if (!refreshToken || !codeVerifier) {
        window.alert('TODO: Implementar Logout');
        return;
      }

      // renova o token
      const tokens = await AuthService.getNewToken({
        codeVerifier,
        refreshToken,
      });

      // Armazena os token para novas requisições
      AuthService.setAccessToken(tokens.access_token);
      AuthService.setRefreshToken(tokens.refresh_token);

      // implementa o token na requisição
      originalRequest.headers[
        'Authorization'
      ] = `Bearer ${tokens.access_token}`;

      // retorna uma nova chamada do axios com essa requisição
      return axios(originalRequest);
    }
  }
);