import React, { Component } from 'react';
import * as params from '../../Data/config'

export default class Interval extends Component {

    state = { secondsElapsed: params.TIME_LIMIT_REFRESH_DATA };//20seconds

    componentDidMount = (props) => {
        this.setState({ secondsElapsed: params.TIME_LIMIT_REFRESH_DATA});//20seconds
        this.interval = setInterval(this.tick, params.Interval_DATA); //1000 * 60
    }
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.state.secondsElapsed) {
            this.setState({ secondsElapsed: this.state.secondsElapsed - 1 });
            this.props.shouldFetch(this.secondsElapsed);
        }
        else
            this.props.shouldFetch(0);
    }

    render() {
        const { secondsElapsed } = this.state;
        return (
            <div>
                {secondsElapsed ?
                    ""//<h3>Time until new data arrive {secondsElapsed.toFixed(0)} seconds</h3>
                    : <div class="description_refreshed_data">Click to view refreshed data</div>
                }
            </div>
        );
    }
};