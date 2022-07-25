import React, {useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'; 
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './Login.css';
axios.defaults.withCredentials = true
export default function Login() {
    const navigate = useNavigate();
    const {setAuthState} = useContext(AuthContext);
    const initialValues={
        email:"",
        password:"",
    };
    
const onSubmit = async(data) =>{
await   axios.post("http://localhost:3001/Auth/login",data,{withCredentials:true}).then((response) => {  
    if(response.status === 200)
            {
                    axios.get("http://localhost:3001/Auth/cookie",{withCredentials:true}).then((res) => { 
                    setAuthState({username:res.data.username,id:res.data.id,status:true})
                });
            };
    })
    navigate('/');
};
const validationSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
});
    return (
        <div className='login'>
            <div className='login__container'>
                <div className='logosignin'>
                  <Link to='/'>
                <h1 className='font-bold text-2xl'>Sign-In</h1>
                </Link>
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                     <Form className='Form'>
                     <h1 className='m-2 p-2' >Email:
                            <Field id="inputUser" className="border-2" name="email" placeholder="(Email..)"/>
                            <br />
                            <ErrorMessage className='text-black' name="email" component="span"/>
                            </h1>
                            <h1 className='m-2 p-2 flex'>Password:      
                            <Field className="border-2" id="inputUsers" type="password" name="password" placeholder="(Ex. password)"/>
                            <br />
                            </h1>
                            <ErrorMessage className='text-black' name="password" component="span"/>
                            <button type='submit' className='login__signInButton'>Sign In</button>
                        </Form>
                    </Formik>
                <Link className='toRegister' to='/Register'>
                <h4 className='login__registerButton'>Create a New Account</h4>
                </Link>
            </div>
        </div>
    )
}
