class AccountDialog extends React.Component {
    static eingabe = document.getElementById("eingabe")

    constructor(props) {
        super(props)
        this.state = {
            accountListe: [],
            account: "",
        }
    }

    accountHinzufuegen=()=> {
        this.setState({accountListe:[...this.state.accountListe,this.state.account]})
        this.setState({account:""})
    }

    accountInput=(e)=> {

        this.setState({account:e.target.value})
    }

    render() {
        return (
            <div className={'mdc-dialog ' + (this.props.visible ? 'mdc-dialog--open' : '')}>
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface">
                        <h2 className="mdc-dialog__title">Profil bearbeiten</h2>

                        <nav>
                            <input onChange={this.accountInput} value={this.state.account} type="search" id="accountEingabe" placeholder="Profil hinzufügen"
                                   onKeyPress={e => (e.key == 'Enter') ? this.accountHinzufuegen() : ""}/>
                            <button onClick={() => this.accountHinzufuegen()}
                                    className="material-icons button-yellow">add_circle
                            </button>
                        </nav>

                        <hr/>

                        <dl className="mdc-deprecated-list">
                            {this.state.accountListe.map(account => (
                                <h4 key={account}>{account}</h4>

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