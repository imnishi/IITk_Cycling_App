import mongoose from 'mongoose';
import dealerModel from '../schema/dealerSchema.js';


//Link with mongodb server using mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  // console.log("mongoose connected addCycle");
}
/*req will be of form
 {
    dealerId :
    cycleStoreId :
    cycleId
    newRate:
 } 
 Example:
 {
    "dealerId":"507f191e810c19729de860ea",
    "cycleStoreId":"6232b7cc67d359b1050da700",
    "cycleId": "6232bf24e0ac1fc02a58e73c",
    "newRate" : 150
  }
 
*/
async function changeRate(req, res) {
  const data = req.body;
  console.log("request to rate update");
  await dealerModel.updateOne({ dealerId: data.dealerId }, { "cycleStore.$[elem].cycles.$[elem2].rate": data.newRate },{arrayFilters:[{"elem.cycleStoreId":data.cycleStoreId},{"elem2.cycleId":data.cycleId}]});
  res.status(200).json({ 'msg': 'rate updated successfully' });
}
export default changeRate;
//tested