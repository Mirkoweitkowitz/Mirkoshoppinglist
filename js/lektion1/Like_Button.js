/*ToDo: Füge hinter 'extends' den fehlenden Ausdruck ein und entferne die Kommentar-zeichen*/

class Like_Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render = () => {
        if (this.state.liked) { true;
            return <p>"na .Du. war es Schön?...kannst es aber nicht mehr ändern wenn nicht...HaHa"</p>
        }
        return (<div> <button onClick={() => this.setState({ liked: true })}>klick Mich</button></div>

        );
    }

}


