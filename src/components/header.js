import React from 'react';
import { Image } from 'react-bootstrap';
import coin from '../assets/coin.png';

export default () => (
    <section className="header d-flex flex-column align-items-center w-100 py-5">
        <Image className="header__avatar" src={coin} width="100px" height="100px" roundedCircle/>
        <h1 className="mt-2">Currency Exchange</h1>
    </section>
)