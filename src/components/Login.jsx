import React from 'react';
import { encode } from 'base-64';
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "Stevenartz",
            password: "password"
        }
    }

    handleGetToken = () => {

        let url = 'http://localhost:8080/authenticate';

        let headers = new Headers();

        headers.append('Authorization', 'Basic ' + encode(this.state.username + ":" + this.state.password));

        fetch(url, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.text();
                } else if (resp.status === 401) {
                    throw new Error();
                }
            })
            .then(data => {
                alert(data);
            })
            .catch(() => {
                this.showErrorMsg();
            })

    }

    login = response => {
        let text = response;
        alert("Success: " + text);
    }

    showErrorMsg = () => {
        alert(">>> ErrorMsg");
    }

    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleGetToken();
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)} className='login-form'>
                    <h1>Login</h1>

                    <div className='textbox'>
                        <input
                            id='username'
                            autoComplete='off'
                            placeholder='Username'
                            type='text'
                            onChange={this.handleChange} />
                    </div>

                    <div className='textbox'>
                        <input
                            id='password'
                            autoComplete='off'
                            placeholder='Password'
                            type='password'
                            onChange={this.handleChange}
                        />
                    </div>

                    <button
                        type='submit'
                        className='loginbtn'
                        disabled={!this.validateForm()}
                    >Login</button>

                    <div className='bottom-text'>
                        Don't have account? <a href='#'>Sign up</a>
                    </div>

                </form>
            </div>
        )
    }
}

export default Login;