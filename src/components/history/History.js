import React, { Component, useEffect } from "react"

import { Panel } from 'primereact/panel'

import TableHistoryWeather from "./table/TableHistoryWeather"

import { APIService } from "../../service/APIService"


class History extends Component {

    constructor(props) {
        super(props)
        this.history = []
        this.state = { forecast: [] }

        this.api = new APIService()
        this.init()
    }

    init() {
        this.api.listHistoryForecast()
            .then(res => {
                this.setState({ forecast: res.data })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <Panel header="Histórico">
                    <TableHistoryWeather weather={this.state.forecast} />
                </Panel>
            </div>
        )
    }
}

export default History