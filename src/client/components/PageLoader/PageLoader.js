import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import TopBarProgress from "react-topbar-progress-indicator"
import loadData from 'shared/loadData';

TopBarProgress.config({
    barColors: {
        "0": "#53b374",
        "1.0": "#53b374",
    },
    barThickness: 2,
    shadowBlur: 5,
});

@withRouter
export default class extends React.Component {
    state = {
        previousLocation: null,
        isLoading: false
    };

    async componentDidUpdate(prevProps) {
        const navigated = prevProps.location !== this.props.location;

        if (navigated) {
            this.setState({
                previousLocation: prevProps.location,
                isLoading: true
            });

            await loadData(this.props.location.pathname);

            this.setState({
                previousLocation: null,
                isLoading: false
            })
        }
    }

    render() {
        const { children, location } = this.props;
        const { previousLocation, isLoading } = this.state;

        return (
            <Fragment>
                { isLoading && <TopBarProgress /> }
                <Route
                    location={ previousLocation || location }
                    render={ () => children }
                />
            </Fragment>
        )
    }
}
