const express = require('express')
const app = express()
require('./db/mongoose')
const authRoute = require('./routes/auth');  
 


//middleware
app.use(express.json());
//routes middleware
app.use('/api/user', authRoute)

app.listen(8080, () => {
    console.log('Server is on port 8080')
})

