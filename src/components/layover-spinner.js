import React from 'react';
import { Spinner } from 'react-bootstrap';

export default () => (
    <div className="spinner spinner-container position-absolute d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" size="lg" width="100px" height="100px" className="spinner-container__layover-spinner"/>
    </div>
)