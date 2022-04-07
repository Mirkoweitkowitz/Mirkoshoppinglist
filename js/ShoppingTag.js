/**
 * Hauptkomponente der gesamten Einkaufslisten APP
 */

class ShoppingTag extends React.Component {
    constructor(props) {
        super(props)

        /**
         *
         * @type {{showGruppenDialog: boolean,
         * showSortierDialog:boolean,
         * showShareDialog:boolean,
         * showWarenkorbDialog:boolean,
         * showGutscheineDialog:boolean,
         *  showMemberDialog:boolean,
         *  showFavoritenDialog:boolean,
         *   showSettingsDialog:boolean,
         *  showAccountDialog:boolean,
         * erledigtAufgeklappt: boolean,
         * menge: number,
         * aktiveGruppe: number,
         * einkaufenAufgeklappt: boolean}}
         */
        this.state = {
            aktiveGruppe: null,
            einkaufenAufgeklappt: true,
            erledigtAufgeklappt: false,
            showGruppenDialog: false,
            showSortierDialog: false,
            showShareDialog: false,
            showWarenkorbDialog: false,
            showGutscheineDialog: false,
            showMemberDialog: false,
            showFavoritenDialog: false,
            showSettingsDialog: false,
            showAccountDialog: false,

        }
        /**
         * hier wird der Startzustand Geladen der Programmiert wurde
         */
        this.startzustandLaden()
    }
    /**
     *
     * @returns {Promise<void>}
     */
    async startzustandLaden() {
        let gespeicherterZustand = localStorage.getItem(App.STORAGE_KEY)
        if (gespeicherterZustand) {
            App.laden()
        } else {
            await App.datenEinlesen()
            this.setState(this.state)
        }
    }
    /**
     * bestimmung der Aktiven Gruppe, der zu kaufenden Artikel
     * @param {gruppenID}
     */
    setAktiveGruppe(gruppenId) {
        App.aktiveGruppe = gruppenId
        const gruppe = App.gruppeFinden(gruppenId)
        App.informieren(`[App] Gruppe "${gruppe.name}" ist nun aktiv`)
        this.setState({aktiveGruppe: App.aktiveGruppe})
    }
    /**
     * hier wird festgelegt ob gekauft (erledigt) oder nicht gekauft (reaktiviert)
     * @param {artikel}
     */
    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft
        const aktion = artikel.gekauft ? "erledigt" : "reaktiviert"
        App.informieren(`[App] Artikel "${artikel.name}" ${aktion}`)
        this.setState({state: this.state})
    }
    /**
     *hier wird der Artikel hinzugefügt
     */
    artikelHinzufuegen() {
        let eingabe = document.getElementById("artikelEingabe")
        if (eingabe.value.trim().length > 0) {
            let aktiveGruppe = App.gruppeFinden(App.aktiveGruppe)
            aktiveGruppe.artikelHinzufuegen(eingabe.value)
            this.setState(this.state)
        }
        eingabe.value = ""
        eingabe.focus()
    }
    /**
     *die Funktion zeigt einmal die Liste an oder schleißt diese mit einem PfeilSymbol.
     */
    einkaufenAufZuKlappen() {
        this.setState({einkaufenAufgeklappt: !this.state.einkaufenAufgeklappt})
    }
    /**diese Funktion zeigt die Liste an
     *
     */
    erledigtAufZuKlappen() {
        this.setState({erledigtAufgeklappt: !this.state.erledigtAufgeklappt})
    }
    /**
     *hier kann man die Reihenfolge bestimmen.
     */
    closeSortierDialog = (reihenfolge, sortieren) => {
        if (sortieren) {
            App.sortieren(reihenfolge)
        }
        this.setState({showSortierDialog: false})
    }

    render = () => {
        return (
            <div>
                <div id="container">

                    <header>

                        <h1>Einkaufsliste</h1>
                        <nav>

                            <input type="search" id="artikelEingabe" placeholder="Artikel hinzufügen"
                                   onKeyPress={e => (e.key == 'Enter') ? this.artikelHinzufuegen() : ''}/>
                            <button onClick={() => this.artikelHinzufuegen()}
                                    className="material-icons button-yellow">add_circle
                            </button>
                            <button className="material-icons card-blue"
                                    onClick={() => this.setState({showGutscheineDialog: true})}>
                                card_giftcard
                            </button>
                            <button className="material-icons member-blue"
                                    onClick={() => this.setState({showMemberDialog: true})}>
                                card_membership
                            </button>
                            <button className="material-icons member-blue"
                                    onClick={() => this.setState({showFavoritenDialog: true})}>
                                favorite
                            </button>
                            <button className="material-icons member-blue"
                                    onClick={() => this.setState({showSettingsDialog: true})}>
                                settings
                            </button>
                            <button className="material-icons member-blue"
                                    onClick={() => this.setState({showAccountDialog: true})}>
                                account_circle
                            </button>
                        </nav>
                    </header>
                    <hr/>

                    <main>
                        <section>
                            <h2>Einkaufen
                                <i onClick={() => this.einkaufenAufZuKlappen()} className="material-icons">
                                    {this.state.einkaufenAufgeklappt ? 'expand_more' : 'expand_less'}
                                </i>

                            </h2>
                            <dl>
                                {this.state.einkaufenAufgeklappt
                                    ? App.gruppenListe.map(gruppe =>
                                        <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={false}
                                                    aktiv={gruppe.id == App.aktiveGruppe}
                                                    aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe.id)}
                                                    checkHandler={this.artikelChecken}/>)
                                    : ''}
                            </dl>
                        </section>
                        <hr/>

                        <section>
                            <h2>Erledigt
                                <i onClick={() => this.erledigtAufZuKlappen()} className="material-icons">
                                    {this.state.erledigtAufgeklappt ? 'expand_more' : 'expand_less'}
                                </i>
                            </h2>
                            {this.state.erledigtAufgeklappt
                                ? App.gruppenListe.map(gruppe =>
                                    <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={true}
                                                aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe.id)}
                                                checkHandler={this.artikelChecken}/>)
                                : ''}
                        </section>
                    </main>
                    <hr/>
                </div>
                <footer>
                    <nav>
                        <button className="button-footer" onClick={() => this.setState({showGruppenDialog: true})}>
                            <span className="material-icons book-green">bookmark_add</span> Gruppen
                        </button>
                        <button className="button-footer" onClick={() => this.setState({showSortierDialog: true})}>
                            <span className="material-icons sort-green">sort</span> Sort
                        </button>
                        <button className="button-footer" onClick={() => this.setState({showShareDialog: true})}>
                            <span className="material-icons share-green">share</span> Teilen
                        </button>
                        <button className="button-footer" onClick={() => this.setState({showWarenkorbDialog: true})}>
                            <span className="material-icons warenkorb-green">shopping_cart</span> Warenkorb
                        </button>
                    </nav>
                </footer>
                <GruppenDialog visible={this.state.showGruppenDialog}
                               onDialogClose={() => this.setState({showGruppenDialog: false})}
                               gruppenListe={App.gruppenListe}/>
                <ShareDialog visible={this.state.showShareDialog}
                             onDialogClose={() => this.setState({showShareDialog: false})}/>
                <WarenkorbDialog visible={this.state.showWarenkorbDialog}
                                 onDialogClose={() => this.setState({showWarenkorbDialog: false})}/>
                <GutscheinDialog visible={this.state.showGutscheineDialog}
                                 onDialogClose={() => this.setState({showGutscheineDialog: false})}/>
                <MemberDialog visible={this.state.showMemberDialog}
                              onDialogClose={() => this.setState({showMemberDialog: false})}/>
                <FavoritenDialog visible={this.state.showFavoritenDialog}
                                 onDialogClose={() => this.setState({showFavoritenDialog: false})}/>
                <SettingsDialog visible={this.state.showSettingsDialog}
                                onDialogClose={() => this.setState({showSettingsDialog: false})}/>
                <AccountDialog visible={this.state.showAccountDialog}
                               onDialogClose={() => this.setState({showAccountDialog: false})}/>


                {this.state.showSortierDialog
                    ? <SortierDialog onDialogClose={this.closeSortierDialog}/>
                    : ''
                }
            </div>
        )
    }
}


/*
    constructor() {
        super();

        this.state = {
            aktivegruppe: null,
            showGruppenDialog: false,
            showShareDialog: false,
            showWarenkorbDialog: false,
            showGutscheineDialog: false,
            showMemberDialog: false,
            showFavoritenDialog: false

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
 */
