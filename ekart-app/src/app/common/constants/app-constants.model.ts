export class AppConstants {
  public static BASE_URL = 'http://localhost:8100/';
  private static OAUTH2_URL = AppConstants.BASE_URL + 'oauth2/authorization/';
  private static GOOGLE_REDIRECT_URL =
    '?redirect_uri=http://localhost:4200/login';
  public static GOOGLE_AUTH_URL =
    AppConstants.OAUTH2_URL + 'google' + AppConstants.GOOGLE_REDIRECT_URL;

  public static GRANT_TYPE = 'authorization_code';
  public static CLIENT_ID = 'client';
  public static REDIRECT_URI = 'http://localhost:4200/oauth2/authorize';
  public static TOKEN_URL = 'http://localhost:8200/oauth2/token';
  public static CODE_VERIFIER =
    '6ee4484aa9417eacae562be1c379678c76264114679fc918c3ca1257';
  public static CODE_CHALLENGE = 'VbGPThDJLPnrIpvD5bfMPkZZywZttd_a9zxsVvSEbj4';

  public static OAUTH_SERVER_URL =
    'http://localhost:8200/oauth2/authorize?response_type=code&client_id=client&redirect_uri=http://localhost:4200/oauth2/authorize&scope=openid profile&code_challenge_method=S256&code_challenge=VbGPThDJLPnrIpvD5bfMPkZZywZttd_a9zxsVvSEbj4';
}
