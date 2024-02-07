const Patient = require('../models/Patient.js');

exports.getAllPatients = async (req, res) => {
  let id = req.query.id
  console.log(id)
  try {
    const patients = await Patient.find({ UserID: id });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPatientById = async (req, res) => {

  try {
    const patients = await Patient.find({ _id: req.params.id });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPatient = async (req, res) => {

  try {
    const patient = new Patient(req.body);
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updatedPatientData = req.body;
    console.log(updatedPatientData)
    const updatedPatient = await Patient.updateOne(
      { _id: updatedPatientData._id },
      { $set: updatedPatientData }
    );

    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.deletePatient = async (req, res) => {
  let id = req.params.id;
  try {
    await Patient.deleteOne({ _id: id });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



