// noinspection JSXNamespaceValidation
class ShoppingTag extends React.Component {
    constructor() {
        super();
       /* console.debug(App.allesAuflisten())
        console.debug(App.gruppeUmbenennen())
        console.debug(App.gruppeEntfernen())*/

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

    }

    setAktiveGruppe = (gruppenId) => {
        App.aktiveGruppe = gruppenId
        this.setState({aktiveGruppe: App.aktiveGruppe})
        console.debug(this.state.aktiveGruppe)
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
