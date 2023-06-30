import { useState, useEffect } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


let category = ""

const USerInventry = () => {
  const [flag, setFlag] = useState(false)
  const [company, setComany] = useState('')
  const [itemsarray, setitems] = useState([])
  const [option, SetOption] = useState(0)


  const fetchData = async () => {
    try {
      const username = sessionStorage.getItem('username'); 
      console.log(username)
      const response = await axios.get(`https://inventory-q0g5.onrender.com/userinventory?username=${username}`);
      console.log(response.data.data);
  
      // Extract only the username and company fields from the response data
      const newData = response.data.data.map(item => ({
        
        company: item.company,
        category : item.category,
        date: item.date
      }));
  
      // Update the state with the extracted data
      setitems(newData);
    } catch (err) {
      console.log(err);
    }
  };
//after the refresh the whole data of the user gets updated in the itemsarray so that there is no change in it
  useEffect(() => {
      fetchData()
    
    const storedItemsArray = sessionStorage.getItem('itemsarray');
    if (storedItemsArray) {
      setitems(JSON.parse(storedItemsArray));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('itemsarray', JSON.stringify(itemsarray));
  }, [itemsarray]);

  const handleCompany=()=>{
    setFlag(true)
  }
 
  const handleSubmit = async ()=>{
    setFlag(false)
    let newDate = new Date()
    let date = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    category = option == 1 ? "Buyer" : "Seller"
    // console.log(date)
  const username = sessionStorage.getItem('username')
    // console.log(company)
    
    console.log(sessionStorage.getItem('name'),  username)
    if(company){
      try{
        await axios.post("https://inventory-q0g5.onrender.com/userinventory",{
          username,
          company,
          category,
          date

        }).then((res)=>{
          if(res.data.message=="exists")
          alert("Company already exits") //checking id data exits from res and displaying altert
          else{
          console.log(res.data.data)
          
          const array = res.data.data
          const obj = { 
           company : array[array.length-1].company,
          date : array[array.length-1].date,
          category : array[array.length-1].category
          }
          itemsarray.push(obj)
          setitems([...itemsarray]) //adding the last element to the aray
          
          console.log(obj)
          console.log('aerray',itemsarray)
        }
          
        })
    } catch(err){
      console.log(err)
    }
    setComany("")
    }
    else{
      alert("Fields should not be empty")
    }
  }

  const handleDeleteItem = async (index) => {
    try {
      const username = sessionStorage.getItem('username');
      const companyName = itemsarray[index].company;

      await axios.delete(`https://inventory-q0g5.onrender.com/userinventory/${username}/${companyName}`);
      const updatedItemsArray = [...itemsarray];
      updatedItemsArray.splice(index, 1);
      setitems(updatedItemsArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div style={{display:"inline-flex", padding:"5px", marginLeft:"300px"}}>
      <button className="button-4" onClick={handleCompany} style={{width:"200px"}}>Add Company</button> &nbsp; &nbsp;

{
  flag ? <><input type="text"  className="form-control" placeholder="Company Name" onChange={(e)=>setComany(e.target.value)} style={{paddingInline:"20px"}}/>&nbsp; &nbsp;
  <select className="form-select" style={{width:"200px"}} onChange={(e)=>SetOption(e.target.value)}>
<option selected>Options</option>
<option value="1">Buyer</option>
<option value="2">Seller</option>

</select> &nbsp; &nbsp;
  <button className="btn btn-outline-primary btn-sm" style={{paddingInline:"20px"}} onClick={handleSubmit}>Add</button>
  
  </> : <></>
}
      </div>
      
      <div>
      <TableContainer component={Paper}>
      <Table sx={{ Width: 600, backgroundColor:"#D7DDE8" }}>
        <TableHead sx={{ backgroundColor:"#4b6cb7"}}>
          <TableRow >
            <TableCell>Sl.no</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Added On&nbsp;(D/M/YYYY)</TableCell>
            <TableCell align="right">Type&nbsp;</TableCell>
            <TableCell align="right">Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {itemsarray.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right"><IconButton aria-label="delete">
        <DeleteIcon onClick={()=>handleDeleteItem(i)}/>
      </IconButton>
      </TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
      </div>  
    </div>
  )
}

export default USerInventry