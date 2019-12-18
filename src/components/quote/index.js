import React, { useEffect, useReducer } from 'react';
import { formatMoney, isMoneyValueValid, unFormatMoney } from '../../utils';
import { ratesExpirationMiliSecs } from '../../constants';
import { initialQuoteState, reducer } from './reducer';
import {
    fetchRates,
    setRates,
    setRatesError,
    updateMoneyField,
    setUpdatedRates,
    setLoadingRates
} from './actions';

export default () => {
    const [state, dispatch] = useReducer(reducer, initialQuoteState);

    useEffect(() => {
        refreshRates();
    }, []);

    const calculateQuote = async (e) => {
        e.preventDefault();
        if (!state.updatedMoneyRates) {
            await refreshRates();
        }
        const {
            sourceCurrency,
            targetCurrency,
            currencyRates,
            sourceValue
        } = state;

        const actualRate = currencyRates[targetCurrency.name] / currencyRates[sourceCurrency.name];
        const sourceNumber = Number(unFormatMoney(sourceValue));
        const newTargetValue = (sourceNumber * actualRate).toFixed(4).toString();
        dispatch(updateMoneyField("targetValue", formatMoney(newTargetValue)));
    }

    const refreshRates = async () => {
        dispatch(setLoadingRates(true));
        await fetchRates()
            .then(res => {
                dispatch(setRates(res.data.rates));
                dispatch(setLoadingRates(false));
                dispatch(setUpdatedRates(true));
                setTimeout(() => dispatch(setUpdatedRates(false)), ratesExpirationMiliSecs);
            })
            .catch(err => {
                dispatch(setLoadingRates(false));
                dispatch(setRatesError(err))
            });
    }

    return (
        <div className="quote">
            <span>{state.loadingRates ? "Loading..." : ""}</span>
            <form action="">
                {state.targetCurrency.sign}
                <input
                    type="text"
                    disabled
                    placeholder={state.targetCurrency.name}
                    value={state.targetValue}
                />

                {state.sourceCurrency.sign}
                <input
                    disabled={state.loadingRates}
                    type="text"
                    placeholder={state.sourceCurrency.name}
                    value={state.sourceValue}
                    onFocus={() => dispatch(
                        updateMoneyField("sourceValue", unFormatMoney(state.sourceValue))
                    )}
                    onChange={({ target: { value } }) => {
                        if (isMoneyValueValid(value)) {
                            dispatch(updateMoneyField("sourceValue", value));
                        }
                    }}
                    onBlur={() => dispatch(
                        updateMoneyField("sourceValue", formatMoney(state.sourceValue))
                    )}
                />
                <button
                    disabled={state.loadingRates}
                    type="submit"
                    onClick={calculateQuote}
                >
                    Calculate
                </button>
            </form>
        </div>
    )
}