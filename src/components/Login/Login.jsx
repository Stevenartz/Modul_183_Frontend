import React from 'react';
import './Login.css';
import { encode } from 'base-64';

class Login extends React.Component {

    constructor(props) {
        super(props);

        localStorage.removeItem('jwt');

        this.state = {
            username: "Stevenartz",
            password: "password",
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
                localStorage.setItem('jwt', data);
                this.props.history.push('/dashboard');
            })
            .catch(() => {
                this.showErrorMsg();
            })
    }

    clearLocalStorage = () => {
        localStorage.removeItem('jwt');
    }

    showErrorMsg = () => {
        this.setState({ showErrMsg: true });
    }

    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)} className='login-form'>
                    <h1>Login</h1>

                    <div className='textbox'>
                        <input
                            id='username'
                            autoComplete='off'
                            placeholder='Username'
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.username} />
                    </div>

                    <div className='textbox'>
                        <input
                            id='password'
                            autoComplete='off'
                            placeholder='Password'
                            type='password'
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>

                    {this.state.showErrMsg &&
                        <span className='errorMsg'>Login failed: Invalid username or password!</span>
                    }

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