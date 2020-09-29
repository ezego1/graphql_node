import mongoose from 'mongoose'

const Schema = mongoose.Schema

const product = new Schema({
  name: {
    type: String,
    required: true,
  },
});


const employee = new Schema({
  name: {
    type: String,
    required: true,
  },
});



const companySchema = new Schema({
    organization: {
        type: String,
        trim: true,
        unique: true
    },
    products: [product],
    
    address: {
        type: String,
        required: true
    },
    marketValue: {
        type: String,
        required: true
    },
    ceo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    employees: [employee],
        
    
},  {timestamps: true})



const Company = mongoose.model('Company', companySchema)

export default Company