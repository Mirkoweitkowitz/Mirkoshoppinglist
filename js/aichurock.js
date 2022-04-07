/**
 * //Diese Klasse steuert die Gruppen.
 */

/**in diesem String sind die Gruppennamen für verfügbare GruppenIcons*/
const gruppenNamen = ["Obst & Gemüse", "Milchprodukte", "Getränke", "Getreide produkte", "Fleischprodukte", "Eier", "Pilze"]
//Bilder Icons größe
const imagesize = 25

class GruppenTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aufgeklappt: true
        }
    }

    /**
     * Mit diese Methode wird die Gruppen auf und zugeklappt
     */
    aufZuKlappen() {
        this.setState({aufgeklappt: !this.state.aufgeklappt})
    }

    /**
     * Entfernt den Artikel von der Gruppe
     */
    artikelEntfernen = (artikelNamen) => {
        this.props.gruppe.artikelEntfernen(artikelNamen)
        this.props.aktiveGruppeHandler(this.props.gruppe.id)

    }

    render = () => {
        let itemsRelevant = this.props.gruppe.artikelListe.filter(item =>
            item.gekauft == this.props.erledigt)
        return (
            <div>
                <dt onClick={() => this.props.aktiveGruppeHandler(this.props.gruppe.id)}
                    className={!this.props.erledigt && this.props.aktiv ? "aktiv" : "inaktiv"}>
                    {this.props.gruppe.name}
                    {gruppenNamen.indexOf(this.props.gruppe.name) == -1 ? <div></div> :
                        <img className="gruppenIcon" src={"img/Gruppen Icons/" + this.props.gruppe.name + ".png"}
                             width={imagesize} height={imagesize}/>}
                    <i onClick={() => this.aufZuKlappen()} className="material-icons">
                        {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
                    </i></dt>
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