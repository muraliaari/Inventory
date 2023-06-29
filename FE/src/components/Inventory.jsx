import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux';
import  {updateBuyArray}  from '../slice';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';


const Inventory = () => {
  const dispatch = useDispatch();

  const [flag, setFlag] = useState(false);
  const [itemName, setItemname] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemsArray, setItemsArray] = useState([]);
  const [stockArray, setStockArray] = useState([]);
  const [flag2, setFlag2] = useState(false);
  const [buy, setBuy] = useState('')
  const [totalStockPrice, SetTotalStockPrice] = useState(0);
  const [buysellPrice, setBuySellPrice] = useState(0)

  const fetchData = async () => {
    try {
      const username = sessionStorage.getItem("username");
      console.log(stockArray)
      // console.log(username)
      const response = await axios.get(
        `http://localhost:4000/inventory?username=${username}`
      );
      const newData = response.data.data.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        stock: item.stock,
      }));
      setItemsArray(newData);
      // console.log(newData, 'newdata')
      const storedStockArray = localStorage.getItem("stockArray");
      if (storedStockArray) {
        setStockArray(JSON.parse(storedStockArray));
      } else {
        const initialStockArray = Array(newData.length).fill(0);
        setStockArray(initialStockArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("itemsArray", JSON.stringify(itemsArray));
  }, [itemsArray]);

  useEffect(() => {
    localStorage.setItem("stockArray", JSON.stringify(stockArray));
    let total = 0;
    itemsArray.forEach((ele) => {
      total = total + ele.itemPrice * ele.stock;
    });
    SetTotalStockPrice(total);
  }, [stockArray, itemsArray]);

  const handleAddItems = () => {
    setFlag(true);
  };

  const handleAdd = async () => {
    const username = sessionStorage.getItem("username");
    setFlag(false);
    if (itemName && itemPrice) {
      try {
        await axios.post("http://localhost:4000/inventory", {
          username,
          itemName,
          itemPrice,
        }).then((res) => {
          // console.log(res);
          if (res.data.message === "exists") {
            alert("Item already exists");
          } else {
            const array = res.data.data;
            const obj = {
              itemName: array[array.length - 1].itemName,
              itemPrice: array[array.length - 1].itemPrice,
              stock: 0,
            };
            itemsArray.push(obj);
            setItemsArray([...itemsArray]);
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Fields should not be empty");
    }

  };

  const handleAddStock = async (index) => {
    
    const itemToUpdate = itemsArray[index];
    const stockValue = stockArray[index];
    if(stockValue == "" || stockValue == null){
      alert("fields connot be empty")
      return;
    }
    const username = sessionStorage.getItem('username')

    try {
      await axios.post("http://localhost:4000/updateStock", {
        username,
        itemName: itemToUpdate.itemName,
        stock: stockValue,
      });
      
      const updatedItemsArray = itemsArray.map((item, idx) =>
        idx === index ? { ...item, stock: stockValue } : item
      );
      setItemsArray(updatedItemsArray);
      setFlag(false);
      setFlag2(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStockChange = (index, value) => {
    const newStockArray = [...stockArray];
    newStockArray[index] = value;
    setStockArray(newStockArray);
  };


  //Buy the stock
  const handleBuy=async(index)=>{
    const itemToUpdate = itemsArray[index];
  
    const stockValue = Number(itemsArray[index].stock) || 0
  
    const username = sessionStorage.getItem('username')
    const buyValue = Number(buysellPrice) || 0 
           // Push the buyArray value to Redux store

    if (isNaN(buyValue)) {
      alert("Buy value should be a valid number");
      return;
    }
    try {
      await axios.post("http://localhost:4000/updateStock", {
        username,
        itemName: itemToUpdate.itemName,  
        stock: stockValue + buyValue ,
      });
      
      const updatedItemsArray = itemsArray.map((item, idx) =>
        idx === index ? { ...item, stock: stockValue+buyValue } : item
      );
      setItemsArray(updatedItemsArray);
      setFlag(false);
      setFlag2(false);
      dispatch(updateBuyArray({itemName : itemsArray[index].itemName, itemPrice : itemsArray[index].itemPrice,  buyValue}));
      setBuy('')

    } catch (err) {
      console.log(err);
    }
  }

//Sell the stock
  const handleSell=async(index)=>{
    const itemToUpdate = itemsArray[index];
  
    const stockValue = Number(itemsArray[index].stock) || 0; // Treat  0
  
    const username = sessionStorage.getItem('username')
    const buyValue = Number(buysellPrice) || 0 ;

    if (isNaN(buyValue)) {
      alert("Buy value should be a valid number");
      return;
    }
    try {
      await axios.post("http://localhost:4000/updateStock", {
        username,
        itemName: itemToUpdate.itemName,  
        stock: (stockValue-buyValue) < 0 ? 0 : (stockValue - buyValue) ,
        
      });
      
      const updatedItemsArray = itemsArray.map((item, idx) =>
        idx === index ? { ...item, stock: (stockValue-buyValue) < 0 ? 0 : (stockValue - buyValue) } : item
      );
      setItemsArray(updatedItemsArray);
      setFlag(false);
      setFlag2(false);
      setBuy('')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <button className="button-17" onClick={handleAddItems}>
          Add Item
        </button>
        {flag ? (
          <>
            <input
              type="text"
              placeholder="item"
              onChange={(e) => setItemname(e.target.value)}
            />
            <input
              type="number"
              placeholder="price"
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <button onClick={handleAdd} className="button-68">Add</button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="stock">
        <h1>Stock: {totalStockPrice}</h1>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ Width: 600, backgroundColor: "#D7DDE8" }}>
            <TableHead sx={{ backgroundColor: "#4b6cb7" }}>
              <TableRow>
                <TableCell>Sl.no</TableCell>
                <TableCell align="right">Material</TableCell>
                <TableCell align="right">Current Stock</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Price/kg&nbsp;</TableCell>
                <TableCell align="right"><button onClick={()=>setBuy("buy")}>Buy</button> or <button onClick={()=>setBuy('sell')}>Sell</button></TableCell>
                <TableCell align="right">Total&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsArray.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="right">{row.itemName}</TableCell>
                  <TableCell align="right">
                    {flag2 === false ? (
                      <>
                        {itemsArray[i].stock}&nbsp;
                        <i
                          className="fa-sharp fa-solid fa-pen"
                          onClick={() => setFlag2(true)}
                        ></i>
                      </>
                    ) : (
                      <>
                        <input
                          type="number"
                          value={stockArray[i] || ""}
                          onChange={(e) =>
                            handleStockChange(i, e.target.value)
                          }
                          style={{ width: "100px" }}
                        />
                        <button onClick={() => handleAddStock(i)}>Add</button>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="right">kg</TableCell>
                  <TableCell align="right">{row.itemPrice}</TableCell>
                  <TableCell align="right">{
                    buy == 'buy' || buy == "sell" ? <><input type="number" style={{width :"80px"}} onChange={(e)=>setBuySellPrice(e.target.value)}></input></> : <></>
                  }
                  {
                    buy == 'buy' ? <><button onClick={()=>handleBuy(i)}>Buy</button></> : buy == "sell" ?  <><button onClick={()=>handleSell(i)}>Sell</button></> : <></>
                  }
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete">
                      {row.itemPrice * itemsArray[i].stock}
                    
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Inventory