class ArtikelTag extends React.Component {
    render = () => {
        return (
            <div>
                <dd><label><input type="checkbox" checked={this.props.artikel.gekauft} onChange={this.props.checkHandler(this.props.artikel)}/>
                    {this.props.artikel.gekauft ? <s>{this.props.artikel.name}</s> : this.props.artikel.name}
                </label>
                    <i onClick={() =>this.props.deleteHandler(this.props.artikel.name)} className="material-icons">delete</i>
                </dd>
            </div>
        )
    }
}
