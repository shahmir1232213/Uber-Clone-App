const axios = require('axios');
const captainModel = require('../models/captinModel');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GO_MAP_PRO_SECRETKEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
   console.log("url: ",url)
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            //console.log("response.data: ",response.data)
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GO_MAP_PRO_SECRETKEY;

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input)=>{
    if(!input){
        throw new Error('input required')
    }
    const apiKey = process.env.GO_MAP_PRO_SECRETKEY;
    console.log("API KEY: ",apiKey)
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await  axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

module.exports.getCaptinInTheRadius = async (ltd,lng,radius) => {
    let captins = await captainModel.find({
        location:{
            $geoWithin: {
                $centerSphere:[[ltd,lng],radius/6371]
            }
        }
    })

    return captins;
}

// module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

//     // radius in km


//     const captains = await captainModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [ [ ltd, lng ], radius / 6371 ]
//             }
//         }
//     });

//     return captains;


// }