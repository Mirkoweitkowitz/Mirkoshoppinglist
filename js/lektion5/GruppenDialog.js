class GruppenDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: this.props.visible,
            gruppenListe: this.props.gruppenListe,
            visible: true
        }
    }

    render = () => {
        return (

            <div className={this.props.visible ?"mdc-dialog mdc-dialog--open": "mdc-dialog"}>
                <div className="mdc-dialog__container">
                    <div className= "mdc-dialog__surface">
                            hallo
                    </div>
                </div>
            </div>
        )

    }


}

