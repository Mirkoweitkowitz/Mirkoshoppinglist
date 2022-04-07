/**
 * werden die Artikel festgelegt
 * @param {name}
 * @param {index}
 * @param {menge}
 */
class Artikel {
    static artikelCounter = 1

    constructor(name, index) {
        this.id = Artikel.artikelCounter++
        this.index = index
        this.name = name
        this.gekauft = false
    }
}