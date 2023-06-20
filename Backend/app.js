import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

import {AddUserDetails, getUserDetails, AddCompanyDetails, getCompanyDetails, deleteCompany, AddItems, getItemDetails, updateStock} from './UserController.js'

const app= express()
app.use(express())
app.use(bodyParser.json())

app.use(cors())

app.post('/signup', AddUserDetails)

app.post('/login', getUserDetails)

app.post('/userinventory', AddCompanyDetails)

app.get('/userinventory', cors(), getCompanyDetails)

app.delete('/userinventory/:username/:companyName', deleteCompany)

app.post('/inventory', AddItems)

app.get('/inventory', cors(), getItemDetails) 

app.post('/updateStock', updateStock)

app.listen(4000, ()=> console.log('Listening to the port 4k...'))
