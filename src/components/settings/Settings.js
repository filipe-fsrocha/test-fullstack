import React, { Component } from "react"
import { Panel } from 'primereact/panel'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Messages } from 'primereact/messages';

class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accessKey: ''
        }

        this.addMessages = this.addMessages.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
    }

    addMessages(detail) {
        this.msgs.show([
            { severity: 'info', detail: detail, sticky: true }
        ]);
    }

    clearMessages() {
        this.msgs.clear();
    }

    saveAccessKey = () => {
        this.clearMessages();

        fetch('http://localhost:8000/api/saveAccessKey', {
            method: 'POST',
            body: JSON.stringify({ accessKey: this.state.accessKey })
        }).then(res => res.json())
            .then(() => this.addMessages('Chave de acesso configurado com sucesso!'))
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <Panel header="Configurar chave de acesso a API">
                    <div className="p-grid p-fluid">
                        <div className="p-inputgroup">
                            <InputText placeholder="Token de autorização" value={this.state.accessKey} onChange={(e) => this.setState({ accessKey: e.target.value })} />
                        </div>
                    </div>
                    <br />
                    <div className="p-grid">
                        <div className="p-col">
                            <Button label="Salvar token de autorização" onClick={this.saveAccessKey} />
                        </div>
                    </div>
                    <Messages ref={(el) => this.msgs = el} />
                </Panel>
            </div>
        )
    }
}

export default Settings