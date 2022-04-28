import Service from 'danielbonifacio-sdk/dist/Service';
import AuthService from './Authorization.service';

// Define um interceptador de requisiçoes
Service.setRequestInterceptors(async (request) => {
  //console.log(request); // Mostra as requisicoes http interceptadas

  // Pega o Access Token
  const storage = {
    accessToken: AuthService.getAccessToken(),
  };

  // Recupera o Access Token do storage
  const { accessToken } = storage;

  // Se o AccessToken existir
  if (accessToken) {
    // injeta o token de acesso na requisição
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // Retorna o objeto de requisição com o AccessToken adicionado, se ele existir
  return request;
});
