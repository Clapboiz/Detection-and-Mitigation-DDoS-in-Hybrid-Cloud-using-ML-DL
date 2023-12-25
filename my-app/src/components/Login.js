import React from "react";
import "../style/login.css";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            something: ""
        };
    }

    async componentDidMount() {
        // TODO: calling admin api 
        // const response = await axios.get("http://127.0.0.1:5000/admin");
        // console.log(response.data);
        // this.setState({
        //     something: response.data.msg
        // });
    }

    render() {
    return <>
        <div className="mid-size bg-light">
            <form id="myForm" onsubmit="submitForm()" className="">
                <h1 className="text-center">Sign in</h1>
                <div id="response" style={{display: "none"}} className="text-center alert"></div>
                <div className="form-group row">
                    <label for="username" className="col-sm-2 col-form-label">Username*</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputPassword3" className="col-sm-2 col-form-label">Password*</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-lg w-100">Sign In</button>
                <a href="">Forgot password? </a>
                <hr/>
                <button type="submit" className="toregister btn btn-primary btn-lg w-100">Sign Up New Account</button>
            </form>
        </div>
    </>
    }
}

export default Login;