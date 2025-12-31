const express =  require( 'express')

const app = express();
const db = require('./db');
const MenuItem = require('./models/MenuItem');





const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',  (req, res) => {
  res.send('Hello World')
})



app.post('/menu', async (req, res) => {

  try{
      const data = req.body //request body contain persons data

      const newMenu = new MenuItem (data);

      const response = await  newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
  }
  catch (err){

      console.log(err);
      res.status.apply(500).json({error : 'Internal server error'})
  }
})


//to get menu data
app.get('/menu', async (req, res) =>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch (err){

    console.log(err);
    res.status.apply(500).json({error : 'Internal server error'})
  }
})
//import the router files
const personRoutes = require('./routes/personRoutes');

//use the routers
app.use('/person',personRoutes);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})