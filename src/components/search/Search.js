import React, { Component } from "react"
import { Panel } from 'primereact/panel'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Messages } from 'primereact/messages';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';

import { APIService } from "../../service/APIService";

import DetailWeather from "../detail-weather/DetailWeather";
import CurrentForecast from "../detail-weather/current/CurrentForecast"


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: 'Blumenau',
            current: {},
            forecast: {},
            isOpen: false,
            viewForecast: {}
        }

        this.addMessages = this.addMessages.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
        this.eventListener()

        this.isShow = false
        this.processing = false
        this.api = new APIService()
    }

    eventListener() {
        document.addEventListener('build', ({ detail }) => {
            this.setState({ isOpen: true })

            if (this.state.forecast && this.state.forecast?.daily) {
                const find = this.state.forecast?.daily.find(f => f.dt === detail.dt)
                this.setState({ viewForecast: this.toViewForecast(find) })
            }
        })
    }

    toViewForecast(value) {
        const { sys } = this.state.current
        const { name } = this.state.current
        const { dt } = value
        const { day, min, max } = value.temp
        const { wind_speed, pressure, humidity } = value
        const { description } = value.weather[0]

        return {
            summary: {
                country: sys.country,
                city: name,
                description
            },
            dt: dt,
            temp: {
                day,
                min,
                max
            },
            windSpeed: wind_speed,
            pressure,
            humidity,
        }
    }

    addMessages(detail) {
        this.msgs.show([
            { severity: 'info', detail: detail, sticky: true }
        ]);
    }

    clearMessages() {
        this.msgs.clear();
    }

    searchWeather = () => {
        this.clearMessages()
        this.processing = true

        this.api.findForecastByCity(this.state.search)
            .then(result => {
                if (result.cod !== "404") {
                    this.setState({ current: result })
                    this.saveHistoryForacast(result)
                    this.api.findHistoryForecast(this.state.current.coord.lat, this.state.current.coord.lon)
                        .then(forecast => this.setState({ forecast: forecast }))
                        .catch(error => this.reset())
                    this.isShow = true
                    this.processing = false
                } else {
                    this.addMessages(result.message)
                    this.reset()
                }
            })
            .catch(error => this.reset())
    }

    saveHistoryForacast(value) {
        this.api.saveForecast(value)
    }

    reset() {
        this.isShow = false
        this.processing = false
        this.setState({ current: {}, forecast: {} })
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    render() {
        return (
            <div>
                <Panel header="Pesquisar clima">
                    <div className="p-grid p-fluid">
                        <div className="p-inputgroup">
                            <InputText placeholder="Search" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} />
                            <Button icon="fas fa-search" onClick={this.searchWeather} />
                        </div>
                    </div>
                </Panel>
                <br />
                <Panel header="Resultado">
                    {this.processing ? <ProgressSpinner /> : null}
                    <Messages ref={(el) => this.msgs = el} />
                    {
                        this.isShow ?
                            <DetailWeather
                                currentForecast={this.state.current}
                                forecast={this.state.forecast} /> : null
                    }
                </Panel>
                <Dialog header="Detalhes da previsão" visible={this.state.isOpen} style={{ width: '50vw' }} onHide={() => this.onHide('isOpen')}>
                    {this.processing ? <ProgressSpinner /> : null}
                    <Messages ref={(el) => this.msgs = el} />
                    {
                        <CurrentForecast viewForecast={this.state.viewForecast} />
                    }
                </Dialog>
            </div>
        )
    }
}

export default Search