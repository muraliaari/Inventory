import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';



const BuyDetails = () => {
    const buyArray = useSelector((state) => state.buyArray);
    const [detailsArray, setDetailsArray] = useState([])
    const [subtotal, setSubtotal] = useState(0);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const toggleOverlay = () => {
      setOverlayVisible(!overlayVisible);
    }

    useEffect(()=>{
      setDetailsArray([...buyArray])
      let total = 0;
    buyArray.forEach((item) => {
      total += item.itemPrice * item.buyValue;
    });
    setSubtotal(total);
    }, [])
    console.log(buyArray)

    

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Bill Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detailsArray.map((row) => (
            <TableRow key={row.itemName}>
              <TableCell>{row.itemName}</TableCell>
              <TableCell align="right">{row.buyValue}</TableCell>
              <TableCell align="right">₹{row.itemPrice}</TableCell>
              <TableCell align="right">₹{row.itemPrice * row.buyValue}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">₹{subtotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      <button onClick={toggleOverlay}>pay</button>
      {overlayVisible && (
        <div className="overlay">
          <div className='center-container'>
      <div className="payment-container">
       <h2>Payment Details</h2>
         <form>
          <div className="form-group">
           <label htmlFor="card-number">Card Number</label>
           <input type="text" id="card-number" placeholder="Enter card number" required/>
           </div>
            <div className="form-group">
              <label htmlFor="expiry-date">Expiry Date</label>
               <input type="text" id="expiry-date" placeholder="MM/YY" required/>
           </div>
         <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="Enter CVV" required/>
         </div>
         <div className="form-group">
           <label htmlFor="name">Payable Amount</label>
           <input type="text" id="name" placeholder={subtotal} value={subtotal} required/>
        </div>
         <button type="submit" className='button' onClick={()=>setOverlayVisible(!overlayVisible)}>Pay Now</button>
         </form>
        </div>

              </div>
        </div>
      )}
      
    </div>
    <div>
    </div>
    </div>
    
  )
}

export default BuyDetails