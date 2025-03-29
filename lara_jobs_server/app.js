const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./models');
const app = express();


const candidateRoutes = require('./routes/candidateRoutes');
const authRoutes = require('./routes/authRoutes')
const subjectRoutes = require('./routes/placementTest/subjectRoutes')
const topicRoutes = require('./routes/placementTest/topicRoutes')


const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors({
    origin: `http://localhost:5173`, 
}));

app.use('/api', candidateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/placement-test/subject', subjectRoutes);
app.use('/api/placement-test/topic', topicRoutes);


initDatabase().then(async ()=>{
    app.listen(PORT, async ()=>{
        console.log("Server is running on PORT : ", PORT);  
    })

}).catch(error => {
    console.log("Failed to initialize Database : ", error);
})
