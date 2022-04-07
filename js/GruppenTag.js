/**
 * diese Methode bestimmt wie sie Funktionieren soll, um einen Artikel zu entfernen.
 */
class GruppenTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aufgeklappt: true
        }
    }
    /**
     *hier wird der Artikelname entfernt
     * @param artikel
     */
    artikelEntfernen(artikel) {
        this.props.gruppe.artikelEntfernen(artikel)
        this.props.aktiveGruppeHandler(this.props.gruppe.id)
    }
    /**
     * die Funktion zeigt einmal die Liste an oder schleißt diese mit einem PfeilSymbol.
     */
    aufZuKlappen() {
        this.setState({aufgeklappt: !this.state.aufgeklappt})
    }

    render() {
        let gekauft = this.props.gekauft
        let itemsRelevant = []
        for (const artikel of this.props.gruppe.artikelListe) {
            if (artikel.gekauft == gekauft) {
                itemsRelevant.push(artikel)
            }
        }

        return (
            <div>
                <dt className={this.props.aktiv && !gekauft ? "aktiv" : "inaktiv"}
                    onClick={() => !gekauft ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ''}>
                    {this.props.gruppe.name}
                    <i onClick={() => this.aufZuKlappen()} className="material-icons">
                        {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
                    </i>
                </dt>
                {this.state.aufgeklappt
                    ? itemsRelevant.map(artikel =>
                        <ArtikelTag key={artikel.id} artikel={artikel}
                                    checkHandler={this.props.checkHandler}
                                    deleteHandler={() => this.artikelEntfernen(artikel.name)}/>)
                    : ''
                }
            </div>
        )
    }
}