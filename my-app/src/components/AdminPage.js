import React from "react";
import axios from "axios";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            something: ""
        };
    }

    async componentDidMount() {
        // TODO: calling admin api 
        const response = await axios.get("http://127.0.0.1:5000/admin");
        console.log(response.data);
        this.setState({
            something: response.data.msg
        });
    }

    render() {
        return <h2>THIS IS ADMIN PAGE, {this.state.something}</h2>;
    }
}

export default AdminPage;