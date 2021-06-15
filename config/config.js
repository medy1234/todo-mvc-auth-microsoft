exports.creds = {
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', 

    clientID: '56f54a95-f63c-4270-87ca-f63036d82979',
  
    clientSecret: 'baa91f23-4f23-4ae4-a93b-fd3e6de659e8', 
  
    responseType: 'code id_token', 
  
    responseMode: 'form_post', 
  
    redirectUrl: 'http://localhost:2121/auth/openid/return', 
  
    allowHttpForRedirectUrl: true,
  
    validateIssuer: false,
  
    issuer: null,
  
    passReqToCallback: false,
  
    useCookieInsteadOfSession: false,
  
    cookieEncryptionKeys: [ 
      { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
      { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
    ],
  
    scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
  
    loggingLevel: false,
  
    nonceLifetime: null,
  
    nonceMaxAmount: 5,
  
    clockSkew: null,
  };
  
  exports.destroySessionUrl = 'http://localhost:2121';
  
  exports.useMongoDBSessionStore = false;
  
  exports.databaseUri = 'mongodb://localhost/OIDCStrategy';
  
  exports.mongoDBSessionMaxAge = 24 * 60 * 60;  
  