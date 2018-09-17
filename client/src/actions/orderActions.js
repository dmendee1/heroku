import axios from 'axios';
import { GET_DATA, DATA_DETAIL, ADD_DATA, DELETE_DATA, DATA_LOADING, VERIFY_DETAIL, DATA_LOG } from './types';

export const getOrders = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post(`/api/orders/filter`, item).then(res =>
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  );
};

export const getOrderInformation = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post('/api/orders/getOrder', item).then(res =>
    dispatch({
      type: DATA_DETAIL,
      payload: res.data
    })
  )
}

export const getLog = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post('/api/orders/getLog', item).then(res => 
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  )
}

export const changeOrderStatus = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post('/api/orders/changeStatus', item).then(res => 
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  )
}

export const getVerifys = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post('/api/orders/getVerify', item).then(res => 
      dispatch({
        type: VERIFY_DETAIL,
        payload: res.data
      })
    )
}

export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export const uploadImageOrder = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post('/api/orders/upload', item).then(res => 
    dispatch({
      type: ADD_DATA,
      payload: res.data
    })
  );
}

export const getOrder = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/orders/`).then(res =>
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  );
};

export const getFilters = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/orderDetail/${id}`).then(res =>
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  );
}

export const addOrder = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post(`/api/orders`, item).then(res =>
    dispatch({
      type: ADD_DATA,
      payload: res.data
    })
  );
};

export const addOrderDetail = item => dispatch => {
  dispatch(setItemsLoading());
  axios.post(`/api/orderDetail`, item).then(res =>
    dispatch({
      type: ADD_DATA,
      payload: res.data
    })
  );
};

export const deleteOrderDetail = id => dispatch => {
  dispatch(setItemsLoading());
  axios.delete(`/api/orderDetail/${id}`).then(res =>
    dispatch({
      type: DELETE_DATA,
      payload: id
    })
  );
}

export const updateOrderStatus = (row, cellName, cellValue) => dispatch => {
  dispatch(setItemsLoading());
  const item = {
    "id": row.id,
    "field": cellName,
    "value": cellValue
  }
  axios.post('/api/order/update', item).then(res => {
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  })
}

export const updateOrderDetail = (row, cellName, cellValue) => dispatch => {
  dispatch(setItemsLoading());
  const item = {
    "id": row.id,
    "field": cellName,
    "value": cellValue
  }
  axios.post('/api/orderDetail/update', item).then(res=>
    dispatch({
      type: GET_DATA,
      payload: res.data
    })
  );
}

export const setItemsLoading = () => {
  return {
    type: DATA_LOADING
  };
};
