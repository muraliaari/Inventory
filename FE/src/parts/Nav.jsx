import { useEffect, useState, Fragment } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


const Nav = () => {
  const [state, setState] = useState({
    top: false,
    Menu: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
          <ListItem disablePadding>
            <ListItemButton onClick={()=> navigate('/userinventory')}>
              <ListItemIcon >
                <AddBusinessIcon/>
              </ListItemIcon>
              
              <ListItemText primary="Buyers and Suppliers"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=> navigate('/inventory')}>
              <ListItemIcon >
                <StorefrontIcon/>
              </ListItemIcon>
              
              <ListItemText primary="Inventory"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=> navigate('/buydetails')}>
              <ListItemIcon >
                <StorefrontIcon/>
              </ListItemIcon>
              
              <ListItemText primary="Buy Details"/>
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
      
    </Box>
  );


  const location = useLocation();
  const navigate = useNavigate()
  const [name, setName] = useState('')

  useEffect(() => {
    const storedName = sessionStorage.getItem('name')
    setName(storedName ? storedName : null);
  }, [location])
  
  
  const handleLogout = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem('itemsarray')
    localStorage.removeItem('stockArray')
    sessionStorage.removeItem('itemsArray')
    sessionStorage.removeItem('username')
    
    setName(null);
    navigate("/login");
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg border-bottom bg-primary" >
  <div className="container-fluid" style={{marginLeft:"400px"}}>
  <input className="form-control me" type="search" placeholder="Search" aria-label="Search" style={{width:"300px"}}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
    
    <i className="fa-solid fa-user-large fa-lg" style={{marginTop:"5px", paddingInline:"20px"}}>{name}</i> &nbsp;
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {
          name==null ? <><li className="nav-item">
          <a className="nav-link active" aria-current="page" href="login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="signup">Signup</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          
          
        </li></> : <>
        
        
        {['Menu'].map((anchor) => (
        <Fragment key={anchor}>
          <i className="fa-solid fa-bars" style={{marginTop:"20px", marginLeft:"50px"}}></i>
          <Button style={{color:"black", marginLeft:"-10px", paddingInline:"15px"}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
      
     <a className="nav-link active navbar" aria-current="page" onClick={handleLogout} style={{paddingInline:"20px", marginLeft:"100px"}}> <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</a>
        </>
        }
      </ul>
      <form className="d-flex" role="search"> 

      </form>
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Nav