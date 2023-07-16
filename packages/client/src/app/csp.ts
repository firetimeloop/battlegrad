const cspSettings = `
                      default-src 'self';
                      base-uri 'self';
                      connect-src 'self' localhost:3001;
                      font-src 'self';
                      form-action 'self';
                      img-src 'self' localhost:3001;
                      object-src 'self';
                      script-src-attr 'self';
                      style-src 'self' 'unsafe-inline';
                      script-src 'self';
                      upgrade-insecure-requests
                `;

export default cspSettings;
