
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import './index.css';

import About from "./components/about";

class Main extends Component{
    render(){
        return <h2>Главная</h2>;
    }
}

class NotFound extends Component{
    render(){
        return <h2>Ресурс не найден</h2>;
    }
}


const propsValues = {
    title: "List of phones",
    items: [
        "Iphone 10",
        "HTC U",
        "Samsung"
    ]
}

const Item = ({name}) => {
    return <li>{name}</li>
}

class SearchPlugin extends Component {
    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this)
    }

    onTextChanged(e) {
        let text = e.target.value.trim();
        this.props.filter(text);
    }

    render () {
        return <input type="text" placeholder="Search" onChange={this.onTextChanged}/>
    }
}

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {items: this.props.data.items};

        this.filterList = this.filterList.bind(this);
    }

    filterList(text) {
        let filteredList = this.props.data.items.filter(function(item) {
            return item.toLowerCase().search(text.toLowerCase()) !== -1;
        })

        this.setState({items: filteredList});
    }

    render () {
        return (
            <div>
                <h2>{this.props.data.title}</h2>
                <SearchPlugin filter={this.filterList}/>
                <ul>
                    {
                        this.state.items.map(function(item) {
                            return <Item key={item} name={item}/>
                        })
                    }
                </ul>
            </div>
        );
    }
}

/*ReactDOM.render(
    <ItemList data={propsValues}/>,
    document.getElementById("list")
)*/

const phones =[
    {id: 1, name: "iPhone 7"},
    {id: 2, name: "Google Pixel"},
    {id: 3, name: "HTC U Ultra"}
];

class Phone extends Component {
    render() {
        const prodId = this.props.match.params.id;
        let phone;
        for (let i=0; i<phones.length; i++) {
            if (phones[i].id === prodId) {
                phone = phones[i];
                break;
            }
        }

        if (phone === undefined) {
            return <p>Товар не найден</p>;
        } else {
            return <p>Товар {phone.name}</p>
        }
    }
}

class PhonesList extends Component {
    render() {
        return (
            <div>
                <h2>Список товаров</h2>
                <ul>
                    {
                        phones.map(function(item) {
                            return <li key={item.id}>
                                <NavLink to={`/products/phones/${item.id}`}>{item.name}</NavLink>
                            </li>

                        })
                    }
                </ul>
            </div>


        )
    }
}

class Tablet extends Component {
    render() {
        return <h3>Tablets</h3>
    }
}

class Products extends Component {
    render() {
        return (
            <div>
                <h2>Товары</h2>
                <nav>
                    <Link to="/products/phones">PhonesList</Link>
                    <Link to="/products/tablets">Tablet</Link>
                </nav>
                <Switch>
                    <Route exact path="/products/phones" component={PhonesList}/>
                    <Route path="/products/tablets" component={Tablet}/>
                    <Route path="/products/phones/:id" component={Phone}/>
                </Switch>
            </div>
        )
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => {this.props.onClick(i)}}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    clearHistory() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to #' + move : 'To begin';
            return (
                <li key={move}>
                    <button onClick={() => {this.jumpTo(move)}}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "The winner is " + winner;

        } else {
            status = 'Next ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {
                            // (()=>{
                            //     if (winner)
                            //         return <button onClick={() => this.clearHistory()} style={{backgroundColor: 'green', borderColor: 'green', color: 'white'}}>Начать сначала</button>
                            // })()
                        winner && <button onClick={() => this.clearHistory()} style={{backgroundColor: 'green', borderColor: 'green', color: 'white'}}>Начать сначала</button>
                    }
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

class Nav extends Component {
    render() {
        return (
            <div>
                <nav>
                    <NavLink exact to="/" activeClassName="active">Главная</NavLink>
                    <NavLink to="/about/1/About" activeClassName="active">О сайте</NavLink>
                    <NavLink to="/itemList" activeClassName="active">Список</NavLink>
                    <NavLink to="/products" activeClassName="active">Товары</NavLink>
                    <NavLink to="/game" activeClassName="active">Игра</NavLink>
                </nav>
                <hr/>
            </div>

        )
    }
}

ReactDOM.render (
    <BrowserRouter>
        <div>
            <Nav/>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/about/:id/:name" component={About}/>
                <Route path="/itemList" children={()=><ItemList data={propsValues}/>}/>
                <Route path="/products" component={Products}/>
                <Route path="/game" component={Game}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById("menu")
)

function tick() {
    ReactDOM.render(
        <div>
            <h2>Time: {new Date().toLocaleTimeString()}</h2>
        </div>,
        document.getElementById("header")
    )
}

setInterval(tick, 1000);

class Headers extends Component {
    constructor(props) {
        super(props);
        this.state = {welcome: "Welcome!"};
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <h1>{this.state.welcome}</h1>
                <h2>2 + 2 = {2 + 2}</h2>
            </div>
        )
    }
}

function FullName(props) {
    return <p>FullName: {props.fullName}</p>
}

class UserInfo extends Component {
    render() {
        const user = {
            id: 5,
            age: 33,
            firstName: 'Olga',
            lastName: 'Bondartseva',
            getFullName: function() {
                return `${this.firstName} ${this.lastName}`
            }
        };
        const userClassName = "user-info";
        const styleObj = {
            color: this.props.color,
            fontFamily: this.props.fontFamily,
            fontWeight: this.props.fontWeight
        };

        return (
            <div id={user.id} className={userClassName} style={styleObj}>
                <FullName fullName={user.getFullName()}/>
               <p>Age: {user.age}</p>
               <p>Time generation: {new Date().toLocaleTimeString()}</p>
            </div>
        )
    }
}

UserInfo.defaultProps = {color: "red", fontFamily: "Verdana", fontWeight: "bold"};

ReactDOM.render(
    <div>
        <Headers/>
        <UserInfo color="blue"/>
    </div>,
    document.getElementById("app"),
    function () {
        console.log("rendering")
    }
)

class ClickButton extends Component {
    constructor(props) {
        super(props);
        this.state = {class: "off", label: "Click"};
        this.press = this.press.bind(this);
    }

    press(e) {
        console.log(e);

        let className = (this.state.class === "off") ? "on": "off";
        this.setState({class: className});
    }

    render() {
        return (
            <button onClick={this.press} className={this.state.class}>{this.state.label}</button>
        )
    }
}

ReactDOM.render(
    <ClickButton/>,
    document.getElementById("button")
)

class AgeField extends Component {
    constructor(props) {
        super(props);
        this.state = {age: props.value, valid: this.validateAge(props.value)};
        this.onAgeChange = this.onAgeChange.bind(this)
    }

    validateAge(age) {
        return age >= 0;
    }

    onAgeChange(e) {
        let age = e.target.value;
        this.setState({age: age, valid: this.validateAge(age)})
    }

    render() {
        let ageColor = this.state.valid===true?"green":"red";
        return (
            <p>
                <label>Age:</label><br/>
                <input type="text" value={this.state.age} onChange={this.onAgeChange} style={{borderColor: ageColor}}/>
            </p>
        )
    }
}

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = this.refs.nameField.value;

        if (this.refs.ageField.state.valid === true) {
            alert("Name: " + name + ", Age: " + this.refs.ageField.state.age);
        }
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Name:</label><br/>
                    <input defaultValue="Tom" type="text" ref="nameField"/>
                </p>
                <AgeField value="5" ref="ageField"/>
                <input type="submit" value="Send"/>
            </form>
        )
    }
}

ReactDOM.render(
    <UserForm/>,
    document.getElementById("form")
)