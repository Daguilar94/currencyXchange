import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { access_key, lastThreeDays, historyCurrencies } from '../../constants';
import { getHistoryUrl, getLastNDates, buildRateHisrotyState } from '../../utils';
import HistoryRate from '../../components/history-rate';

export default ({ sourceCurrency }) => {
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [history, setHistory] = useState({});
    useEffect(() => {
        setLoadingHistory(true);
        // Promise.all(
        //     getLastNDates(3)
        //     .map(date => axios.get(getHistoryUrl(date),{ params: { access_key } }))
        // )
        new Promise(resolve => setTimeout(() => resolve(lastThreeDays), 3000))
        .then(days => {
            setLoadingHistory(false);
            setHistory(buildRateHisrotyState(days));
        })
        .catch(err => {
            setLoadingHistory(false);
        })
    }, []);

    function renderHistoryDay(day) {
        return (
            <div className="history__day" key={day}>
                <h3>{day}</h3>
                {historyCurrencies.map(currency => (
                    <HistoryRate
                        key={currency}
                        base={sourceCurrency}
                        rate={{ name: currency, value: history[day][currency] }}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="history">
            <h2>Currency History <span>based in {sourceCurrency.name}</span></h2>
            {loadingHistory && <span>loading...</span>}
            {Object.keys(history).map(day => renderHistoryDay(day))}
        </div>
    )
}