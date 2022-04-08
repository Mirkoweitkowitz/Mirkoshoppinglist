/**

class GruppenTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aufgeklappt: true,
            dragArtikel: null
        }
    }

    artikelEntfernen(artikel) {
        this.props.gruppe.artikelEntfernen(artikel)
        this.props.aktiveGruppeHandler(this.props.gruppe.id)
    }

    aufZuKlappen() {
        this.setState({aufgeklappt: !this.state.aufgeklappt})
    }

    handleDrop() {
        if (window.alteGruppenId != this.props.gruppe.id) {
            const neueGruppe = App.gruppeFinden(this.props.gruppe.id)
            neueGruppe.artikelVerschieben(window.verschobenerArtikel, 0)
            const alteGruppe = App.gruppeFinden(window.alteGruppenId)
            alteGruppe.artikelEntfernen(window.verschobenerArtikel.name)
            // refresh triggern
            this.props.aktiveGruppeHandler(this.props.gruppe.id)
        }
    }

    render() {
        const gekauft = this.props.gekauft
        const gruppe = this.props.gruppe
        let itemsRelevant = []
        for (const artikel of gruppe.artikelListe) {
            if (artikel.gekauft == gekauft) {
                itemsRelevant.push(artikel)
            }
        }

        return (
            <div id={gruppe.id}>
                {!gekauft
                    ? <dt className={this.props.aktiv ? "aktiv" : "inaktiv"}
                          onClick={() => this.props.aktiveGruppeHandler(gruppe.id)}
                          onDrop={() => this.handleDrop()}
                          onDragOver={e => e.preventDefault()}>
                        {gruppe.name}
                        <i className="material-icons" onClick={() => this.aufZuKlappen()}>
                            {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
                        </i>
                    </dt>
                    : ''
                }
                {this.state.aufgeklappt
                    ? itemsRelevant.map(artikel =>
                        <ArtikelTag key={artikel.index} artikel={artikel}
                                    checkHandler={this.props.checkHandler}
                                    deleteHandler={() => this.artikelEntfernen(artikel.name)}
                                    moveHandler={() => this.props.aktiveGruppeHandler(gruppe.id)}/>)
                    : ''
                }
            </div>
        )
    }
}



 * Diese Komponenten stellt einen Artikel dar, den man abhaken und reaktivieren kann
 * props:
 *  artikel: {Artikel}
 *

class ArtikelTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // schaltet den Edit-Mode um
            isEditing: false,
            // enthält den neuen Namen im Edit-Mode
            newName: this.props.artikel.name
        }
    }

    handleChange(event) {
        this.setState({newName: event.target.value})
    }

    /**
     * Benennt einen Artikel um
     * @param {Artikel} artikel - der umzubenennende Artikel
     * @param {Event.KEYPRESS} event -

    artikelUmbenennen(artikel, event) {
        if (event && event.key != "Enter") return
        artikel.name = this.state.newName
        this.setState({isEditing: false})
    }

    handleDragStart(event, artikel) {
        const gruppenId = event.target.closest("div").id
        window.alteGruppenId = gruppenId
        window.verschobenerArtikel = artikel
    }

    handleDrop(event, artikelIndex) {
        const gruppenId = event.target.closest("div").id
        const neueGruppe = App.gruppeFinden(gruppenId)
        neueGruppe.artikelVerschieben(window.verschobenerArtikel, artikelIndex)
        if (window.alteGruppenId != gruppenId) {
            const alteGruppe = App.gruppeFinden(window.alteGruppenId)
            alteGruppe.artikelEntfernen(window.verschobenerArtikel.name)
        }
        // refresh triggern
        this.props.moveHandler()
    }

    render() {
        const artikel = this.props.artikel

        const viewTemplate = (
            <dd draggable={true}
                onDragStart={e => this.handleDragStart(e, artikel)}>
                <label onDrop={e => this.handleDrop(e, artikel.index)}
                       onDragOver={e => e.preventDefault()}>

                    <input type="checkbox" checked={artikel.gekauft}
                           onChange={() => this.props.checkHandler(artikel)}/>
                    {artikel.gekauft ? <s>{artikel.name}</s> : artikel.name}
                </label>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: true})}>edit </i>
                <i className="material-icons"
                   onClick={this.props.deleteHandler}>delete </i>
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
 */
/**
 * Diese Komponenten stellt einen Artikel dar, den man abhaken und reaktivieren kann
 * props:
 *  artikel: {Artikel}
 *

class ArtikelTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // schaltet den Edit-Mode um
            isEditing: false,
            // enthält den neuen Namen im Edit-Mode
            newName: this.props.artikel.name
        }
    }

    handleChange(event) {
        this.setState({newName: event.target.value})
    }
 */
    /**
     * Benennt einen Artikel um
     * @param {Artikel} artikel - der umzubenennende Artikel
     * @param {Event.KEYPRESS} event -

    artikelUmbenennen(artikel, event) {
        if (event && event.key != "Enter") return
        artikel.name = this.state.newName
        this.setState({isEditing: false})
    }

    handleDragStart(event, artikel) {
        const gruppenId = event.target.closest("div").id
        window.alteGruppenId = gruppenId
        window.verschobenerArtikel = artikel
    }

    handleDrop(event, artikelIndex) {
        const gruppenId = event.target.closest("div").id
        const neueGruppe = App.gruppeFinden(gruppenId)
        neueGruppe.artikelVerschieben(window.verschobenerArtikel, artikelIndex)
        if (window.alteGruppenId != gruppenId) {
            const alteGruppe = App.gruppeFinden(window.alteGruppenId)
            alteGruppe.artikelEntfernen(window.verschobenerArtikel.name)
        }
        // refresh triggern
        this.props.moveHandler()
    }

    render() {
        const artikel = this.props.artikel

        const viewTemplate = (
            <dd draggable={true}
                onDragStart={e => this.handleDragStart(e, artikel)}>
                <label onDrop={e => this.handleDrop(e, artikel.index)}
                       onDragOver={e => e.preventDefault()}>

                    <input type="checkbox" checked={artikel.gekauft}
                           onChange={() => this.props.checkHandler(artikel)}/>
                    {artikel.gekauft ? <s>{artikel.name}</s> : artikel.name}
                </label>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: true})}>edit </i>
                <i className="material-icons"
                   onClick={this.props.deleteHandler}>delete </i>
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
     */