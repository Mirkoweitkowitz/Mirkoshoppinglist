class FavoritenDialog extends React.Component {
    static eingabe = document.getElementById("eingabe")

    constructor(props) {
        super(props)
        this.state = {
            merkListe: [],
            merken: "",
        }
    }

    merkenHinzufuegen=()=> {
        this.setState({merkListe:[...this.state.merkListe,this.state.merken]})
        this.setState({merken:""})
    }

    merkenInput=(e)=> {

        this.setState({merken:e.target.value})
    }

    render() {
        return (
            <div className={'mdc-dialog ' + (this.props.visible ? 'mdc-dialog--open' : '')}>
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface">
                        <h2 className="mdc-dialog__title">Favoriten bearbeiten</h2>

                        <nav>
                            <input onChange={this.merkenInput} value={this.state.merken} type="search" id="merkenEingabe" placeholder="Favoriten hinzufügen"
                                   onKeyPress={e => (e.key == 'Enter') ? this.merkenHinzufuegen() : ""}/>
                            <button onClick={() => this.merkenHinzufuegen()}
                                    className="material-icons button-yellow">add_circle
                            </button>
                        </nav>

                        <hr/>

                        <dl className="mdc-deprecated-list">
                            {this.state.merkListe.map(merken => (
                                <h4 key={merken}>{merken}</h4>

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
