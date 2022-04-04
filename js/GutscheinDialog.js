class GutscheinDialog extends React.Component {
    static eingabe = document.getElementById("eingabe")

    constructor(props) {
        super(props)
        this.state = {
            gutscheinListe: [],
            gutschein: "",

        }
    }
    gutscheinHinzufuegen=()=> {
        this.setState({gutscheinListe:[...this.state.gutscheinListe,this.state.gutschein]})
        this.setState({gutschein:""})
    }

    gutscheinInput=(e)=> {

        this.setState({gutschein:e.target.value})
    }
    render() {
        return (
            <div className={'mdc-dialog ' + (this.props.visible ? 'mdc-dialog--open' : '')}>
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface">
                        <h2 className="mdc-dialog__title">Gutscheine bearbeiten</h2>


                            <nav>
                                <input onChange={this.gutscheinInput} value={this.state.gutschein} type="search" id="gutscheinEingabe" placeholder="Gutscheine hinzufügen"
                                       onKeyPress={e => (e.key == 'Enter') ? this.gutscheinHinzufuegen() : ""}/>
                                <button onClick={() => this.gutscheinHinzufuegen()}
                                        className="material-icons button-yellow">add_circle
                                </button>
                            </nav>
                            <hr/>


                            <dl className="mdc-deprecated-list">
                               {this.state.gutscheinListe.map(gutschein => (
                                    <h4 key={gutschein}>{gutschein}</h4>

                                ))}
                            </dl>

                        <div className="mdc-dialog__actions">
                            <button type="button" className="mdc-button mdc-dialog__button"
                                    onClick={this.props.onDialogClose}>
                                <div className="mdc-button__ripple"></div>
                                <span className="mdc-button__label">Schließen</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}