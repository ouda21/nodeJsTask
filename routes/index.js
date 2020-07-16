const express = require('express');
const router = express.Router();

const controller = require('../controller/studentController');


router.post('/add-student',controller.addStudent);
router.get('/all-students',controller.getStudents);
router.get('/get-single-student/:student_id',controller.getSingleStudent);
router.put('/update-student/:student_id',controller.updateStudentInformation);
router.delete('/delete-student/:student_id',controller.deleteSingleStudent);

module.exports = router;