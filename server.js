// imports express
const express = require('express');
// imports cors
const cors = require('cors')
// sets app var to express
const app = express();

// app now uses json everywhere via this middle ware
app.use(express.json())
// uses cors
app.use(cors())

// sets enviroment
const environment = process.env.NODE_ENV || 'development';
// pulls db config
const configuration = require('./knexfile')[environment];
// connects to db listed in config
const database = require('knex')(configuration);

// creates get endpoint using async function
app.get('/api/v1/states', async (request, response) => {
  try {
    // goes to db of states and gets all
    const states = await database('states').select();
    // sends response of all states
    response.status(200).json(states);
  } catch(error) {
    // sends error
    response.status(500).json({ error });
  }
});

// create get endpoint with id param
app.get('/api/v1/states/:id', async (req, res) => {
  try {
    // gets single id from db
    const state = await database('states').select().where('id', req.params.id);
    // sends id assocaite dobject
    res.status(200).json(state);
  } catch (error) {
    // sends error
    res.status(500).json({ error });
  }
});

// create post
app.post('/api/v1/states', async (req, res) => {
  // req.body
  const region = req.body;

  // checks region is a real one using loop to check each required peice
  for (const requiredParameter of ['State', 'regions_id']) {
    if (requiredParameter === 'regions_id' && region.regions_id !== 'South' && region.regions_id !== 'West' && region.regions_id !== 'Northeast' &&region.regions_id !=='Midwest') {
      return res
        .status(422)
        .json({ error: `regions_id is not valid` });
    }

    // if the param is missing throw error
    if (!region[requiredParameter]) {
      return res
        .status(422)
        .json({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property` });
    }
  }

  try {
    // if no errors insert the object into db
    const id = await database('states').insert(region, 'id');
    // send response
    res.status(201).json({ id });
  } catch (error) {
    // send error
    res.status(500).json({ error });
  }
});

// get for all regions
app.get('/api/v1/regions', async (request, response) => {
  try {
    // goes to db and gets full region table
    const regions = await database('regions').select();
    response.status(200).json(regions);
  } catch(error) {
    // sends error
    response.status(500).json({ error });
  }
});

// get with id params for one objecy
app.get('/api/v1/regions/:id', async (req, res) => {
  try {
    // selects by id of object
    const region = await database('regions').select().where('id', req.params.id);
    //return object
    res.status(200).json(region);
  } catch (error) {
    //sends error
    res.status(500).json({ error });
  }
});

// create post for new region
app.post('/api/v1/regions', async (req, res) => {
  const region = req.body;

  // checks that there is a region
  for (const requiredParameter of ['Region']) {
    if (!region[requiredParameter]) {
      return res
        .status(422)
        .json({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property` });
    }
  }

  try {
    // if no error inserts region
    const id = await database('regions').insert(region, 'id');
    // returns region
    res.status(201).json({ id });
  } catch (error) {
    // returns error
    res.status(500).json({ error });
  }
});
// delete
app.delete('/api/v1/states/:id', async (req, res) => {
  try {
    // goes to db with id and deletes object
    await database('states').select().where('id', req.params.id).del();
    //sends response
    res.status(204).json('state has been deleted');
  } catch (error) {
    //sends error
    res.status(500).json({ error });
  }
});

// sets port
app.set('port', process.env.PORT || 7000);
// makes node proccess run
app.listen(app.get('port'), () => {
  console.log('running');
})
