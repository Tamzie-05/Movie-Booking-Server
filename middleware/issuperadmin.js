

function isSuperAdmin(req,res,next){
    if (req.user.role !== "superadmin"){
        return res.status(403).json({message:"Only SuperAdmins can perform this actions"});
    }
    next()
}
module.exports=isSuperAdmin;