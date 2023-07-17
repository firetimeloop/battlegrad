const cspSettings = `
                      default-src 'self';
                      base-uri 'self';
                      connect-src 'self' localhost:${__SERVER_PORT__};
                      font-src 'self';
                      form-action 'self';
                      img-src 'self' localhost:${__SERVER_PORT__};
                      object-src 'self';
                      script-src-attr 'self';
                      style-src 'self' 'unsafe-inline';
                      script-src 'self';
                      upgrade-insecure-requests
                `;

export default cspSettings;
