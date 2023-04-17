import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase.config';
const RegesterRBS = () => {
   
    const [error,setError] = useState('')
    const [success,setSuccess] = useState()
    const auth = getAuth(app)
    const handelRegister = e =>{
        setSuccess('')
        setError('')
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(!/(?=.*[A-Z])/.test(password)){
            setError('please add one upper case');
            return;
        }
        else if(!/[a-zA-Z0-9]{8,}/.test(password)){
            setError('Password must be 8 character');
            return
        }
       
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const loggedUser = result.user
            console.log(loggedUser);
            setError('');
            e.target.reset();
            setSuccess('User has create successfully')
        })
        .catch(error=>{
            setError(error.message);
        })

    }


    return (
        <div className='w-50 mx-auto'>
            <h4 className='text-primary'>Please Register</h4>
            <Form onSubmit={handelRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Our Terms and condition" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default RegesterRBS;