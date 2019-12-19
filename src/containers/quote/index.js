import React, { useEffect, useReducer } from 'react';
import {
    Form,
    Col,
    Button,
    InputGroup,
    FormControl,
    Container,
    Jumbotron
} from 'react-bootstrap';

import { formatMoney, isMoneyValueValid, unFormatMoney, calculateQuoteValue } from '../../utils/utils';
import { ratesExpirationMiliSecs } from '../../utils/constants';

import { initialQuoteState, reducer } from './reducer';
import {
    fetchRates,
    setRates,
    setRatesError,
    updateMoneyField,
    setUpdatedRates,
    setLoadingRates
} from './actions';

import LayoverSpinner from '../../components/layover-spinner';

export default ({ sourceCurrency, targetCurrency}) => {
    const [state, dispatch] = useReducer(reducer, initialQuoteState);

    useEffect(() => {
        refreshRates();
    }, []);

    const calculateQuote = async (e) => {
        e.preventDefault();
        if (!state.updatedMoneyRates) {
            await refreshRates();
        }
        const { currencyRates, sourceValue } = state;

        const newTargetValue = calculateQuoteValue({
            sourceValue,
            currencyRates,
            target: targetCurrency.name,
            source: sourceCurrency.name,
        });

        dispatch(updateMoneyField("targetValue", newTargetValue));
    }

    const refreshRates = async () => {
        dispatch(setLoadingRates(true));
        await fetchRates()
            .then(res => {
                dispatch(setRates(res.data.rates));
                dispatch(setRatesError(false));
                dispatch(setLoadingRates(false));
                dispatch(setUpdatedRates(true));
                setTimeout(() => dispatch(setUpdatedRates(false)), ratesExpirationMiliSecs);
            })
            .catch(() => {
                dispatch(setRatesError(true));
                dispatch(setLoadingRates(false));
            });
    }

    return (
        <Jumbotron className="quote w-100 py-5 px-2 position-relative" fluid>
            {state.loadingRates && <LayoverSpinner />}
            {state.ratesError && <p className="text-danger text-center">Oops, something went wrong :(</p>}
            <Container>
                <Form className="quote__form mx-auto text-center">
                    <Form.Row>
                        <Col xs={12} sm={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">{targetCurrency.sign}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    disabled
                                    placeholder={targetCurrency.name}
                                    type="text"
                                    value={state.targetValue}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">{sourceCurrency.sign}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    placeholder={sourceCurrency.name}
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
                            </InputGroup>
                        </Col>
                    </Form.Row>
                    <Button
                        className="mt-2"
                        size="md"
                        type="submit"
                        onClick={calculateQuote}
                    >
                        Calculate
                    </Button>
                </Form>
            </Container>
        </Jumbotron>
    );
};
