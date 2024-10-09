const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const getAllCour = async (_req,res) => {
   try {

    const [rows]  = await pool.query('SELECT course_id, course_code, course_name, created_at,updated_at FROM courses');
    res.json(rows);

    } catch (err) {
        res.status(500).json({error: err.message});
    }

};

const getCourById = async (req,res) => {
    const {course_id} = req.params;
    try {
 
     const [rows]  = await pool.query('SELECT course_id, course_code, course_name, created_at,updated_at FROM courses WHERE course_id = ?', [course_id]);
     
     if (rows.length === 0) {
        return res.status(404).json ({error: 'Course not Found'});
     }
      res.json(rows[0]);
     } catch (err) {
         res.status(500).json({error: err.message});
     }
 
 };

 const createCour = async (req,res) => {
    const {course_code,course_name} = req.body;

    
    try {
     const [result]  = await pool.query('INSERT INTO courses (course_code,course_name) VALUES (?,?)',[course_code,course_name]);
     res.status(201).json({course_id: result.insertId,course_code,course_name});
     } catch (err) {
         res.status(500).json({error: err.message});
     }
 };

 const updateCour = async (req, res) => {
    const { course_id } = req.params;
    const { course_code, course_name} = req.body;
  
    try {
      const [result] = await pool.query('UPDATE courses SET course_code = ?, course_name = ? WHERE course_id = ?', [course_code, course_name, course_id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Course not found!' });
      }
      res.json({ message:  'Course updated successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error!' });
      console.error(err);
    }
  };
 const deleteCour = async (req,res) => {
    const {course_id} = req.params;
    
    try {
 
     const [result]  = await pool.query('DELETE FROM courses WHERE course_id = ?', [course_id]);
     
     if (result.affectedRows === 0) {
        return res.status(404).json ({error: 'Courses not Found!'});
     }

      res.json({message: 'Course Deleted Succesfully!' });
     } catch (err) {
         res.status(500).json({error: err.message});
     }
 

 };

 module.exports  = {getAllCour, getCourById, createCour, updateCour, deleteCour} 