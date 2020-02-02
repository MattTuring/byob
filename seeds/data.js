const regionsData = require('./../regions');
const stateData = require('./../states');

const createRegion = async (knex, region) => {
  const regionId = await knex('regions').insert({
    Region: region.region,
    1990: region['1990'],
    1995: region['1995'],
    1999: region['1999'],
    2000: region['2000'],
    2001: region['2001'],
    2002: region['2002'],
    2003: region['2003'],
    2004: region['2004'],
    2005: region['2005'],
    2006: region['2006'],
    2007: region['2007'],
    2008: region['2008'],
    2009: region['2009'],
    2010: region['2010'],
    2011: region['2011'],
    2012: region['2012'],
    2013: region['2013'],
    2014: region['2014'],
    2015: region['2015'],
    2016: region['2016']

  });
}
  const createState = async (knex, state) => {
    const stateId = await knex('states').insert({
      State: state.state,
      regions_id: state.census_region,
      1990: state['1990'],
      1995: state['1995'],
      1999: state['1999'],
      2000: state['2000'],
      2001: state['2001'],
      2002: state['2002'],
      2003: state['2003'],
      2004: state['2004'],
      2005: state['2005'],
      2006: state['2006'],
      2007: state['2007'],
      2008: state['2008'],
      2009: state['2009'],
      2010: state['2010'],
      2011: state['2011'],
      2012: state['2012'],
      2013: state['2013'],
      2014: state['2014'],
      2015: state['2015'],
      2016: state['2016']
    })
  };

// const createFootnote = (knex, footnote) => {
//   return knex('footnotes').insert(footnote);
// };

exports.seed = async (knex) => {
  try {
    await knex('states').del() // delete footnotes first
    await knex('states').del() // delete all papers

    let regionPromises = regionsData.map(region => {
      return createRegion(knex, region);
    });


    let statesPromises = stateData.map(state => {
      return createState(knex, state);
    });

    let all = [...statesPromises, ...regionPromises]

    return Promise.all(all);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
