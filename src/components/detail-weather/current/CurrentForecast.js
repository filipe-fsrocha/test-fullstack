import React, { Component } from "react";
import { Divider } from 'primereact/divider'

class CurrentForecast extends Component {

    constructor(props) {
        super(props);
    }

    roundNumber(value) {
        if (value) return Math.round(value)
        return NaN
    }

    render() {
        const localeForecast = `Clima em ${this.props.viewForecast?.summary.city}, ${this.props.viewForecast?.summary.country}`
        const tempMin = this.roundNumber(this.props.viewForecast?.temp.min)
        const tempMax = this.roundNumber(this.props.viewForecast?.temp.max)
        return (
            <div>
                <div className="detail-header color-primary">
                    <div className="detail-content">
                        <h1>{localeForecast}</h1>
                        <h3 className="detail-date">
                            {`Até ${new Date(this.props.viewForecast?.dt * 1000).toLocaleString()}`}
                        </h3>
                        <span className="detail-degrees">
                            {this.roundNumber(this.props.viewForecast?.temp.day)}&deg;
                        </span>
                        <span className="detail-description">
                            {this.props.viewForecast?.summary.description}
                        </span>
                        <div className="detail-degrees-max-min">
                            <span>
                                {tempMax}&deg;\{tempMin}&deg;
                            </span>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <h1>
                        {`O clima em ${localeForecast}`}
                    </h1>
                    <br />
                    <div className="p-grid">
                        <div className="p-col-6">
                            <span><i class="fas fa-temperature-high"></i> Max. / Mín.</span>
                            <span className="text-right">
                                {tempMax}&deg;\{tempMin}&deg;
                            </span>
                            <Divider />
                        </div>
                        <div className="p-col-6">
                            <span><i class="fas fa-wind"></i> Vento</span>
                            <span className="text-right">{this.props.viewForecast?.windSpeed} km/h</span>
                            <Divider />
                        </div>
                        <div className="p-col-6">
                            <span><i class="fas fa-tint"></i> Umidade</span>
                            <span className="text-right">{this.props.viewForecast?.humidity}%</span>
                            <Divider />
                        </div>
                        <div className="p-col-6">
                            <span><i class="fas fa-compress-alt"></i> Pressão</span>
                            <span className="text-right"><i class="fas fa-arrow-up"></i> {this.props.viewForecast?.pressure}.mb</span>
                            <Divider />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrentForecast