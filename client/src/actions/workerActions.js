import axios from 'axios';
import { GET_DATA, ADD_DATA, DELETE_DATA, DATA_LOADING, GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';

export const getWorkers = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/workers').then(res =>
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  );
};

export const getDepWorker = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/workers').then(res =>
    dispatch({
      type: GET_DATA,
      payload: id
    })
  )
}

export const registerUser = (user) => dispatch => {
  axios.post('/api/workers/register', user)
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
};

export const deleteWorker = id => dispatch => {
  axios.delete(`/api/workers/${id}`).then(res =>
    dispatch({
      type: DELETE_DATA,
      payload: id
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: DATA_LOADING
  };
};

export const loginUser = (user) => dispatch => {
  axios.post('/api/workers/login', user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      });
    });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
