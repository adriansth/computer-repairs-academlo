const express = require('express');

const {
  createRepair,
  repairCompleted,
  repairCancelled,
  getPendingRepairs,
  getPendingRepairById
} = require('../controllers/repair.controller');
const { protectAdmin } = require('../middlewares/users.middlewares');

const router = express.Router();

router
  .route('/')
  .get('/', getPendingRepairs, protectAdmin)
  .post('/', createRepair);

router
  .route('/:id')
  .get('/:id', getPendingRepairById, protectAdmin)
  .patch('/:id', repairCompleted, protectAdmin)
  .delete('/:id', repairCancelled, protectAdmin);

module.exports = { repairRouter: router };
