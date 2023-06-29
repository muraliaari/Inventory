import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import sgMail from '@sendgrid/mail';
import axios from 'axios'
// import dotenv from 'dotenv'

// dotenv.config()

// eslint-disable-next-line no-undef
// const apiKey = process.env.REACT_APP_SENDGRID_API_KEY;


const BuyDetails = () => {
  
  const buyArray = useSelector((state) => state.buyArray);
  const [detailsArray, setDetailsArray] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  
  useEffect(()=>{
    sgMail.setApiKey('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');
  },[])
  

  useEffect(() => {

    setDetailsArray([...buyArray]);

    let total = 0;
    buyArray.forEach((item) => {
      total += item.itemPrice * item.buyValue;
    });
    setSubtotal(total);
  }, [buyArray]);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const generateHTMLTemplate = (detailsArray, subtotal) => {
    return `
      <h1>Bill Details</h1>
      <table>
        <thead>
          <tr>
            <th>Desc</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          ${detailsArray
            .map(
              (row) => `
                <tr>
                  <td>${row.itemName}</td>
                  <td>${row.buyValue}</td>
                  <td>₹${row.itemPrice}</td>
                  <td>₹${row.itemPrice * row.buyValue}</td>
                </tr>
              `
            )
            .join('')}
          <tr>
            <td colspan="3">Total</td>
            <td>₹${subtotal}</td>
          </tr>
        </tbody>
      </table>
      <h2>This is computer generated mail</h2>
    `;
  };
  

  const onSubmit = async (data) => {
  console.log(data);
  setOverlayVisible(!overlayVisible);

  const htmlTemplate = generateHTMLTemplate(detailsArray, subtotal);

  axios
    .post('http://localhost:4000/send-email', {
      to: data.email,
      from: 'kunashaari@gmail.com',
      subject: 'Bill Details',
      html: htmlTemplate,
    })
    .then((res) => {
      console.log(res);
    });
};

  

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
        <button onClick={toggleOverlay} className='button1'>Pay</button>
        {overlayVisible && (
          <div className="overlay">
            <div className="center-container">
              <div className="payment-container">
                <h2>Payment Details</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      placeholder="Enter card number"
                      {...register('cardNumber', { required: 'Card number is required' })}
                    />
                    {errors.cardNumber && <span>{errors.cardNumber.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry-date"
                      placeholder="MM/YY"
                      {...register('expiryDate', { required: 'Expiry date is required' })}
                    />
                    {errors.expiryDate && <span>{errors.expiryDate.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Enter Email id"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Payable Amount</label>
                    <input
                      type="text"
                      id="name"
                      placeholder={subtotal}
                      value={subtotal}
                      {...register('amount', { required: 'Amount is required' })}
                    />
                    {errors.amount && <span>{errors.amount.message}</span>}
                  </div>
                  <button type="submit" className="button">Pay Now</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyDetails;
