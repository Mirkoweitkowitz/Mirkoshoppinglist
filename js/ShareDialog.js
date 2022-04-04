class ShareDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: this.props.visible,
            visible: true
        }
    }
    gruppeHinzufuegen =()=>{

    }
    render = () => {
        return (

            <div className={this.props.visible ?"mdc-dialog mdc-dialog--open": "mdc-dialog"}>
                <div className="mdc-dialog__container">
                    <div className= "mdc-dialog__surface">
                        <h2 className="mdc-dialog__title"> Teilen </h2>
                        <div className="mdc-dialog__content">
                            <nav><input id="textfeld"/><button className="material-icons button-yellow" onClick={this.gruppeHinzufuegen}>add_circle</button></nav>

                            <hr/>
                        </div>
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