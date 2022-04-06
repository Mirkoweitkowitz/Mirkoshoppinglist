/**
 * Hauptkomponente der gesamten APP
 */


class ShoppingTag extends React.Component {
    constructor(props) {
        super(props);

        /**
         *
         * @type {{showGruppenDialog: boolean,
         * erledigtAufgeklappt: boolean,
         * menge: number,
         * aktiveGruppe: number,
         * einkaufenAufgeklappt: boolean}}
         */
        this.state = {
            aktiveGruppe: 1, menge: 1,
            einkaufenAufgeklappt: true, erledigtAufgeklappt: false, showGruppenDialog: false
        }
        /**
         * hier wird der letzte Zustand geladen
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
     * bestimmt die Aktive Gruppe der zu kaufenden Artikel
     * @param {gruppenID}
     */
    setAktivGruppe = (gruppenID) => {
        this.setState({aktiveGruppe: gruppenID})
        App.aktiveGruppe = gruppenID
    }
    /**
     * hier wird festgelegt ob gekauft oder nicht gekauft
     * @param {artikel}
     */
    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft

        this.setState(this.state)
    }

    /**
     *hier wird der Artikel hinzugefügt
     */
    artikelHinzufuegen = () => {
        let eingabe = document.getElementById("eingabe")
        let neuerName = eingabe.value.trim()

        if (neuerName.length > 0) {
            let gruppeFinden = App.gruppeFinden(this.state.aktiveGruppe)
            gruppeFinden.artikelHinzufuegen(neuerName, this.state.menge)
            this.setState({
                gruppenListe: App.gruppenListe
            })
        }
        eingabe.value = ""
        eingabe.focus()
    }

    /**
     *mit dieser Funktion wird die Menge als Zahl hinzugefügt
     */
    mengeErhoehen = () => {
        this.setState({menge: this.state.menge + 1})
    }

    /**
     *mit dieser Funktion kann die Menge wieder reduziert werden
     * aktuell kann man sogar eine negative Menge angeben.
     * Bei dem selben Artikelnamen kann die Menge nachträglich geändert werden
     * die Ursprüngliche Funktion hat eine negative Menge verhindert(ist auskommentiert)
     */
    mengeReduzieren = () => {
        //this.setState({menge: this.state.menge - 1 > 0 ? this.state.menge - 1 : this.state.menge})
        this.setState({menge: this.state.menge - 1})
    }

    /**
     *die Funktion zeigt einmal die Liste an oder schleißt diese mit einem Symbol das "die Richtung" ändert.
     */
    toggleEinkaufenAufgeklappt = () => {
        this.setState({einkaufenAufgeklappt: !this.state.einkaufenAufgeklappt})
    }

    /**diese Funktion zeigt die Liste an
     *
     */
    toggleErledigtAufgeklappt = () => {
        this.setState({erledigtAufgeklappt: !this.state.erledigtAufgeklappt})
    }

    /**
     *öffnet/zeigt an die Eigabefläche um Gruppen zu bearbeiten
     */
    gruppenDialogOpen = () => {
        this.setState({showGruppenDialog: !this.state.showGruppenDialog})
    }

    /**
     *
     * @returns {JSX.Element}
     */
    render = () => {


        return (

            <div>
                <header>
                    <h1>Einkaufsliste</h1>
                    <div className="eingabeleiste">

                        <label htmlFor="Artikel"><input type="text" id="eingabe" placeholder="Artikel hinzufügen"
                                                        autoComplete="on"/></label>
                        <span className="mengenfeld">{this.state.menge}</span>
                        <button onClick={this.mengeErhoehen}><span className="material-icons">arrow_circle_up</span>
                        </button>
                        <button onClick={this.mengeReduzieren}><span className="material-icons">arrow_circle_down</span>
                        </button>
                        <button onClick={this.artikelHinzufuegen}><span className="material-icons">add_circle</span>
                        </button>
                    </div>
                </header>

                <main>
                    <section>
                        <nav>
                            <h2>Einkauf
                                <i onClick={this.toggleEinkaufenAufgeklappt}
                                   className="material-icons">{this.state.einkaufenAufgeklappt ? "expand_less" : "expand_more"}</i>
                            </h2>
                            <dl>
                                {this.state.einkaufenAufgeklappt && App.gruppenListe.map(gruppe => (
                                    <GruppenTag key={gruppe.id} gruppe={gruppe} setAktivGruppe={this.setAktivGruppe}
                                                erledigt={false} aktiv={gruppe.id === this.state.aktiveGruppe}
                                                checkHandler={this.artikelChecken}/>
                                ))}
                            </dl>
                        </nav>
                    </section>
                    <hr/>
                    <section>
                        <h2>Erledigt
                            <i onClick={this.toggleErledigtAufgeklappt}
                               className="material-icons">{this.state.erledigtAufgeklappt ? "expand_less" : "expand_more"}</i>
                        </h2>
                        <dl>
                            {this.state.erledigtAufgeklappt && App.gruppenListe.map(gruppe => (
                                <GruppenTag key={gruppe.id} gruppe={gruppe} setAktivGruppe={this.setAktivGruppe}
                                            erledigt={true}
                                            checkHandler={this.artikelChecken}/>
                            ))}
                        </dl>
                    </section>
                </main>
                <hr/>

                <NaviTag gruppenDialogOpen={this.gruppenDialogOpen}/>

                <GruppenDialogTag visible={this.state.showGruppenDialog}
                                  gruppeHinzufuegen={App.gruppeHinzufuegen}
                                  onDialogClose={() => this.setState({showGruppenDialog: false})}/>


            </div>

        )
    }
}

