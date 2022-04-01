// noinspection JSXNamespaceValidation
class ShoppingTag extends React.Component {
    constructor() {
        super();

        this.state = {
            aktivegruppe: null,
            showGruppenDialog: false,
            showSortierDialog: false,
            showSettingsDialog: false

        }
        let gruppe1
        gruppe1 = App.gruppeHinzufuegen("Obst & Gemüse")
        gruppe1.artikelHinzufuegen("Brokkoli")
        gruppe1.artikelHinzufuegen("Mais")
        gruppe1.artikelHinzufuegen("Blumenkohl")
        gruppe1.artikelHinzufuegen("Rosenkohl")

        let gruppe2 = App.gruppeHinzufuegen("Getränke")
        gruppe2.artikelHinzufuegen("Selter")
        gruppe2.artikelHinzufuegen("Cola")
        gruppe2.artikelHinzufuegen("Wasser mit Geschmack")

        let gruppe3
        gruppe3 = App.gruppeHinzufuegen("Getreideprodukte")
        gruppe3.artikelHinzufuegen("Reis")
        gruppe3.artikelHinzufuegen("Nudeln")
        gruppe3.artikelHinzufuegen("Brot")

        let gruppe4
        gruppe4 = App.gruppeHinzufuegen("Milchprodukte")
        gruppe4.artikelHinzufuegen("Streukäse")
        gruppe4.artikelHinzufuegen("Geheimratskäse")
        gruppe4.artikelHinzufuegen("Milch")

        let gruppe5
        gruppe5 = App.gruppeHinzufuegen("Hülsenfrüchte")
        gruppe5.artikelHinzufuegen("Linsen")
        gruppe5.artikelHinzufuegen("Bohnen")

        let gekaufterArtikel = gruppe4.artikelHinzufuegen("Linsen")
        gekaufterArtikel.gekauft = true

    }

    artikelHinzufuegen = () => {
        let eingabe = document.getElementById("artikelEingabe")
        console.debug(eingabe)
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
        this.setState(this.state)
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
                    <input id="artikelEingabe" type="text" placeholder="Artikel hinzufügen"/>
                    <button onClick={() =>this.artikelHinzufuegen()} className="material-icons circle-orange">add_circle</button>
                    <button className="material-icons card-blue">card_giftcard</button>
                    <button className="material-icons member-blue">card_membership</button>

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
                                        checkHandler={this.artikelChecken}
                                        aktiv={gruppe.id == App.aktiveGruppe}
                            />
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
                    <button onClick={()=>this.setState({showGruppenDialog:true})}>
                        <span className="material-icons book-green">bookmark_add</span> Gruppen
                    </button>
                    <button onClick={()=>this.setState({showSortierDialog:true})}>
                        <span className="material-icons sort-green">sort</span> Sortieren
                    </button>
                    <button onClick={()=>this.setState({showSettingsDialog:true})}>
                        <span className="material-icons set-green">settings</span> Einstellungen
                    </button>
                </nav>
            </footer>
            <GruppenDialog visible={this.state.showGruppenDialog} onDialogClose={()=>this.setState({showGruppenDialog:false})} gruppenListe={App.gruppenListe}/>
            <SortierDialog visible={this.state.showSortierDialog} onDialogClose={()=>this.setState({showSortierDialog:false})}/>
            <SettingsDialog visible={this.state.showSettingsDialog} onDialogClose={()=>this.setState({showSettingsDialog:false})}/>
        </div>


    )
}
}
