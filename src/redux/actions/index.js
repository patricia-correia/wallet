// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const REQUEST_API = 'REQUEST_API';
export const RECIVE_WALLET = 'ADD_WALLET';
export const RECEIVE_API_FAIL = 'RECEIVE_API_FAIL';

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

export const getCoins = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const result = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await result.json();
    const currencies = Object.keys(data).filter((coin) => coin !== 'USDT');
    dispatch(reciveWallet(currencies));
  } catch (error) {
    dispatch(reciveApiFail(error));
  }
};