/**
 * Bestimmt die Funktion der Methode um Artikel zu entfernen
 */
class GruppenTag extends React.Component {
    constructor() {
        super();
    }

    /**
     *hier wird der Artikelname entfernt
     * @param artikelName
     */
    artikelEntfernen = (artikelName) => {
        console.log(artikelName)
        this.props.gruppe.artikelEntfernen(artikelName)
        this.props.setAktivGruppe(this.props.gruppe.id)
    }

    /**
     *
     * @returns {JSX.Element}
     */
    render = () => {
        return (
            <div>

                <dt className={!this.props.erledigt && this.props.aktiv ? "aktiv" : "inaktiv"}
                    onClick={!this.props.erledigt ? () => this.props.setAktivGruppe(this.props.gruppe.id) : null}>{this.props.gruppe.name} </dt>
                <dl>
                    {this.props.gruppe.artikelListe.filter(artikel => artikel.gekauft === this.props.erledigt).map(artikel => (
                        <ArtikelTag key={artikel.id} artikel={artikel} checkHandler={this.props.checkHandler}
                                    deleteHandler={this.artikelEntfernen}/>
                    ))}
                </dl>
            </div>
        )
    }
}
/**
 * mit NaviTag wird der Footer separiert dargestellt (Besonderheit bei "Mir")
 */


class NaviTag extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className="navi">
                <button onClick={this.props.gruppenDialogOpen}>
                    <span className="material-icons">bookmark_add</span>
                    <span className="mdc-button__ripple"></span>
                    Gruppen
                </button>

            </nav>)
    }
}

/**
 * Es werden die Funktionen aufgezeigt, die man benutzten kann wenn die Gruppen bearbeitet werden, genutzt wird.
 */


class GruppenDialogTag extends React.Component {

    constructor(props) {
        super(props);
        /**
         *
         * @type
         * {showDialog}: *,
         * {gruppenListe}: ([]|*),
         * {editID}: null,
         * {editName}: string
         */
        this.state = {
            showDialog: this.props.visible, gruppenListe: this.props.gruppenListe,
            editID: null, editName: ""
        }
    }


    /**
     * Das Hinzufügen der Gruppe als Funktion
     */
    gruppeHinzufuegen = () => {
        let eingabe = document.getElementById("Gruppeneingabe")
        let neueGruppe = eingabe.value.trim()
        console.log(neueGruppe)
        if (neueGruppe.length > 0) {
            App.gruppeHinzufuegen(neueGruppe)
        }
        eingabe.value = ""
        eingabe.focus()
    }

    /**
     *Das Löschen wird über den vergleich der GruppenListen und id ausgeführt
     * @param id
     */
    gruppeEntfernen = (id) => {
        App.gruppeEntfernen(id)
        this.setState({gruppenListe: App.gruppenListe})
    }

    /**
     * hier wird id und name gesetzt in der Gruppe
     * @param id
     * @param name
     */
    gruppeBearbeiten = (id, name) => {
        this.setState({editID: id})
        this.setState({editName: name})
    }

    /**
     * Gruppe wird dort über id und name umbenannt
     */
    gruppeUmbenennen = () => {
        App.gruppeUmbenennen(this.state.editID, this.state.editName)
        this.setState({editID: null})
    }

    /**
     * hier wird der neue Name der Gruppe aus dem Textfeld direkt ausgelesen
     * @param e
     */
    handelEditChange = (e) => {
        this.setState({editName: e.target.value})
    }


