import { access_key, ratesUrl } from '../../utils/constants';
import axios from 'axios';

export const SET_RATES = "SET_RATES";
export const SET_RATES_ERROR = "SET_RATES_ERROR";
export const SET_MONEY_FIELD = "SET_MONEY_FIELD";
export const SET_UPDATED_RATES = "SET_UPDATED_RATES";
export const SET_LOADING_RATES = "SET_LOADING_RATES";

export function fetchRates() {
    return axios.get(`${ratesUrl}latest`,{ params: { access_key } });
};

export function setLoadingRates(value) { return { type: SET_LOADING_RATES, value }};

export function setRatesError(value) { return { type: SET_RATES_ERROR, value }};

export function setRates(rates) { return { type: SET_RATES, value: rates }};

export function updateMoneyField(field, value) {
    return {
        type: SET_MONEY_FIELD,
        field,
        value
    };
};

export function setUpdatedRates(value) {
    return {
        type: SET_UPDATED_RATES,
        value
    };
};