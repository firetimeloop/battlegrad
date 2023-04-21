import { render, screen } from '@testing-library/react';

const appContent = 'Вот тут будет жить ваше приложение :)';

// @ts-ignore
global.fetch = jest.fn(() => (
  Promise.resolve({ json: () => Promise.resolve('hey') })
));

test('Example test', async () => {
  render(<div>Вот тут будет жить ваше приложение :)</div>);
  expect(screen.getByText(appContent)).toBeDefined();
});
