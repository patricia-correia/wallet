import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
import Table from '../../components/Table';
import WalletForm from '../../components/WalletForm';
import mockData from './mockData';


describe('Testa a tela Wallet', () => {
  test('testa o header da pagina', () => {
    renderWithRouterAndRedux(<Wallet />)

    const emailUser = screen.getByTestId("email-field");
    expect(emailUser).toBeInTheDocument();

    const valueUser = screen.getByTestId("total-field");
    expect(valueUser).toBeInTheDocument();

    const currencyUser = screen.getByTestId("header-currency-field");
    const currencyUserBrl = screen.getByText("BRL");

    expect(currencyUser).toBeInTheDocument();
    expect(currencyUserBrl).toBeInTheDocument();
  });

  test('testa os valores do walletForm na página', () => {
    renderWithRouterAndRedux(<WalletForm />)

    const valueInput = screen.getByTestId("value-input");
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getByTestId("value-input");
    expect(descriptionInput).toBeInTheDocument();

    const currencyInput = screen.getByTestId("currency-input");
    expect(currencyInput).toBeInTheDocument();

    const methodInput = screen.getByTestId("method-input");
    expect(methodInput).toBeInTheDocument();

    const addDespesasbutton = screen.getByRole('button', {
      name: /adicionar despesas/i
    })
    expect(addDespesasbutton).toBeInTheDocument();
  });

  test('', () => {
    renderWithRouterAndRedux(<Table />);

    const descricao = screen.getByRole('columnheader', {
      name: /descrição/i
    })
    expect(descricao).toBeInTheDocument()

    const tag = screen.getByRole('columnheader', {
      name: /tag/i
    })
    expect(tag).toBeInTheDocument();

    const metodoDePagamento = screen.getByRole('columnheader', {
      name: /método de pagamento/i
    })
    expect(metodoDePagamento).toBeInTheDocument();

    const cambioUtilizado = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i
    })
    expect(cambioUtilizado).toBeInTheDocument();

    const valorConvertido = screen.getByRole('columnheader', {
      name: /valor convertido/i
    })
    expect(valorConvertido).toBeInTheDocument();

    const moedaDeConversao = screen.getByRole('columnheader', {
      name: /moeda de conversão/i
    })
    expect(moedaDeConversao).toBeInTheDocument();

    const editarAndExcluir = screen.getByRole('columnheader', {
      name: /editar\/excluir/i
    })
    expect(editarAndExcluir).toBeInTheDocument();
  });

  test('testando botões do componete Table', () => {
    renderWithRouterAndRedux(<Wallet />);


    const valueInput = screen.getByTestId('value-input');
    const descriptInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesas' });


    expect(valueInput).toBeInTheDocument();
    expect(descriptInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    
    userEvent.type(valueInput, 10);
    userEvent.type(descriptInput, 'comida');
    userEvent.click(button);
    
  });
});