import React from 'react';
import { historyCurrencies } from '../utils/constants';
import HistoryRate from './history-rate';

export default ({ dayHistory, day, sourceCurrency }) => (
    <div className="history__day" key={day}>
        <h4 className="font-weight-bold text-muted">{day}</h4>
        {historyCurrencies.map(currency => (
            <HistoryRate
                key={currency}
                base={sourceCurrency}
                rate={{ name: currency, value: dayHistory[currency] }}
            />
        ))}
    </div>
);
