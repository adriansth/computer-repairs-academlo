// Models
const { nextTick } = require('process');
const { Repair } = require('../models/repair.model');

const repairExists = async (req, res) => {
    try {
        const { status } = req.params;
        const repair = await Repair.findAll({ where: { status } });
        if (!repair) {
            return res.status(404).json({
                status: 'notice',
                message: 'No pending repairs available'
            });
        }
        // Add user data to the req object
        req.repair = repair;
        next();
    } catch (err) {
        console.log(err);
    };
};

module.exports = { repairExists };