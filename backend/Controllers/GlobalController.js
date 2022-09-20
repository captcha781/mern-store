exports.getAuthStatus = (req,res) => {
    if(req.session.user){
        return res.json({auth:true, user:req.session.user})
    }
    return res.json({auth:false, user:null})
}