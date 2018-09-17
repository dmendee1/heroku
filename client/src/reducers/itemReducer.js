import {
  GET_DATA,
  ADD_DATA,
  DELETE_DATA,
  DATA_LOADING,
  DATA_DETAIL,
  VERIFY_DETAIL
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        items: action.payload,
        loading: true
      };
    case DATA_DETAIL:
      return {
        ...state,
        order: action.payload,
        loading: true
      }
    case VERIFY_DETAIL:
      return {
        ...state,
        verify: action.payload,
        loading: true
      }
    case DELETE_DATA:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_DATA:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}