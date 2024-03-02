
const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
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
    const placelist = DUMMY_PLACES.filter( item =>  item.creater === createrId
    );

    if(!placelist){
           return next(new HttpError('The place for the provided user id',404)); 
    }
    res.json({
        placelist : placelist
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



const updatePlace = (req, res, next)=>{
    const { title, description} = req.body;
    const placeId = req.params.pid;
    const updatedPlace = { ...DUMMY_PLACES.find( p => p.id === placeId)};
    const placeIndex =  DUMMY_PLACES.findIndex( p => p.id === placeId) ;
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req,res,next) => {
    const placeId = req.params.pid;
    const findThePlace = DUMMY_PLACES.find(p => p.id === placeId);
    if ( findThePlace  !== undefined){
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
   
    res.status(200).json({message2: "deleted successfully..."});
    }
    else {
        res.status(404).json({error:"the place is not found !!!...."})
    }
}
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserID = getPlaceByUserID;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;