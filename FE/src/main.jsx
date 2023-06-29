
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from './routes.jsx';
import  store  from './store'
import { Provider } from 'react-redux'



const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router} >
    <App/>
    </RouterProvider>
    </Provider>
  ,
)
