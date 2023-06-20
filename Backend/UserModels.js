import bcrypt from 'bcryptjs';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Retrieve environment variables
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

// Connect to MongoDB database using environment variables
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

const userschema = new mongoose.Schema({
    name:{
        type:String,
    },
    username : {
        type:String
    },
    password:{
        type:String
    },
    cpassword : {
      type:String
    }
})


//hashing the password

userschema.pre('save', async function(next){
  console.log('HI')
  try{
    const salt = await bcrypt.genSalt(10);
    const Hashedpassword = await bcrypt.hash(this.password, salt)
    const HashedCpass = await bcrypt.hash(this.cpassword, salt)
    this.password = Hashedpassword
    this.cpassword  = HashedCpass
    next();
    // console.log(this.password)

  } catch(err){
    console.log(err)
  }
})

const UserModel = new mongoose.model('UserDetails2', userschema)

const CompanySchema = new mongoose.Schema({
  username:{
    type: String
  },
  company:{
    type:String
  },
  category:{
    type :String
  },
  date :{
    type:String
  }
})

const CompanyModel = new mongoose.model('companydetails', CompanySchema)


const ItemSchema = new mongoose.Schema({
  username:{
    type:String
  },
  itemName:{
    type:String
  },
  itemPrice : {
    type:Number
  },
  stock:{
    type: Number
  }
})

const ItemModel = new mongoose.model('itemDetails', ItemSchema)

export { UserModel, CompanyModel, ItemModel}