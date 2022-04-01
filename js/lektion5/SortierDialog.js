class SortierDialog extends React.Component {
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
                        <h2 className="mdc-dialog__title">Sortieren bearbeiten</h2>
                        <div className="mdc-dialog__content">
                            <nav><input id="textfeld"/><button className="material-icons button-yellow" onClick={this.gruppeHinzufuegen}>add_circle</button></nav>

                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


}