    render = () => {

        /**
         * die erste Konstruktion erstellt das Meldefenster um dort die Gruppen zu bearbeiten
         */
        return (<div className={this.props.visible ? "mdc-dialog mdc-dialog--open" : "mdc-dialog"}>
            <div className="mdc-dialog__container">
                <div className="mdc-dialog__surface">
                    <h2 className="mdc-dialog__title">Gruppen bearbeiten</h2>
                    <div className="mcd-dialog__content">
                        <label htmlFor="Gruppe"><input type="text" id="Gruppeneingabe" placeholder="Gruppe hinzufügen"
                                                       autoComplete="on"/></label>
                        <button onClick={this.gruppeHinzufuegen}> +</button>
                        <hr/>
                        <dl className="mdc-deprecated-list">
                            {App.gruppenListe.map(gruppe => {

                                return (
                                    <dt key={gruppe.id} className="popup">
                                        {this.state.editID === gruppe.id ? <input type="text" id="Eingabefeld"
                                                                                  value={this.state.editName}
                                                                                  onChange={this.handelEditChange}/> :
                                            <span>{gruppe.name}</span>}
                                        {this.state.editID === gruppe.id ?
                                            /**
                                             * an dieser Stelle werden die Buttons mit den Funktionen verbunden.
                                             */
                                            <i onClick={() => this.gruppeUmbenennen()}
                                               className="material-icons">check_circle</i> :
                                            <i onClick={() => this.gruppeBearbeiten(gruppe.id, gruppe.name)}
                                               className="material-icons">edit</i>}
                                        <i onClick={() => this.gruppeEntfernen(gruppe.id)}
                                           className="material-icons">delete</i>

                                    </dt>

                                )
                            })
                            }
                        </dl>

                    </div>
                    <div className="mdc-dialog__actions">
                        <button onClick={this.props.onDialogClose}><span className="mdc-button__label"></span>Schliessen
                        </button>
                    </div>


                </div>
            </div>
        </div>)


    }


}

/**
 * Die Klasse Gruppe beinhaltet die Funktionen der Artikel
 */
class Gruppe {
    static gruppenCounter = 1

    /**
     *
     * @param name
     * @param index
     */
    constructor(name, index) {
        this.id = Gruppe.gruppenCounter++
        this.index = index
        this.name = name
        this.artikelListe = []
    }

    /**
     *
     * @param suchName
     * @param meldungAusgeben
     * @returns {null|*}
     */
    artikelFinden(suchName, meldungAusgeben) {
        let gefundeneArtikel = this.artikelListe.filter(artikel => artikel.name === suchName)
        if (gefundeneArtikel.length > 0) {
            return gefundeneArtikel[0]
        }
        if (meldungAusgeben) {
            App.informieren(`[${this.name}] Artikel "${suchName}" nicht gefunden`, true)
        }
        return null
    }

    /**
     *
     * @param gekauft
     */
    artikelAuflisten(gekauft) {
        this.artikelListe.map(artikel => {
            if (artikel.gekauft === gekauft) {
                console.debug(`  ${artikel.name}`)
            }
        })
    }

    /**
     *
     * @param name
     * @param menge
     * @returns {Artikel}
     */
    artikelHinzufuegen(name, menge) {
        let vorhandenerArtikel = this.artikelFinden(name, false)
        if (!vorhandenerArtikel) {
            let neuerArtikel = new Artikel(name, this.artikelListe.length, menge)
            this.artikelListe.push(neuerArtikel)
            App.informieren(`[${this.name}] Artikel "${name}" hinzugefügt`)
            return neuerArtikel
        } else {
            this.artikelMengeAendern(vorhandenerArtikel, menge)
            App.informieren(`[${this.name}] Artikel "${name}" existiert schon!`, true)
        }
    }

    /**
     * diese Funktion addiert die Mengen
     * @param artikelobjekt
     * @param neueMenge
     */
    artikelMengeAendern(artikelobjekt, neueMenge) {
        artikelobjekt.menge = artikelobjekt.menge + neueMenge
    }

    /**
     *
     * @param artikel
     */
    artikelObjektHinzufuegen(artikel) {
        let neuerArtikel = this.artikelHinzufuegen(artikel.name)
        // kopiert alle Properties aus "artikel" nach "neuerArtikel"
        Object.assign(neuerArtikel, artikel)
    }

    /**
     *
     * @param alterName
     * @param neuerName
     */
    artikelUmbenennen(alterName, neuerName) {
        let artikel = this.artikelFinden(alterName, true)
        if (artikel) {
            artikel.name = neuerName
            App.informieren(`[${this.name}] Artikel "${alterName}" umbenannt in "${neuerName}"`)
        }
    }

