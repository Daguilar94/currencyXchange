import React from 'react';

export default ({ base, rate }) => {
    return <div>1 {base.name} = {rate.value} {rate.name}</div>;
};