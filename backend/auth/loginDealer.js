import mongoose from 'mongoose';
import DealerModel from '../schema/dealerSchema.js';
import bcrypt from 'bcrypt';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const  secret = require('./config.json');
const jwt = require('jsonwebtoken');

//Link with mongodb server using mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  // console.log("mongoose connected addCycle");
}
/*
{
    email:
    password:
}
*/
async function loginDealer(req, res) {
  req = req.body;
  console.log("request for login");
  const data = await DealerModel.find({ email: req.email });
  if (data.length == 0) {
    return res.status(400).json({ 'msg': "email not registered" });
  }
  else {
    const pass = bcrypt.compareSync(req.password, data[0].password);
    if (pass == false) {
      return res.status(404).json({ 'msg': "email and password do not match" });
    }
    else {
      let token = jwt.sign({ DealerId: data[0].DealerId }, secret.secret, { expiresIn: 3600 });
      return res.status(200).json({ "auth": true, "msg": "Dealer logged in successfully", "token": token ,"DealerId":data[0].DealerId});
    }

  }

}
export default loginDealer;