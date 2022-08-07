import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testa a tela de Login', () => {
  test('testa as funcionalidade da pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const emailInput = screen.getByTestId("email-input")
    expect(emailInput).toBeInTheDocument();

    const senhaInput = screen.getByTestId("password-input")
    expect(senhaInput).toBeInTheDocument();

    const startButton = screen.getByRole('button', {
      name: /entrar/i
    });
    expect(startButton).toBeInTheDocument();
    expect(startButton).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    expect(startButton).toBeDisabled();

    userEvent.type(senhaInput, '123456');
    expect(startButton).not.toBeDisabled();

    userEvent.click(startButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('testa se está renderizando a pagina na rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const buttonEntrar = screen.getByRole('button', { name: /Entrar/i });

    userEvent.click(buttonEntrar);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});