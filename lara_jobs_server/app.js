const express = require('express');
const { initDatabase } = require('./models');
const app = express();


const candidateRoutes = require('./routes/candidateRoutes');
const authRoutes = require('./routes/authRoutes')

const PORT = process.env.PORT || 3000;
app.use(express.json());


app.use('/api', candidateRoutes);
app.use('/api/auth', authRoutes);


initDatabase().then(async ()=>{
    app.listen(PORT, async ()=>{
        console.log("Server is running on PORT : ", PORT);  
    })

}).catch(error => {
    console.log("Failed to initialize Database : ", error);
})
