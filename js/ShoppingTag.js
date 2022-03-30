// noinspection JSXNamespaceValidation
class ShoppingTag extends React.Component {
    constructor() {
        super();

        this.state = {
            aktivegruppe: null,
        }
        let gruppe1
        gruppe1 = App.gruppeHinzufuegen("Obst & Gemüse")
        gruppe1.artikelHinzufuegen("Brokkoli")
        gruppe1.artikelHinzufuegen("Mais")
        gruppe1.artikelHinzufuegen("Blumenkohl")
        gruppe1.artikelHinzufuegen("Rosenkohl")

        let gruppe2 = App.gruppeHinzufuegen("Getränke")
        gruppe2.artikelHinzufuegen("Selter")

        let gruppe3
        gruppe3 = App.gruppeHinzufuegen("Getreideprodukte")
        gruppe3.artikelHinzufuegen("Reis")

        let gruppe4
        gruppe4 = App.gruppeHinzufuegen("Milchprodukte")
        gruppe4.artikelHinzufuegen("Streukäse")
        gruppe4.artikelHinzufuegen("Geheimratskäse")

        let gruppe5
        gruppe5 = App.gruppeHinzufuegen("Hülsenfrüchte")
        gruppe5.artikelHinzufuegen("Linsen")

        let gekaufterArtikel = gruppe4.artikelHinzufuegen("Milch")
        gekaufterArtikel.gekauft = true

    }

    artikelHinzufuegen = () => {
        let eingabe = document.getElementById("artikelEingabe")
        if (eingabe.value.trim().length > 0) {
                let alle = App.gruppeFinden(App.aktiveGruppe)
            alle.artikelHinzufuegen(eingabe.value)
            this.setState(this.state)
        }
        eingabe.value = ""
        eingabe.focus()
    }

    setAktiveGruppe = (gruppenId) => {
        App.aktiveGruppe = gruppenId
        this.setState({aktiveGruppe: App.aktiveGruppe})
        console.debug(this.state.aktiveGruppe)
    }
    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft
        let checkHandler = App.gruppeFinden(App.aktiveGruppe)
        checkHandler.artikelChecken(artikel.value)
        this.setState(this.state.artikelChecken)
    }
    closesortierDialog = (reihenfolge, sortieren) => {

    if(sortieren) {
        App.sortieren(reihenfolge)
    }
    this.setState( {showSortierDialog: false})
}

closeSetupDialog = () => {
    this.setState( {showSetupDialog: false})
}


render = () => {
    return (

        <div>

            <header>
                <h1>Einkaufsliste</h1>
                <nav>
                    <input type="text" placeholder="Artikel hinzufügen"/>
                    <button className="material-icons">add_circle</button>
                </nav>
            </header>

            <hr/>

            <main>
                <section>
                    <h2>Einkaufen
                        <i className="material-icons">expand_less</i>
                    </h2>
                    <dl>

                        {App.gruppenListe.map(gruppe => (
                            <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={false}
                                        aktiveGruppeHandler={this.setAktiveGruppe}
                                        aktiv={gruppe.id == App.aktiveGruppe}/>
                        ))}
                    </dl>
                </section>
                <hr/>

                <section>
                    <h2>Erledigt
                        <i className="material-icons">expand_less</i>
                    </h2>
                    <dl>
                        {App.gruppenListe.map(gruppe => (
                            <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={true}
                                        aktiveGruppeHandler={this.setAktiveGruppe}
                                        inaktiv={gruppe.id == App.oktiveGruppe}/>
                        ))}
                    </dl>
                </section>
            </main>
            <hr/>


            <footer>
                <nav>
                    <button>
                        <span className="material-icons">bookmark_add</span> Gruppen
                    </button>
                    <button>
                        <span className="material-icons">sort</span> Sortieren
                    </button>
                    <button>
                        <span className="material-icons">settings</span> Einstellungen
                    </button>
                </nav>
            </footer>
        </div>


    )
}
}
