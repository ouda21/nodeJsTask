const Sequelize = require('sequelize');
const models = require('../models');
const paginate = require('express-paginate')
const fs = require('fs');
const { STATUS_CODES } = require('http');


async function addStudent(req,res,next)
{
    models.Student.create({
        full_name:req.body.full_name,
        admission_number: req.body.admission_number,
        email_address: req.body.email_address,
        dob: req.body.dob,
        phone: req.body.phone,
        course: req.body.course,
        gender: req.body.gender
    })
    .then((student)=>{
        res.status(201).json({
            message:'Student added successfully',
            student:student
        })
    })
    .catch((error)=>{
        res.status(500).json({
            error:error.message
        })
    })
    
}

async function getStudents(req,res,next){
    models.Student.findAndCountAll({limit:req.query.limit, offset:req.skip})
    .then(results=>{
        const itmCount = results.count;
        const pageCount = Math.ceil(results.count/req.query.limit);
        return res.status(200).json({
            students:results.rows,
            pageCount,
            itmCount,
            pages:paginate.getArrayPages(req)(3,pageCount,req.query.page)
        })
    })
    .catch(err=>next(err))
}

async function getSingleStudent(req,res,next){
    const my_id = req.params.student_id;

    models.Student.findOne({where:{id:my_id}})
    .then((student)=>{
        return res.status(200).json({
            staus:200,
            student:student
        })
    })
    .catch((error)=>{
        return res.status(500).json({
            error:error.message
        })
    })
}

async function updateStudentInformation(req,res){
    try {
        const my_id  = req.params.student_id;
        const [ updated ] = await models.Student.update(req.body, {
          where: { id: my_id }
        });
        if (updated) {
          const updatedStudent = await models.Student.findOne({ where: { id: my_id } });
          return res.status(200).json({ studentd: updatedStudent });
        }
        throw new Error('Student not found');
      } 
      catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteSingleStudent(req,res){
    try {
        const my_id = req.params.student_id;
        const deleted = await models.Student.destroy({
          where: { id: my_id }
        });
        if (deleted) {
          return res.status(204).send("Student deleted successfully");
        }
        throw new Error("Student not found");
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = 
{
    addStudent:addStudent,
    getStudents:getStudents,
    getSingleStudent:getSingleStudent,
    updateStudentInformation:updateStudentInformation,
    deleteSingleStudent:deleteSingleStudent
}