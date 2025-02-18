import { ApiErrors } from "../utils/apiErrors.js"

const restrictedTo =(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next (new ApiErrors(403,'not allowed to access this Page'));
        }
        next()
    }
}
export default restrictedTo