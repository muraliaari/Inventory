import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin=()=>{
      if(username, password){
        try{
          console.log(username, password)
          axios.post('http://localhost:4000/login',{
            username,
            password
          }).then((res)=>{
            console.log(res.data);
            if(res.data.message === "Success"){
              sessionStorage.setItem('name',res.data.name)
              sessionStorage.setItem('username', res.data.username)
              console.log(sessionStorage.getItem("username"))
            navigate('/userinventory', {state: {name : res.data.name}}) 
            }
            else{
              alert("Please check username or password")
            }
          })
        }
      catch(err){
        console.log(err)
      }
      }
      else{
        alert("All the fields required")
      }
  }
  return (
    <div>
        <h1>Login</h1>
        <div className="input-group mb-3">
  
  <input type="text" className="form-control" placeholder='username' onChange={(e)=> setUsername(e.target.value)}/>
  
</div>
<div className="input-group mb-3">
  
  <input type="text" className="form-control" placeholder='password' onChange={(e)=> setPassword(e.target.value)}/>
  
</div>
<button onClick={handleLogin}>Login</button>
<button onClick={()=>navigate("/signup")}>Signup</button>


    </div>
  )
}

export default Login