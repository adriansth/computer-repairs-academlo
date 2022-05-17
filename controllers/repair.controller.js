const { Repair } = require('../models/repair.model');

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll();
    res.status(200).json({
      repairs
    });
  } catch (err) {
    console.log(err);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No repair found with given id'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getPendingRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({ where: { status: 'pending' } });
    res.status(200).json({
      repairs
    });
  } catch (err) {
    console.log(err);
  }
};

const getPendingRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No repair found with given id'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createRepair = async (req, res) => {
  try {
    const { userId, date } = req.body;
    const newRepair = await Repair.create({ userId, date });
    res.status(201).json({
      newRepair
    });
  } catch (err) {
    console.log(err);
  }
};

const repairCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id, status: 'pending' } });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No repair found with given id'
      });
    }
    await repair.update({ status: 'completed' });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
};

const repairCancelled = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id, status: 'pending' } });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No repair found with given id'
      });
    }
    await repair.update({ status: 'cancelled' });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllRepairs,
  getRepairById,
  createRepair,
  repairCompleted,
  repairCancelled,
  getPendingRepairs,
  getPendingRepairById
};
