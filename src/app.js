import React, {Component} from "react";
import {connect} from "react-redux";

class App extends Component {
    render () {
        return (
            <div>
                <b>
                    value: {this.props.asd}, name: {this.props.name}
                </b>
                <br/>

                <input
                    value={this.props.asd}
                    onChange={(e) =>
                        this.props.dispatch(
                            {
                                type: "SET_VALUE",
                                value: e.target.value
                            }
                        )
                    }/>

                <input
                    value={this.props.name}
                    onChange={(e) =>
                        this.props.dispatch(
                            {
                                type: "SET_NAME",
                                value: e.target.value
                            }
                        )
                    }/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({asd: state.value, name: state.name})

export default connect(mapStateToProps)(App);