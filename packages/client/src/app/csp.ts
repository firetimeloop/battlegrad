/* eslint-disable max-len */
// localhost:24678 используется Vite для web socket. Без него в Docker выдает ошибку при SSR

const cspSettings = `
                      default-src 'self';
                      base-uri 'self';
                      connect-src 'self' localhost:3000 localhost:3001 localhost:24678 https://ya-praktikum.tech/api/v2/;
                      font-src 'self';
                      form-action 'self';
                      img-src 'self' localhost:3000 localhost:3001 https://ya-praktikum.tech/api/v2/;
                      object-src 'self';
                      script-src-attr 'self';
                      style-src 'self' 'unsafe-inline';
                      script-src 'self';
                      upgrade-insecure-requests
                `;

export default cspSettings;
