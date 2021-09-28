import React, { Component } from "react";

import { Divider } from 'primereact/divider'

import Daily from "./daily/Daily";


class DetailWeather extends Component {

    constructor(props) {
        super(props)
    }

    roundNumber(value) {
        if (value) return Math.round(value)
        return NaN
    }

    render() {
        const {
            temp_min,
            temp_max,
            pressure,
            humidity,
        } = this.props.currentForecast?.main ? this.props.currentForecast?.main : {}

        const { daily } = this.props.forecast
        const addForecast = []

        for (const item of [].concat(daily).slice(0, 5)) {
            addForecast.push(<Daily daily={item} />)
        }

        return (
            <div>
                <div className="p-grid">
                    <div className="p-col">
                        <div className="detail-header color-primary">
                            <div className="detail-content">
                                <h1>{`Clima em ${this.props.currentForecast?.name}, ${this.props.currentForecast?.sys?.country}`}</h1>
                                <h3 className="detail-date">
                                    {`Até ${new Date(this.props.currentForecast?.dt * 1000).toLocaleString()}`}
                                </h3>
                                <span className="detail-degrees">
                                    {this.roundNumber(this.props.currentForecast?.main?.temp)}&deg;
                                </span>
                                <span className="detail-description">
                                    { }
                                </span>
                                <div className="detail-degrees-max-min">
                                    <span>
                                        {this.roundNumber(temp_max)}&deg;\{this.roundNumber(temp_min)}&deg;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-col">
                        <h1>Previsão diária</h1>
                        <br />
                        <div className="p-d-flex">
                            {addForecast}
                        </div>
                    </div>
                </div>
                <br />
                <div className="p-grid">
                    <div className="p-col-6">
                        <h1>
                            {`O clima em ${this.props.currentForecast?.name}, ${this.props.currentForecast?.sys?.country} Hoje`}
                        </h1>
                        <br />
                        <div className="p-grid">
                            <div className="p-col-6">
                                <span><i class="fas fa-temperature-high"></i> Max. / Mín.</span>
                                <span className="text-right">
                                    {this.roundNumber(temp_max)}&deg;\{this.roundNumber(temp_min)}&deg;
                                </span>
                                <Divider />
                            </div>
                            <div className="p-col-6">
                                <span><i class="fas fa-wind"></i> Vento</span>
                                <span className="text-right">{this.props.currentForecast?.wind?.speed} km/h</span>
                                <Divider />
                            </div>
                            <div className="p-col-6">
                                <span><i class="fas fa-tint"></i> Umidade</span>
                                <span className="text-right">{humidity}%</span>
                                <Divider />
                            </div>
                            <div className="p-col-6">
                                <span><i class="fas fa-compress-alt"></i> Pressão</span>
                                <span className="text-right"><i class="fas fa-arrow-up"></i> {pressure}.mb</span>
                                <Divider />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailWeather