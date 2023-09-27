import React, { useState ,useEffect} from 'react'
import {Link} from "react-router-dom"
// import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Home() {

  const [auth,setAuth] = useState(false);
  const [message,setMessage] =useState("")
  const [name,setName] = useState("")

  axios.defaults.withCredentials= true;
  useEffect(()=>{
    axios.get('http://localhost:7000')
    .then(res=>{
        if(res.data.Status==="Success"){
          setAuth(true) 
          setName(res.data.name) 
          

        }else{
            setAuth(false)
            setMessage(res.data.Error)
        }
    })
    .then(err=>console.log(err)); 
  },[])

  const handleDelete = () =>{
    axios.get("http://localhost:7000/logout")
    .then(res=>{
      location.reload(true);
    }).catch(err=>console.log(err));
  } 


  return (
    <div>
      {

        auth ?
          <div>
            <h3>You are Atuhorizes---{name}</h3>
            <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
          </div>
          :
          <div>
            <h3>{message }</h3>
            <h3>Login Now</h3>
            <Link to='/login' className='btn btn-primary'>Login</Link>
          </div>

      }
    </div>
  )
}

export default Home