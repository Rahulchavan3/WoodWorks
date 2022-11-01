
const {User, validate} = require('../models/user')
const express = require('express')
const router = express.Router();
router.use(express.json())

router.post('/', async (req,res)=>{
    const result = validate(req.body)

    let user = await User.findOne({email: req.body.email})
    if(user) {
        return res.send('email already registered')
    }

    if(result.error){
        return res.send(result.error.details[0].message)
    }

    user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        isAdmin:false
    })

    await user.save()

    const token = user.generateAuth()
    res.header('x-auth-token',token).send(token)
})

router.get('/',(req,res)=>{
    res.send('User')
})

module.exports = router