import React,{useEffect,useContext} from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from 'react';
function Home() {
  const {authState} = useContext(AuthContext);
  const [toDoList,setToDoList] = useState([]);
  const [call,setcall] = useState(0);
  const initialValues={
   To_Do:"",
};
     useEffect(()=>{
     const fetchToDOList = async() => await  axios.get(`http://localhost:3001/posts/${authState.id}`).then((response)=>{
        setToDoList(response.data);
      })
      fetchToDOList();
    },[authState,call])
    const onSubmit = (data,{resetForm}) =>{
      axios.post("http://localhost:3001/posts/",{postText: data.To_Do ,username:authState.username,UserId:authState.id}).then((response) => {
      setcall(!call);
      resetForm();
    })
  }
  const remove = (id) =>{
    console.log(id);
    axios.delete(`http://localhost:3001/posts/remove/${id}`).then((response) => {
    setcall(!call);
  })
  }
  return (
    <div className='w-max mx-auto'>
      <div className='text-3xl font-bold'>
        Dashboard</div> 
<Formik initialValues={initialValues} onSubmit={onSubmit}>
                     <Form className='Form'>
                     <h1 className='m-2 p-2' >Enter new To Do task: 
                            <Field className='ml-4' id="inputUser" name="To_Do" placeholder="(Text..)"/>
                            <br />
                            <ErrorMessage className='text-black' name="To_Do" component="span"/>
                            </h1>
                            <button type='submit' disabled={authState.disable} className='w-max px-10 bg-[#9F0404] text-[#EEE1E1] md:px-20 font-bold text-xl'>Add</button>
                        </Form>
                    </Formik>
{toDoList.map((toDo,key)=>{
  return(
  <div key={key}>
    {toDo.postText}
    <button onClick={()=>{remove(toDo.id)}} className='border-2 ml-4 bg-gray-100'>X</button>
    </div>
    )
})}
                    
    </div>
  )
}

export default Home