
const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
        id : "p1",
        title : " State Building",
        description : "EmpireOne of the famous places in the world",
        location: {
            lat: 40.37454,
            lng: -73.242
        },
        address: "20 New york",
        creater: "u1"
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find( item => {
        return item.id === placeId
    });
    if(!place){
             throw  new HttpError('The place with this is not found ',404);

    }
    res.json({
        place : place
    })
}

const getPlaceByUserID = (req, res, next) => {
    const createrId = req.params.uid;
    const place = DUMMY_PLACES.find( item => {
        return item.creater === createrId
    });

    if(!place){
           return next(new HttpError('The place for the provided user id',404)); 
    }
    res.json({
        place : place
    })
};

const createPlace = (req, res, next)=>{
    const { title, description, coordinates , address, creater} = req.body;
    const createdPlace = {
        id : 'p'+ JSON.stringify(10^16 * Math.random()),
        uuid: uuid(),
        title,
        description,
        location :coordinates,
        address,
        creater
    }
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
};



exports.getPlaceById = getPlaceById;
exports.getPlaceByUserID = getPlaceByUserID;
exports.createPlace = createPlace;