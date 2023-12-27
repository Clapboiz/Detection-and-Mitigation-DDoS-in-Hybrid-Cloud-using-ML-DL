import React from "react";
import "../style/login.css";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            something: "",
            role: "admin",
        };
    }

    submit = async (event) => {
        event.preventDefault();
        if (this.state.role === "admin") {
            const url = "http://127.0.0.1:8000/admin";
            // const response = await axios.get(url, {}, {
            //     auth: {
            //         username: "abc",
            //         password: "abc"
            //     }
            // });

            // const header = "Authorization: Basic YWJjOmFiYw";
            // const response = await axios.get(url, {headers: {header}}); 
            // console.log(response.data);
            const originalHeaders = new Headers({
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Host': '127.0.0.1:8000',
                'If-None-Match': 'W/"17-tmDXLwPOdw6vkKRJuGum8Ew56SI"',
                'Origin': 'http://localhost:3000',
                'Referer': 'http://localhost:3000/',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
                'Authorization': "Basic YWJjOmFiYw"
              });


            //const headers = new Headers();
            originalHeaders.append('Authorization', "Basic YWJjOmFiYw");
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: originalHeaders,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                this.setState({
                    something: response.data.msg
                });
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }

        }
        else if (this.state.role === "user") {
            const url = "http://127.0.0.1:8000/user";
        }
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
                    <div id="response" style={{ display: "none" }} className="text-center alert"></div>
                    <div className="form-group row">
                        <label for="username" className="col-sm-2 col-form-label">Username*</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="username" placeholder="Username" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Password*</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg w-100" onClick={this.submit}>Sign In</button>
                    <a href="">Forgot password? </a>
                    <hr />
                    <button type="submit" className="toregister btn btn-primary btn-lg w-100">Sign Up New Account</button>
                </form>
            </div>
        </>
    }
}

export default Login;