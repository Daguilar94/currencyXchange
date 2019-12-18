import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { access_key, lastThreeDays } from '../../constants';
import { getHistoryUrl, getLastNDates, buildLastDaysState } from '../../utils';

export default () => {
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [history, setHistory] = useState({});
    useEffect(() => {
        setLoadingHistory(true);
        // Promise.all(
        //     getLastNDates(3)
        //     .map(date => axios.get(getHistoryUrl(date),{ params: { access_key } }))
        // )
        new Promise(resolve => setTimeout(() => resolve(lastThreeDays), 2000))
        .then(days => {
            setLoadingHistory(true);
            setHistory(buildLastDaysState(days));
        })
        .catch(err => {
            setLoadingHistory(false);
        })
    }, []);

    return (
        <div className="history">History</div>
    )
}