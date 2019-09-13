import React from 'react';
import './Login.css';
import { encode } from 'base-64';
import { Form, Button, Alert } from 'react-bootstrap';

class Login extends React.Component {

    constructor(props) {
        super(props);

        localStorage.removeItem('jwt');

        this.state = {
            username: 'Stevenartz',
            password: 'password',
            showErrMsg: false,
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        let url = 'http://localhost:8080/authenticate';

        let headers = new Headers();

        headers.append('Authorization', 'Basic ' + encode(this.state.username + ':' + this.state.password));

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
            <div className='login-form'>
                <h1>Login</h1>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            id='username'
                            type='text'
                            placeholder='Enter username'
                            autoComplete='off'
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            id='password'
                            type='password'
                            placeholder='Password'
                            autoComplete='off'
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </Form.Group>
                    <Alert
                        show={this.state.showErrMsg}
                        variant='danger'>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            Login failed: Invalid username or password!
                         </p>
                    </Alert>
                    <Button
                        variant='primary'
                        type='submit'
                        size='lg'
                        disabled={!this.validateForm()}
                        block>
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login;