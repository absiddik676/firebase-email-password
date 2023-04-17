import React, { useState } from 'react';

const Register = () => {
    
    const [email,setEmail] = useState('')

    const handelEmailChange = (e)=>{
        console.log(e.target.value);
    }

    const handelPasswordBlur = (e)=>{
        console.log(e.target.value);
    }

    const submitRegisterForm = (e)=>{
        e.preventDefault()
        console.log(e.target.email.value);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submitRegisterForm} action="">
            <input onChange={handelEmailChange} placeholder='email' type="email" name="Your Email" id="email" /> <br />
            <input onBlur={handelPasswordBlur} type="password" name="password" placeholder='Your Password' id="password" /><br />
            <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;