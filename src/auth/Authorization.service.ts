import axios from 'axios';
import qs from 'qs';
import pkceChallenge from 'pkce-challenge';

const authServer = axios.create({
  baseURL: 'http://localhost:8081',
});

// Gera um interceptador de resposta para interceptar as funcoes de erro
authServer.interceptors.response.use(undefined, async (error) => {
  // Toda vez que o servidor de autenticação retornar um status code 401
  // (falta de tokens válidos), força o logout da aplicação e um novo login
  if (error?.response?.status === 401) {
    // Chama o método de logou imperativo quando houver erro 401
    AuthService.imperativelySendSendToLogout();
  }

  return Promise.reject(error);
});

// Define interface com o tipo de retorno do token de resposta da autorizaçãpo
// da requisicao post a ser enviada ao servidor de autenticacao authServer
export interface OAuthAuthorizationTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer' | string;
  expires_in: number;
  scope: string;
  [key: string]: string | number;
}

export default class AuthService {
  // Força o logout
  public static imperativelySendSendToLogout() {
    // Limpa o localStorage da aplicacao
    window.localStorage.clear();
    // envia o usuário para a url de logout do sevidor de autenticação e desabilitar a sua seção
    // do lado do servidor e o redireciona para a página inicial da aplicação
    // que devido au fluxo de login implementado vai direcioná-lo para uma nova autenticação
    window.location.href = `http://localhost:8081/logout?redirect=http://localhost:3000`;
  }

  // Recupera/Renova token
  public static async getNewToken(config: {
    // Define um objeto de configuração para poder obter o AccessToken:
    refreshToken: string;
    codeVerifier: string;
  }) {
    const formUrlEncoded = qs.stringify({
      // Monta o objeto de configuração necessário na requisição para recuperar o token
      refreshToken: config.refreshToken,
      code_verifier: config.codeVerifier,
      grant_type: 'refresh_token',
      client_id: 'alganews-admin',
    });

    // Envia uma requisição e recupera informação (OAuthAuthorizationTokenResponse)
    // retorna uma chamada http para /oauth/token usando o método post
    //  que envia o objeto de configuracao como Content-type : x-www-form-urlencoded
    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth/token', formUrlEncoded, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data); // Obtém a resposta e tráz o res.data
  }

  // Funcão para recuperar o primeiro token de acesso
  public static async getFirsAccessTokens(config: {
    // Define um objeto de configuração para poder obter o primeiro AccessToken:
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }) {
    // Monta o objeto de configuração necessário na requisição para obter o token
    const data = {
      code: config.code,
      code_verifier: config.codeVerifier,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
      client_id: 'alganews-admin',
    };

    // Converte o objeto em string
    const encodedData = qs.stringify(data);

    // Envia uma requisição e recupera informação (OAuthAuthorizationTokenResponse)
    // retorna uma chamada http para /oauth/token usando o método post
    //  que envia o objeto de configuracao como Content-type : x-www-form-urlencoded
    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth/token', encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data); // Obtém a resposta e tráz o res.data
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    // Cria um objeto com informações a serm passadas para a URL de login
    // Transforma o objet em string através da biblioteca qs e do método stringify
    const config = qs.stringify({
      response_type: 'code',
      client_id: 'alganews-admin',
      redirect_uri: `${window.location.origin}/authorize`,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return `http://localhost:8081/oauth/authorize?${config}`;
  }

  public static async imperativelySendToLoginScreen() {
    // Funcao imperativa que gera efeito colateral
    // Chama funcao pkceChallenge que gera code_challenge e code_verifier
    const { code_challenge, code_verifier } = await pkceChallenge();

    // Armazena o code_verifier gerado no storage local
    this.setCodeVerifier(code_verifier);

    // Obtém o loginScreenUrl após passar o code_verifier
    const loginUrl = this.getLoginScreenUrl(code_challenge);

    // Código imperativo abaixo (gera efeito colateral)
    // Envia o usuário para a tela de login
    window.location.href = loginUrl;
  }

  // Getters & Setters para acesso ao Local Storage
  // que irá armazenar AccessToken, RefreshToken e CodeVerifier
  // necessários na segurança da aplicação
  public static getAccessToken() {
    return window.localStorage.getItem('accessToken');
  }
  public static setAccessToken(token: string) {
    return window.localStorage.setItem('accessToken', token);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }
  public static setRefreshToken(token: string) {
    return window.localStorage.setItem('refreshToken', token);
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem('codeVerifier');
  }
  public static setCodeVerifier(getCodeVerifier: string) {
    return window.localStorage.setItem('codeVerifier', getCodeVerifier);
  }
}
