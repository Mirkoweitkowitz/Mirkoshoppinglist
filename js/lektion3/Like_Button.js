
class Like_Button extends React.Component{
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render = () => {

            if (this.state.liked) { true;
                return <p>"na gefällt Dir das."</p>
            }
        return (
            <div>
                <button onClick={() => this.setState({ liked: true })}>na gefällt Dir das</button>


            </div>

        )
        }


}
