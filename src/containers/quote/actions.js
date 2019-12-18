import { access_key, latestRates, ratesUrl } from '../../constants';
import axios from 'axios';

export const SET_RATES = "SET_RATES";
export const SET_RATES_ERROR = "SET_RATES";
export const SET_MONEY_FIELD = "SET_MONEY_FIELD";
export const SET_UPDATED_RATES = "SET_UPDATED_RATES";
export const SET_LOADING_RATES = "SET_LOADING_RATES";

export function fetchRates() {
    // return axios.get(ratesUrl,{ params: { access_key } });
    return new Promise(resolve => {
        setTimeout(() => resolve({ data: { rates: latestRates } }), 2000);
    })
};

export function setLoadingRates(value) { return { type: SET_LOADING_RATES, value }};

export function setRatesError(err) { return { type: SET_RATES_ERROR, value: err }};

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