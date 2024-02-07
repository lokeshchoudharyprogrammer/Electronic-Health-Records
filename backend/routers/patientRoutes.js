const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
console.log(authMiddleware.authenticateToken)
router.get('/', patientController.getAllPatients);
router.get('/:id', authMiddleware.authenticateToken, patientController.getPatientById);
router.post('/', patientController.createPatient);
router.put('/:id',  patientController.updatePatient);
router.delete('/:id',  patientController.deletePatient);

module.exports = router;
