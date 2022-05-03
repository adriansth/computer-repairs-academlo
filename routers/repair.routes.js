const express = require('express');

const { getAllRepairs, getRepairById, createRepair, repairCompleted, repairCancelled } = require('../controllers/repair.controller');

const router = express.Router();

router.get('/', getAllRepairs);

router.post('/', createRepair);

router.get('/:id', getRepairById);

router.patch('/:id', repairCompleted);

router.delete('/:id', repairCancelled);

module.exports = { repairRouter: router };