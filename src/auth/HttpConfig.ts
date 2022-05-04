import axios from 'axios';
import Service from 'danielbonifacio-sdk/dist/Service';
import AuthService from './Authorization.service';

// Usando variavel de ambiente para determinar valores
const { REACT_APP_API_BASE_URL } = process.env;

// Ajustando a base URL da API no danielbonifacio-sdk
if (REACT_APP_API_BASE_URL) Service.setBaseUrl(REACT_APP_API_BASE_URL);

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
    // recupera informações da requisição original
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

      // Desestrutura o codeVerifier e o refreshToken do storage
      const { codeVerifier, refreshToken } = storage;

      // caso algum não exita, não é possível renovar o token
      if (!refreshToken || !codeVerifier) {
        // Envia para a tela de logout
        AuthService.imperativelySendToLogout();
        return;
      }

      // renova o token
      const tokens = await AuthService.getNewToken({
        codeVerifier,
        refreshToken,
      });

      // Armazena os tokens para novas requisições
      AuthService.setAccessToken(tokens.access_token);
      AuthService.setRefreshToken(tokens.refresh_token);

      // implementa o token na requisição
      originalRequest.headers[
        'Authorization'
      ] = `Bearer ${tokens.access_token}`;

      // retorna uma nova chamada do axios com essa requisição
      return axios(originalRequest);
    }

    // Correção aula 17.15 - Não está capturando o erro de permissão
    //app.algaworks.com/forum/topicos/85217/cannot-read-properties-of-undefined-reading-data
    //return Promise.reject(error);
    //throw error;
    //
    // Retornando o erro para poder fazer qualquer outra trataviva - Corrigido na aula 17.35
    //return Promise.reject(error);
    // Correção final adotada
    throw error;
  }
);
