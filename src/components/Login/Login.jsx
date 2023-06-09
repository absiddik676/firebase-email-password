import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [show,setShow] = useState(false);
    const emailRef = useRef();


    const auth = getAuth(app)
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password =  form.password.value;
        setError('')
        setSuccess('')
        // if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        //     setError('please add two uppercase ');
        //     return
        // }
        // else if(!/(?=.*[!#$%&? "])/.test(password)){
        //     setError('please add a spacial character')
        //     return
        // }
        // else if(password.length<6){
        //     setError('password must be 6 character long')
        //     return
        // }

        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const loggedUser = result.user;
            setSuccess('User logged in successful.')
            setError('')
            console.log(loggedUser);
        })
        .then(error=>{
            setError(error.message)
        })
        console.log(email,password);
    }

    const handelResetPassword = ()=>{
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth , email)
        .then(()=>{
            alert('cheack your email')
        })
        .catch(error=>{
            console.log(error);
        })
        
    }

    const handelShowPassword = ()=>{
        setShow(!show)
    }

    return (
        <div className='w-50 mt-5 mx-auto'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} required type="email" name='email' placeholder="Enter email"   />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type={show ? 'text' : 'password'} name='password' placeholder="Password"  />
                    <small onClick={handelShowPassword}>Show Password</small>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <small>New to this website, </small><Link to="/registerRBS">please register</Link>
            <small> Forgot password? <Link onClick={handelResetPassword}>Reset</Link></small>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;