// localhost:24678 используется Vite для web socket. Без него в Docker выдает ошибку при SSR

const cspSettings = `
                      default-src 'self';
                      base-uri 'self';
                      connect-src 'self' localhost:${__SERVER_PORT__} localhost:24678;
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
