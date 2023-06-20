import App from "./App"
import BuyDetails from "./components/BuyDetails"
import Inventory from "./components/Inventory"
import Login from "./components/Login"
import Signup from "./components/Signup"
import UserInventry from "./components/USerInventry"

const routes = [
    {
      path: "/",
      element: 
          <App/>,

      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "userinventory",
            element: <UserInventry/>,
          },
          {
            path: "inventory",
            element: <Inventory/>,
          },
          {
            path: "buydetails",
            element: <BuyDetails/>,
          }
    ]
    },
    
  ]

  export default routes