    /**
     *
     * @param name
     */
    artikelEntfernen(name) {
        console.log(name)
        let artikel = this.artikelFinden(name, true)
        if (artikel) {
            let index = this.artikelListe.indexOf(artikel)
            this.artikelListe.splice(index, 1)
            App.informieren(`[${this.name}] Artikel "${name}" entfernt`)
        }
    }
}

/**
 * Hier werden die Artikel abgeändert über den Button: Edit
 */


class ArtikelTag extends React.Component {
    constructor(props) {
        super(props)
        /**
         *
         * @type {{newName, isEditing: boolean}}
         */
        this.state = {
            /**
             * schaltet den Edit Modus um für Artikel umbenennen
             */
            isEditing: false,
            /**
             * enthält den Namen des Artikels im Edit-Modus
             */
            newName: this.props.artikel.name
        }
    }

    /**
     * ändert den Modus
     * @param event
     */
    handleChange(event) {
        this.setState({newName: event.target.value})
    }

    /**
     * übernimmt den neuen Namen
     * @param artikel
     * @param event
     */
    artikelUmbenennen(artikel, event) {
        if (event && event.key != "Enter") return
        artikel.name = this.state.newName
        this.setState({isEditing: false})
    }

    render = () => {
        const artikel = this.props.artikel

        const viewTemplate = (
            <dd>
                <label>
                    <input type="checkbox" checked={artikel.gekauft}
                           onChange={() => this.props.checkHandler(this.props.artikel)}/>
                    {artikel.gekauft ?
                        /**
                         * wird die Menge vor dem Namen angezeigt
                         */
                        <s>{artikel.name}</s> : artikel.menge + " x " + artikel.name}
                </label>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: true})}>edit </i>
                <i className="material-icons"
                   onClick={() => this.props.deleteHandler(artikel.name)}>delete </i>
            </dd>
        )

        const editTemplate = (
            <dd>
                <input type="search" value={this.state.newName} autoFocus={true}
                       onChange={event => this.handleChange(event)}
                       onKeyPress={event => this.artikelUmbenennen(artikel, event)}/>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: false})}>cancel </i>
                <i className="material-icons"
                   onClick={() => this.artikelUmbenennen(artikel)}>check_circle </i>
            </dd>
        )

        return (
            this.state.isEditing
                ? editTemplate
                : viewTemplate
        )


    }
}

/**
 * Diese Klasse beinhaltet die Artikel Attribute
 */
class Artikel {
    static artikelCounter = 1

    /**
     * werden die Artikel festgelegt
     * @param {name}
     * @param {index}
     * @param {menge}
     */
    constructor(name, index, menge = 1) {

        this.id = Artikel.artikelCounter++
        this.index = index
        this.name = name
        this.gekauft = false
        this.menge = menge
    }
}

/**
 * Diese Klasse steuert das Modell der ShoppingList
 *
 * @property {string}   STORAGE_KEY          - Name des Eintrags im LocalStorage
 * @property {Gruppe[]} gruppenListe         - enthält die Artikelgruppen
 * @property {number}   aktiveGruppe         - enthält die ID der aktuell ausgewählten Gruppe
 * @property {boolean}  meldungenAusgeben    - steuert, ob eine Meldung ausgegeben werden soll oder nicht
 * @property {boolean}  einkaufenAufgeklappt - merkt sich, ob die "Einkaufen"-Liste aufgeklappt ist
 * @property {boolean}  erledigtAufgeklappt  - merkt sich, ob die "Erledigt"-Liste aufgeklappt ist
 */

class App {
    static STORAGE_KEY = "einkaufslisteDaten"
    static gruppenListe = []
    static aktiveGruppe = null
    static meldungenAusgeben = true

    /**
     * Sucht eine Gruppe nach ihrer ID und liefert sie als Objekt zurück
     * @param {number} gruppenId - ID der gesuchten Gruppe
     * @returns {Gruppe|null} gefundeneGruppe - die gefundene Gruppe; `null`, wenn nichts gefunden wurde
     */
    static gruppeFinden(gruppenId) {
        const gefundeneGruppen = this.gruppenListe.filter((gruppe) => gruppe.id == gruppenId)
        if (gefundeneGruppen.length > 0) {
            return gefundeneGruppen[0]
        } else {
            App.informieren(`[App] Gruppe "${gruppenId}" nicht gefunden`, true)
            return null
        }
    }

