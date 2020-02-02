const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/api/v1/states', async (request, response) => {
  try {
    const states = await database('states').select();
    response.status(200).json(states);
  } catch(error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/states/:id', async (req, res) => {
  try {
    const state = await database('states').select().where('id', req.params.id);
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/api/v1/states', async (req, res) => {
  const region = req.body;

  // eslint-disable-next-line no-restricted-syntax
  for (const requiredParameter of ['State', 'regions_id']) {
    if (requiredParameter === 'regions_id' && region.regions_id !== 'South' && region.regions_id !== 'West' && region.regions_id !== 'Northeast' &&region.regions_id !=='Midwest') {
      return res
        .status(422)
        .json({ error: `regions_id is not valid` });
    }


    if (!region[requiredParameter]) {
      return res
        .status(422)
        .json({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property` });
    }
  }

  try {
    const id = await database('states').insert(region, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/v1/regions', async (request, response) => {
  try {
    const regions = await database('regions').select();
    response.status(200).json(regions);
  } catch(error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/regions/:id', async (req, res) => {
  try {
    const region = await database('regions').select().where('id', req.params.id);
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/api/v1/regions', async (req, res) => {
  const region = req.body;

  // eslint-disable-next-line no-restricted-syntax
  for (const requiredParameter of ['Region']) {
    if (!region[requiredParameter]) {
      return res
        .status(422)
        .json({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property` });
    }
  }

  try {
    const id = await database('regions').insert(region, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete('/api/v1/states/:id', async (req, res) => {
  try {
    await database('states').select().where('id', req.params.id).del();
    res.status(204).json('state has been deleted');
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.set('port', process.env.PORT || 7000);

app.listen(app.get('port'), () => {
  console.log('running');
})
