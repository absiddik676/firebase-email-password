import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateCurrentUser, updateProfile } from "firebase/auth";
import app from '../../firebase.config';
import { Link } from 'react-router-dom';
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
        const name = e.target.name.value;
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
            setError('');
            e.target.reset();
            setSuccess('User has create successfully')
            sendVerificationEmail(loggedUser)
            updateUsers(name,loggedUser)
            console.log(loggedUser);
        })
        .catch(error=>{
            setError(error.message);
        })

    }

    const sendVerificationEmail = currentUser =>{
        sendEmailVerification(auth,currentUser)
        .then(result=>{
            alert('pleas vkj')
            console.log(result);
        })
    }
    const updateUsers = (name,user)=>{
        updateProfile(user,{
            displayName:name
        })
        .then(()=>{
            console.log('user updated');
        })
        .catch(error=>{
            console.log('updated');
        })
    }

    


    return (
        <div className='w-50 mx-auto'>
            <h4 className='text-primary'>Please Register</h4>
            <Form onSubmit={handelRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter Your Name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter Your email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Enter Your Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Our Terms and condition" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <small>Already have a account,</small><Link to="/login"> please login</Link>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
}

export default RegesterRBS;