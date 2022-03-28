class GruppenTag extends React.Component {
    render = () => {

        const erledigt = this.props.erledigt
        let itemsRelevant = this.props.gruppe.artikelListe.filter(item => item.gekauft == erledigt)

        return (
            <div>
                <dt className={this.props.aktiv && !erledigr ? "aktiv" : "inaktiv"}
                onClick={() => !erledigt ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ``}>;
                    <i className="material-icons">expand_less</i>
                </dt>
                {itemsRelevant.map(artikel => (
                    <ArtikelTag key={artikel.id} artikel={artikel}/>
                ))}
            </div>
        )
    }
}