import  { useState } from 'react'
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
      await axios.post('https://muraliaari-user-inventory.netlify.app/signup', {
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
  <input type="text" placeholder="name" className="form" onChange={handleName} style={{width:"200px"}}/>
</div>
<div className="input-group mb-3">
  
  <input type="text" placeholder="username" className="form" onChange={(e)=> setUsername(e.target.value)} style={{width:"200px"}}/>
  
</div>
<div className="input-group mb-3">
  
  <input type="text" placeholder="Password" className="form" onChange={(e)=> setPassword(e.target.value)} style={{width:"200px"}}/>
  
</div>

<div className="input-group mb-3">
  
  <input type="text" placeholder="Confirm Password" className="form" onChange={(e)=> setCpassword(e.target.value)} style={{width:"200px"}}/>
  
</div>
      <button onClick={handleSubmit} className='button-signup'>Submit</button>

    </div>
  )
}

export default Signup