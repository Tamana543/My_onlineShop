module.exports = (req,res,next)=>{
     console.log("Here",req.session);
     if(!req.session.isLoggedin){
      return res.redirect('/login')
     }
     next()
}

module.exports = (req,res,next)=>{
     if(!req.user){
          return res.redirect('/login')
     }
     next()
}