    /**
     * Fügt eine Gruppe in der Gruppenliste hinzu
     * @param {string} name - Name der neuen Gruppe
     * @returns {Gruppe} neueGruppe - die neu hinzugefügte Gruppe
     */
    static gruppeHinzufuegen = (name) => {

        const gleicheGruppen = this.gruppenListe.filter(gruppe => gruppe.name === name)
        // keine Gruppe mit diesem Namen vorhanden
        if (gleicheGruppen.length === 0) {
            let neueGruppe = new Gruppe(name, this.gruppenListe.length)
            this.gruppenListe.push(neueGruppe)
            console.log(neueGruppe)
            App.informieren(`[App] Gruppe "${neueGruppe.name}" hinzugefügt`)
            this.aktiveGruppe = neueGruppe.id
            return neueGruppe
        } else {
            App.informieren(`[App] Gruppe "${name}" existiert schon!`, true)
        }
    }

    /**
     * Benennt die Gruppe mit der ID `gruppenId` um
     * @param {number} gruppenId - ID der umzubenennenden Gruppe
     * @param {string} neuerName - der neue Name der Gruppe
     */
    static gruppeUmbenennen(gruppenId, neuerName) {
        let gruppe = this.gruppeFinden(gruppenId)
        if (gruppe) {
            App.informieren(`[App] Gruppe "${gruppe.name}" umbenannt in "${neuerName}"`)
            gruppe.name = neuerName

        }
    }

    /**
     * Entfernt die Gruppe mit der `gruppenId`
     * @param {number} gruppenId - ID der zu löschenden Gruppe
     */
    static gruppeEntfernen(gruppenId) {
        let gruppe = this.gruppeFinden(gruppenId)
        if (gruppe) {
            let index = this.gruppenListe.indexOf(gruppe)
            // alle Artikel dieser Gruppe entfernen
            gruppe.artikelListe.map((artikel) => gruppe.artikelEntfernen(artikel))
            this.gruppenListe.splice(index, 1)
            App.informieren(`Gruppe "${gruppe.name}" entfernt`)
        } else {
            App.informieren(`Gruppe "${gruppenId}" konnte NICHT entfernt werden`, true)
        }
    }

    /**
     * Gibt die Gruppen mit Artikeln auf der Konsole aus
     */
    static allesAuflisten() {
        this.informieren("\nEinkaufsliste              ^")
        this.informieren("----------------------------")
        this.gruppenListe.map(gruppe => {
            console.debug(`[${gruppe.name}]`)
            gruppe.artikelAuflisten(false)
        })
        console.debug()
    }

    /**
     * Liest den Startzustand aus einer JSON-Datei ein
     * @param {string} dateiname - Name der einzulesenden JSON-Datei
     */
    static async datenEinlesen(dateiname = "js/startzustand.json") {
        const response = await fetch(dateiname)
        const daten = await response.json()
        this.initialisieren(daten)
    }

    /**
     * Initialisiert die App  aus einer JSON-Datei oder aus dem LocalStorage
     * @param {object} jsonDaten - die übergebenen JSON-Daten
     */
    static initialisieren(jsonDaten) {
        this.gruppenListe = []
        jsonDaten.gruppenListe.map(gruppe => {
            let neueGruppe = this.gruppeHinzufuegen(gruppe.name)
            gruppe.artikelListe.map(artikel => {
                neueGruppe.artikelObjektHinzufuegen(artikel)
            })
        })
        this.aktiveGruppe = jsonDaten.aktiveGruppe
    }

    /**
     * Deaktiviert die Konsolen-Ausgabe in {@link informieren()}
     */
    static stummschalten() {
        this.meldungenAusgeben = false
    }

    /**
     * Aktiviert die Konsolen-Ausgabe in {@link informieren()}
     */
    static lautschalten() {
        this.meldungenAusgeben = true
    }

    /**
     * Speichert den App-Zustand im LocalStorage
     */
    static speichern = () => {
        const json = {
            gruppenListe: this.gruppenListe,
            aktiveGruppe: this.aktiveGruppe,
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(json))
    }

    /**
     * Lädt den App-Zustand aus dem LocalStorage
     */
    static laden = () => {
        let daten = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
        this.initialisieren(daten)
    }

    /**
     * Gibt eine Meldung aus und speichert den aktuellen Zustand im LocalStorage
     * @param {string} nachricht - die auszugebende Nachricht
     * @param {boolean} istWarnung - steuert, ob die {@link nachricht} als Warnung ausgegeben wird
     */
    static informieren(nachricht, istWarnung) {
        if (this.meldungenAusgeben) {
            if (istWarnung) {
                console.warn(nachricht)
            } else {
                console.debug(nachricht)
                this.speichern()
            }
        }
    }
}

