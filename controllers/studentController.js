const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');

const getAllStudent = async (_req,res) => {
   try {

    const [rows]  = await pool.query('SELECT student_id, last_name, first_name, created_at,updated_at FROM students');
    res.json(rows);

    } catch (err) {
        res.status(500).json({error: err.message});
    }

};

const getStudentById = async (req,res) => {
    const {student_id} = req.params;
    try {
 
     const [rows]  = await pool.query('SELECT student_id, first_name, last_name, created_at,updated_at FROM students WHERE student_id = ?', [student_id]);
     
     if (rows.length === 0) {
        return res.status(404).json ({error: 'Student not Found'});
     }
      res.json(rows[0]);
     } catch (err) {
         res.status(500).json({error: err.message});
     }
 
 };

 const createStudent = async (req,res) => {
    const {last_name,first_name} = req.body;

    
    try {
     const [result]  = await pool.query('INSERT INTO students (last_name,first_name) VALUES (?,?)',[last_name,first_name]);
     res.status(201).json({student_id: result.insertId,last_name,first_name});
     } catch (err) {
         res.status(500).json({error: err.message});
     }
 };

 const updateStudent = async (req, res) => {
    const { student_id } = req.params;
    const {last_name, first_name} = req.body;
  
    try {
      const [result] = await pool.query('UPDATE students SET last_name = ?, first_name = ? WHERE student_id = ?', [last_name, first_name, student_id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Student not found!' });
      }
      res.json({ message: 'Student updated successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error!' });
      console.error(err);
    }
  };
 const deleteStudent = async (req,res) => {
    const {student_id} = req.params;
    
    try {
 
     const [result]  = await pool.query('DELETE FROM students WHERE student_id = ?', [student_id]);
     
     if (result.affectedRows === 0) {
        return res.status(404).json ({error: 'Student not Found!'});
     }

      res.json({message: 'Student Deleted Succesfully!' });
     } catch (err) {
         res.status(500).json({error: err.message});
     }
 

 };

 module.exports  = {getAllStudent,getStudentById,createStudent,updateStudent,deleteStudent};