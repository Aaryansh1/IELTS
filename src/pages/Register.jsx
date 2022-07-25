import React,{ useContext } from 'react'
import './Register.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'; 
import "yup-phone";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from './AuthContext';
axios.defaults.withCredentials = true
function Register() {
    const navigate = useNavigate();
    const {setAuthState} = useContext(AuthContext);
    const initialValues={
        email:"",
        username:"",
        password:"",
        address:"",
        phonenumber:"",
        pin:""
    };
    
const onSubmit = (data) =>{
    axios.post("http://localhost:3001/Auth",data).then((response) => {
    if(response.status===200)    
   { axios.post("http://localhost:3001/Auth/login",data,{withCredentials:true}).then((response) => {  
            if(response.status===200)
                    {
                        axios.get("http://localhost:3001/Auth/cookie",{withCredentials:true}).then((res) => { 
                            setAuthState({username:res.data.username,id:res.data.id,status:true})
                        });
                    };
            })
            navigate('/');
        }    });
};
const validationSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    username:Yup.string().required(),
    password:Yup.string().required(),
    phonenumber:Yup.string().phone("IN").required(),
});
    return (
                <div className='Register'>
               <div className='Register__container'>
                   <div className='logosignup'>
                    <Link to='/'>
                   <h1 className='font-bold text-2xl'>Sign-Up</h1>
                   </Link>
                   </div>
                   <div className="CreateUser">
                   <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                     <Form className='Form'>
                      <h1 className='m-2 p-2' >Email:
                            <Field className="border-2" id="inputUser" name="email" placeholder="(Email..)"/>
                            <br />
                            <ErrorMessage className='text-black' name="email" component="span"/>
                            </h1>
                     <h1 className='m-2 p-2'>Your Name:      
                            <Field className="border-2" id="inputUser1" name="username" placeholder="(Ex. First name Second name)"/>
                            <br />
                            <ErrorMessage className='text-black' name="username" component="span"/>
                            </h1>
                     <h1 className='m-2 p-2'>Password:      
                            <Field id="inputUsers" className="border-2" type="password" name="password" placeholder="(Ex. password)"/>
                            <br />
                            <ErrorMessage className='text-black' name="password" component="span"/>
                            </h1>
                      <h1 className='m-2 p-2'>Phone no:      
                            <Field id="inputUser3s" className="border-2" name="phonenumber" placeholder="(Ex. 0000000000)"/>
                            <br />
                            <ErrorMessage className='text-black' name="phonenumber" component="span"/>
                            </h1>
                            <br />
                            <button type='submit' className='Register__loginbutton'>Create a New Account</button>
                        </Form>
                    </Formik>
                    </div>
                   <Link className='tologin' to='/Login'>
                <p className='Register__loginbutton'>Already have an account?Signin</p>
                 </Link>
               </div>
        </div>
    )
}

export default Register;
