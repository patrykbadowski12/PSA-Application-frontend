import React from 'react';
import '../index';
import '../index.css';
import '../styles/LoginStyle.css'
import fetch from 'isomorphic-fetch'
import { Redirect } from 'react-router-dom'



class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            responseStatus: ''

        };

        this.sendEmail = this.sendEmail.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    sendEmail(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/session', {
            method: 'POST',
            body: JSON.stringify(this.state.email),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(results => this.setState({
            responseStatus: results.status
        }));
    }



    handleEmail(event) {
        this.setState({ email: event.target.value });
        console.log(this.state.email);
    }

    render() {

        if (this.state.responseStatus === 200) {
            return <Redirect to='/Services' />;
        }

        return (
            <div >
                <section className="login-block">
                    <div className="container">
                        <div className="row ">
                            <div className="col login-sec">
                                <h2 className="text-center">Login Now</h2>
                                <form className="login-form">
                                    <div className="form-group">
                                        <label className="text-uppercase">Username</label>
                                        <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmail} />

                                        <input type="submit" value="Submit" className="btn btn-login float-right" onClick={this.sendEmail} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Login;

