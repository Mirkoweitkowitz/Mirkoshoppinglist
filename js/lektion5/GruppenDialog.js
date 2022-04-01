class GruppenDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: this.props.visible,
            gruppenListe: this.props.gruppenListe,
            visible: true
        }
    }

    gruppeHinzufuegen =()=>{

    }
    gruppeBearbeiten =()=>{

    }
    gruppeEntfernen =()=>{

    }
    render = () => {
        return (

            <div className={this.props.visible ?"mdc-dialog mdc-dialog--open": "mdc-dialog"}>
                <div className="mdc-dialog__container">
                    <div className= "mdc-dialog__surface">
                        <h2 className="mdc-dialog__title">Gruppe bearbeiten</h2>
                        <div className="mdc-dialog__content">
                                <nav><input id="textfeld"/><button className="material-icons button-yellow" onClick={this.gruppeHinzufuegen}>add_circle</button></nav>
        <hr/>
                            <dl className="mdc-deprecated-list">{this.state.gruppenListe.map(gruppe=>(
                                <dt key={gruppe.id}>
                                    <span className="gruppentitel">{gruppe.name}</span>
                                    <i className="material-icons button-white">edit</i>
                                    <i className="material-icons button-white">delete</i>
                                </dt>
                            ))}</dl>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


}

