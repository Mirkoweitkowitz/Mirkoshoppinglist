/**
 * 1) Erstelle die clickHandler Funktion und den Button mit onClick Event.
 */
class FunctionClick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAlarmOn: true};

  }

  handleClick=()=>{
    this.setState({isAlarmOn:!this.state.isAlarmOn})
    alert('Du hast auf mich geklickt!')
  }

  render() {
    return (
        <button onClick={this.handleClick}>
          {this.state.isAlarmOn ? 'Alarm' : 'Du hast auf mich geklickt!'}
        </button>
    );
  }
}

const element =<FunctionClick />;
ReactDOM.render(
  element,
  document.getElementById(`root`)
)


/**
 * 2) Sorge dafür, dass der Code die aktuelle Anzahl von Clicks bekommt und nutze dies in deinem Event!
 */
class Counter extends React.Component {
  state = {
    counter: 0
  }

  increment = () => {
    this.setState({counter:
        this.state.counter+1});
  }
  render() {
    return <div>

      <button onClick={this.increment}> Anzahl Klicks! {this.state.counter}

      </button>

    </div>;
  }
}

const element4 = <Counter />;
ReactDOM.render(
  element4,
  document.getElementById(`Aufgabe4`)
);