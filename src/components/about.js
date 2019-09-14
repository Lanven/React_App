import React, { Component } from "react";

class About extends Component {
    render(){
        const id= this.props.match.params.id;
        const name = this.props.match.params.name;

        return <h2>Id: {id}, Name: {name}</h2>;
    }
}

export default About;
