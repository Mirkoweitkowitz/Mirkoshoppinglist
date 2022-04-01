class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: this.props.visible,
            visible: true
        }
    }

    render = () => {
        return (

            <div className={this.props.visible ?"mdc-dialog mdc-dialog--open": "mdc-dialog"}>
                <div className="mdc-dialog__container">
                    <div className= "mdc-dialog__surface">
                       SettingsDialog
                    </div>
                </div>
            </div>
        )

    }


}