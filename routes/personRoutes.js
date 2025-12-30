const express = require('express');
const router = express.Router();
const  Person = require('./../models/person');

//post route to a person
router.post('/', async (req, res) => {

  try{
      const data = req.body //request body contain persons data

      const newPerson = new Person(data);

      const response = await  newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
  }
  catch (err){

      console.log(err);
      res.status.apply(500).json({error : 'Internal server error'})
  }
})

//GET method to get the person
router.get('/', async (req, res) =>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch (err){

    console.log(err);
    res.status.apply(500).json({error : 'Internal server error'})
  }
})

router.get('/:worktype', async(req, res) =>{
  try{
    const worktype = req.params.worktype;//extract the work type from URL parameter
    if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
       const response = await Person.find({work: worktype});
       console.log('response fetched');
       res.status(200).json(response);
    }
    else{
       res.status(404).json({error: 'Invalid work type'});
    }
  }
  catch(err){
    console.log(err);
    res.status.apply(500).json({error : 'Internal server error'})
  
  }
})

router.put('/:id',async (req,res)=>{
    try{
      const personID = req.params.id;//extract the id from URL parameter
      const updatedPersonData = req.body;//updated data for the person

      const response = await Person.findByIdAndUpdate(personID,updatedPersonData, {
         new: true, //returnthe updated document
         runValidaters: true, //run mongoose validation
      })

      if(!response) {
        return res.status(404).json({error: 'Person not found'});
      }
      
      console.log('data updated');
      res.status(200).json(response);

    }
    catch(err){
      console.log(err);
    res.status.apply(500).json({error : 'Internal server error'})
    }
})

module.exports = router;