class MemberDialog extends React.Component {
    static eingabe = document.getElementById("eingabe")

    constructor(props) {
        super(props)
        this.state = {
            memberListe: [],
            member: "",
        }
    }

    memberHinzufuegen=()=> {
        this.setState({memberListe:[...this.state.memberListe,this.state.member]})
        this.setState({member:""})
    }

    memberInput=(e)=> {

        this.setState({member:e.target.value})
    }

    render() {
        return (
            <div className={'mdc-dialog ' + (this.props.visible ? 'mdc-dialog--open' : '')}>
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface">
                        <h2 className="mdc-dialog__title">Mitgliedschaft bearbeiten</h2>

                        <nav>
                            <input onChange={this.memberInput} value={this.state.member} type="search" id="memberEingabe" placeholder="Mitglieder hinzufügen"
                                   onKeyPress={e => (e.key == 'Enter') ? this.memberHinzufuegen() : ""}/>
                            <button onClick={() => this.memberHinzufuegen()}
                                    className="material-icons button-yellow">add_circle
                            </button>
                        </nav>

                            <hr/>

                        <dl className="mdc-deprecated-list">
                            {this.state.memberListe.map(member => (
                                <h4 key={member}>{member}</h4>

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