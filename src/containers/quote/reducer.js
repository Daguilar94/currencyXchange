import { currencies } from '../../constants';
import {
    SET_RATES,
    SET_MONEY_FIELD,
    SET_UPDATED_RATES,
    SET_RATES_ERROR,
    SET_LOADING_RATES
} from './actions';

export const initialQuoteState = {
    loadingRates: false,
    currencyRates: {},
    ratesError: false,
    updatedMoneyRates: false,
    targetValue: "",
    sourceValue: ""
};

export function reducer(state, action) {
    switch (action.type) {
      case SET_RATES:
        return {
            ...state,
            currencyRates: action.value
        };
      case SET_LOADING_RATES:
      return {
          ...state,
          loadingRates: action.value
      };
      case SET_RATES_ERROR:
        return {
            ...state,
            ratesError: action.value
        };
      case SET_MONEY_FIELD:
        return {
            ...state,
            [action.field]: action.value
        };
      case SET_UPDATED_RATES:
        return {
            ...state,
            updatedMoneyRates: action.value
        };
      default:
        return state;
    }
  }