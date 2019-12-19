import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import { access_key } from '../../utils/constants';
import { getHistoryUrl, getLastNDates, buildRateHisrotyState } from '../../utils/utils';

import HistoryDay from '../../components/history-day';

export default ({ sourceCurrency }) => {
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [history, setHistory] = useState({});
    const [historyError, setHistoryError] = useState(false);

    useEffect(() => {
        setLoadingHistory(true);
        Promise.all(
            getLastNDates(3)
            .map(date => axios.get(getHistoryUrl(date),{ params: { access_key } }))
        )
        .then(days => {
            setHistoryError(false);
            setLoadingHistory(false);
            setHistory(buildRateHisrotyState(days));
        })
        .catch(err => {
            setLoadingHistory(false);
            setHistoryError(true);
        })
    }, []);

    return (
        <section className="history w-100 mx-auto">
            <Container>
                <h2 className="history__title">
                    Historic Price <span className="text-muted">based in {sourceCurrency.name}</span>
                </h2>
                {historyError
                    ? <p className="text-danger">Oops, something went wrong :(</p>
                    : (
                        <div className="history__days mt-4 mb-5 text-center mx-auto w-100">
                            <Row>
                                {loadingHistory
                                    ? <Col xs={12}>
                                        <Spinner animation="grow" variant="primary" size="lg" width="100px" height="100px"/>
                                    </Col>
                                    : Object.keys(history).map(day => (
                                        <Col sm={12} md={4} key={day}>
                                            <HistoryDay
                                                dayHistory={history[day]}
                                                day={day}
                                                sourceCurrency={sourceCurrency}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    )
                }
            </Container>
        </section>
    )
}