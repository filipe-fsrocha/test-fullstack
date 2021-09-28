import React, { Component } from "react";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button';

class TableHistoryWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.values = this.state.weather
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    }

    deleteHistory = (rowData) => {
        const findIdx = this.props.weather.findIndex(item => item.id === rowData.id)
        this.props.weather.splice(findIdx, 1)
        this.setState({})
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="far fa-trash-alt" className="p-button-rounded p-button-danger" onClick={() => this.deleteHistory(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                <br />
                <div className="card">
                    <DataTable value={this.props.weather}>
                        <Column field="country" header="País"></Column>
                        <Column field="city" header="Cidade"></Column>
                        <Column field="lon" header="Longitude"></Column>
                        <Column field="lat" header="Latitude"></Column>
                        <Column field="updated" header="Última pesquisa"></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        )
    }
}

export default TableHistoryWeather