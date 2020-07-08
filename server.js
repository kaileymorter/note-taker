const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./Develop/routes/apiRoutes')
const htmlRoutes = require('./Develop/routes/htmlRoutes') 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('Develop/public'));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});