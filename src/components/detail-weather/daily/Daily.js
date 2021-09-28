import React, { Component } from "react"

class Daily extends Component {

    constructor(props) {
        super(props)
    }


    roundNumber(value) {
        if (value) return Math.round(value)
        return NaN
    }

    buildEvent = (dt) => {
        const openForecast = new CustomEvent('build', { detail: { dt: dt } })
        document.dispatchEvent(openForecast)
    }

    render() {
        return (
            <div>
                <div className="history">
                    <span className="text-daily text-bold" onClick={() => this.buildEvent(this.props.daily?.dt)}>{new Date(this.props.daily?.dt * 1000).toLocaleDateString()}</span>
                    <h1 className="text-degrees-max">{this.roundNumber(this.props.daily?.temp.max)}&deg;</h1>
                    <h1 className="text-degrees-min">{this.roundNumber(this.props.daily?.temp.min)}&deg;</h1>
                    <i class="fas fa-cloud-moon fa-4x"></i>
                    <span className="text-percent">{this.props.daily?.clouds}%</span>
                </div>
            </div>
        )
    }
}

export default Daily