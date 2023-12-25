import React from "react";
import axios from "axios";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            something: ""
        };
    }

    async componentDidMount() {
        // TODO: calling user api 
        const response = await axios.get("http://127.0.0.1:5000/user");
        console.log(response.data);
        this.setState({
            something: response.data.msg
        });
    }

    render() {
        return <h2>THIS IS USER PAGE, {this.state.something}</h2>;
    }
}

export default UserPage;