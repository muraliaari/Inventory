import {UserModel, CompanyModel, ItemModel} from "./UserModels.js";
import bcrypt from 'bcryptjs';
import axios from 'axios'
import dotenv from 'dotenv';


const AddUserDetails = async (req, res)=>{
    const {name, username, password, cpassword} = req.body
    // console.log(name, username, password, cpassword)
    // console.log(req.body)

   if(password === cpassword){
    try{
        const users = await UserModel.findOne({username : username})
        if(!users){
            const Users = await UserModel({name,username, password, cpassword})
            await Users.save()
            res.status(200).json({"message" : "success"})
            // console.log("insetion done")
        }
    } catch(err){
        console.log(err)
        res.status(401).json({"message"  : "Internal Server error"})
    }
   }
   else{
    res.json({
        "message" : "password doesnt match"
    })
   }
}

const getUserDetails =async(req, res)=>{
    try{
        const {username, password} = req.body
        // console.log(username, password, 'from')
        const User = await UserModel.findOne({username : username});
        if(User){
        if(bcrypt.compareSync(password, User.password)){ //comparing

            res.status(200).json({"message" : "Success", "name" : User.name, "username" : User.username})
        }
        else{
            res.status(401).json({"message" : "Internal Server error"})
        }}
        else{
            res.json({"message" : "No data"})
        }
    } catch(err){
        console.log(err)
    }
}

const AddCompanyDetails= async(req, res)=>{
    try{
        const {username, company,category, date} = req.body
        // console.log(company, date, username, category)
        const UserCompany = await CompanyModel.findOne({username : username, company : company})
        // console.log(UserCompany)
        if(UserCompany){//check if data exists
        if(UserCompany.company === company) // hard check
        res.status(200).json({"message" : "exists"}) 
        }
        else{
         const UsersCompany = await CompanyModel.insertMany([{username, company, category, date}])
         const Users = await CompanyModel.find({})
        //  console.log(UsersCompany)
        // await UsersCompany.save()
        res.status(200).json({"message" : "success", data : Users})
        }
    } catch(err){
        console.log(err)
        res.status(500  ).json({"message" : "failed"})
    }
}


//get
const getCompanyDetails =async(req, res)=>{
    try{
        const {username} = req.query;
        // console.log(username)
        const userInventory = await CompanyModel.find({ username }, 'username company category date');
        res.status(200).json({ data: userInventory });
        // console.log(userInventory)
        
    } catch(err){
        console.log(err)
        res.status(500).json({ message: 'Failed to fetch user inventory data' })
    }
}

const deleteCompany=async(req, res)=>{
    try{
        const username = req.params.username;
        const companyName = req.params.companyName;
        // console.log(companyName)
        await CompanyModel.findOneAndDelete({ username, company: companyName });
        res.sendStatus(204); // Sending 204 No Content status code on successful deletion
        // console.log('Deleted')

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete the company" });
      }
}

const AddItems= async(req, res)=>{
    try{
        const {username, itemName, itemPrice} = req.body
        // console.log(username, itemName, itemPrice)

        const findItem = await ItemModel.findOne({username  : username, itemName : itemName})
        if(findItem){
            res.status(201).json({"message" : "exists"})
        }
        else{
            const FindItem = await ItemModel.insertMany({username, itemName, itemPrice})
            // console.log("item inserted")
            res.status(200).json({"message" : "data added", data : FindItem})
        }
    } catch(err){
        console.log(err)
        res.status(500).json({"message" : "Internal server error"})
    }
} 

const getItemDetails= async(req, res)=>{
    try{
        const {username} = req.query;
    // console.log(username)
    const userItems = await ItemModel.find({ username }, 'username itemName itemPrice stock');
    res.status(200).json({ data: userItems });
    // console.log(userItems)

    } catch(err){
        console.log(err)
        res.status(500).json("Internal error")
    }
}

const updateStock = async(req, res)=>{
    let { username,itemName, stock, buysellPrice } = req.body;
    // console.log(username, stock, itemName, buysellPrice)
    // console.log(typeof(stock))
    // stock = Number(stock) + Number(buysellPrice)
    // console.log(stock)

    try {
      const updatedItem = await ItemModel.findOneAndUpdate(
        { username: username, itemName: itemName },
        { $set: { stock: stock } },
        { new: true }
      );
    //   console.log('updated')
    //   console.log(updatedItem)
  
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.json({ message: "Stock updated successfully", item: updatedItem });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
}

const sendEmail = async(req, res)=>{
    try {
        const { to, from, subject, html } = req.body;
        // console.log(to, from, subject, html)
        const sendGridApiKey = process.env.sendGridApiKey;

        const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
          personalizations: [
            {
              to: [{ email: to }],
              subject: subject,
            },
          ],
          from: { email: from },
          content: [{ type: 'text/html', value: html }],
        }, {
          headers: {
            'Authorization': `Bearer ${sendGridApiKey}`, // Replace with your SendGrid API key
            'Content-Type': 'application/json',
          },
        });
    
        res.status(response.status).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(error.response.status).json({ message: 'Failed to send email' });
      }
}
export { AddUserDetails, getUserDetails, AddCompanyDetails, sendEmail, getCompanyDetails, deleteCompany, AddItems, getItemDetails, updateStock}