// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const REQUEST_API = 'REQUEST_API';
export const RECIVE_WALLET = 'RECIVE_WALLET';
export const RECEIVE_API_FAIL = 'RECEIVE_API_FAIL';
export const GET_EXPENSES = 'GET_EXPENSES';
export const SUM_EXPENSES = 'SUM_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const reciveWallet = (currencies) => ({
  type: RECIVE_WALLET,
  payload: currencies,
});

export const reciveApiFail = (error) => ({
  type: RECEIVE_API_FAIL,
  error,
});

export const getExpenses = (state) => ({
  type: GET_EXPENSES,
  payload: state,
});

export const sumExpenses = (somma) => ({
  type: SUM_EXPENSES,
  payload: somma,
});

export const deleteExpenses = (remove) => ({
  type: DELETE_EXPENSES,
  payload: remove,
});

export const updateExpenses = (update) => ({
  type: UPDATE_EXPENSES,
  payload: update,
});

export const getCoins = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const result = Object.keys(data).filter((coin) => coin !== 'USDT');
    dispatch(reciveWallet(result));
  } catch (error) {
    dispatch(reciveApiFail(error));
  }
};
