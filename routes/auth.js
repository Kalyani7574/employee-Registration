const router = require ('express').Router();
const UserModel = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
 


router.post('/register', async (req, res) => {

    const { error } = registerValidation (req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //checking email is already exist or not 
     const emailExist = await UserModel.findOne({ email: req.body.email });
     if (emailExist) return res.status(400).send('Email is already exist');

     //hash the password

     const salt= await bcrypt.genSaltSync(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

    
     //create new user
      const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword                             //req.body.password
 });
       
          try{
                const savedUser = await user.save();
                res.send(savedUser);
                console.log('user saved successsfully');
         } catch (err) {
               res.status(400).send(err);
                console.log('something went wrong');
           }
});



//login 

router.post('/login', async ( req, res) => {

    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //checking email is already exist or not 
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
     if (!validPassword) return res.status(400).send('Invalid Password')
     res.send('logged in')
});



module.exports = router;
