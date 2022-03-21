// noinspection JSXNamespaceValidation
class ShoppingTag extends React.Component {
    render = () => {
        return (


            <div>

                <header>
                    <h1>Einkaufsliste</h1>
                    <nav>
                        <input type="text" placeholder="Artikel hinzufügen"></input>
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
                            <dt>Obst & Gemüse
                                <i className="material-icons">expand_less</i>
                            </dt>
                            <dd><label><input type="checkbox"></input> Brokkoli</label></dd>
                            <dt>Getreideprodukte
                                <i className="material-icons">expand_less</i>
                            </dt>
                            <dd><label><input type="checkbox"></input> Reis</label></dd>
                            <dt>Milchprodukte
                                <i className="material-icons">expand_less</i>
                            </dt>
                            <dd><label><input type="checkbox"></input> Streukäse</label></dd>
                        </dl>
                    </section>
                    <hr/>

                    <section>
                        <h2>Erledigt
                            <i className="material-icons">expand_less</i>
                        </h2>
                        <dl>
                            <dt>Hülsenfrüchte
                                <i className="material-icons">expand_less</i>
                            </dt>
                            <dd><label><input type="checkbox"></input> <s>Tofu</s></label></dd>
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
