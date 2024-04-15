const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_USERS = [
    {
        id : "u1",
        name : "Murhaf",
        email : "Thefirst@user.com",
        password : "abc1234",
        placesCount: "2"
    },{
        id : "u2",
        name : "Salem",
        email : "Thesecond@user.com",
        password : "abc1234",
        placesCount: "1"
    },

];


const getListOfUsers = (req, res, next) => {
    const userList = {...DUMMY_USERS};
    if(!userList){
           return next(new HttpError('The user for the provided user id',404)); 
    }
    res.json({
        userList : userList
    })
};

const signup = (req, res, next) => {
    const { name, email, password, placesCount} = req.body;
    const createduser = {
        id : 'u'+ JSON.stringify(10^16 * Math.random()),
        uuid: uuid(),
        name,
        email,
        password,
        placesCount
    }
    DUMMY_USERS.push(createduser);

    res.status(201).json({user: createduser});
}

const login = (req, res, next) => {
    const {  email, password} = req.body;
const findUser = DUMMY_USERS.find(u => u.email === email && u.password === password);
if(!findUser){
    return next(new HttpError('The email or/and password is not correct or not matched ... ',404)); 
} else 
res.status(201).json({  login : "successful",  user : findUser})    ;
}

const deleteUser = (req, res, next) => {
}


exports.getListOfUsers = getListOfUsers;

exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
