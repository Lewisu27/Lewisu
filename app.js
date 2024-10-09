const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const deptRoute = require('./routes/deptRoute');
const courseRoute = require('./routes/courseRoute');
const studentRoute = require('./routes/studentRoute');

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/',function(req,res){
    res.send("Lewis Rey, BSCS");
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/dept', deptRoute);
app.use('/api/cour', courseRoute);
app.use('/api/student',studentRoute);


const PORT = 8001;
app.listen(PORT, ()=> {
    console.log('Server is running on port ${PORT}');
});