import  {  useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

const [name, setName] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [cpassword, setCpassword] = useState('')
const navigate = useNavigate()


const handleName=(e)=>{
  setName(e.target.value)
  // console.log(name)
}

const handleSubmit=async()=>{
  console.log(name, username, password, cpassword)
  if(name, username, password, cpassword){
    try{
      await axios.post('http://localhost:4000/signup', {
        name,
        username,
        password, 
        cpassword
      }).then((res) => {
        console.log(res.data)
        navigate('/login')
      })
    } catch(err){
      console.log(err)
    }
  }
  else{
    alert('Please provide all the details')
  }
}
  return (
    <div>
      <h1>Signup</h1>

<div className="input mb-3">
  <input type="text" placeholder="name" className="form-control" onChange={handleName}/>
</div>
<div className="input-group mb-3">
  
  <input type="text" placeholder="username" className="form-control" onChange={(e)=> setUsername(e.target.value)}/>
  
</div>
<div className="input-group mb-3">
  
  <input type="text" placeholder="Password" className="form-control" onChange={(e)=> setPassword(e.target.value)}/>
  
</div>

<div className="input-group mb-3">
  
  <input type="text" placeholder="Confirm Password" className="form-control" onChange={(e)=> setCpassword(e.target.value)}/>
  
</div>
      <button onClick={handleSubmit} className='button-signup'>Submit</button>

    </div>
  )
}

export default Signup