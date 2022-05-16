const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');

// Utils 
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const protectToken = catchAsync(async (req, res, next) => {
    let token;
    // Extract token from headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // ['Bearer', 'token']
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Invalid Session', 403));
    }
    // Validate token
    const decoded = await jwt.verify(process.env.JWT_SECRET);
    // decoded returns -> { id: 1, iat: 1651713776, exp: 1651717376 }
    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' }
    });
    if (!user) {
        return next(new AppError('The owner of this token is not longer available', 403));
    }
    req.sessionUser = user;
    next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
    if (req.sessionUser.role !== 'admin') {
        return next(new AppError('Access not granted', 403));
    }
    next();
});

const userExists = async (req, res, next) => {
    try {
        const id = req.params;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found with given id'
            });
        };
        // Add user data to the req object
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
    };
};

const protectAccountOwner = catchAsync(async (req, res, next) => {
    // Get current session user and the user that is going to be updated
    const { sessionUser, user } = req;
    // Compare the id's 
    if (sessionUser.id !== user.id) {
        // If the id's aren't equal, return error
        return next(new AppError('You do not own this account', 403));
    }
    // If the id's are equal, the request passes
    next();
})

module.exports = { userExists, protectToken, protectAdmin, protectAccountOwner };