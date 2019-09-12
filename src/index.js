
import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM from 'react-router-dom';
import './index.css';


const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;
const NavLink = ReactRouterDOM.NavLink;

class Main extends React.Component{
    render(){
        return <h2>Главная</h2>;
    }
}

class About extends React.Component{
    render(){
        const id= this.props.match.params.id;
        const name = this.props.match.params.name;

        return <h2>Id: {id}, Name: {name}</h2>;
    }
}
class NotFound extends React.Component{
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

function Item(props) {
    return <li>{props.name}</li>
}

class SearchPlugin extends React.Component {
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

class ItemList extends React.Component {
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

class Phone extends React.Component {
    render() {
        const prodId = this.props.match.params.id;
        let phone;
        for (var i=0; i<phones.length; i++) {
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

class PhonesList extends React.Component {
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

class Tablet extends React.Component {
    render() {
        return <h3>Tablets</h3>
    }
}

class Products extends React.Component {
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

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <NavLink exact to="/" activeClassName="active">Главная</NavLink>
                <NavLink to="/about/1/About" activeClassName="active">О сайте</NavLink>
                <NavLink to="/itemList" activeClassName="active">Список</NavLink>
                <NavLink to="/products" activeClassName="active">Товары</NavLink>
            </nav>
        )
    }
}

ReactDOM.render (
    <Router>
        <div>
            <Nav/>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/about/:id/:name" component={About}/>
                <Route path="/itemList" children={()=><ItemList data={propsValues}/>}/>
                <Route path="/products" component={Products}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>,
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

class Headers extends React.Component {
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

class UserInfo extends React.Component {
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

class ClickButton extends React.Component {
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

class AgeField extends React.Component {
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

class UserForm extends React.Component {
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