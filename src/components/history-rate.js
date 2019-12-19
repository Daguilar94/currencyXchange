import React from 'react';

export default ({ base, rate }) => {
    return (
        <div className="history__rate d-flex align-items-center">
            <span>1 <span className="font-weight-bold text-muted">{base.name}</span></span>
            <span className="rate-separator flex-grow-1 mx-2"></span>
            <span>{rate.value} <span className="font-weight-bold text-muted">{rate.name}</span></span>
        </div>
    );
};