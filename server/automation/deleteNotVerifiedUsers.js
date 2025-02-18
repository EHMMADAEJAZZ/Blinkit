import cron from "node-cron";
import User from "../models/user.model.js";

async function deletedNotVerifiedUsers(){
  cron.schedule(' */30 * * * * ',async()=>{
       
   const thirtyMinAgo = new Date(Date.now()+30*60*1000);
   const users = await User.deleteMany({
    accountVerified:false,
    createdAt:{ $lt:thirtyMinAgo },
    
   })
    
    })

}

export default deletedNotVerifiedUsers