
const TeacherModel = require('../Models/Teacher')
const cloudinary = require('../Utils/Cloudinary')
const fs = require('fs');

class TeacherController {
   static createTeacher = async (req, res) => {
      try {
         console.log(req.body)
         const { name, email } = req.body;

         if (!name || !email || !req.files || !req.files.image) {
            return res.status(400).json({ message: 'Name,email and image are required' });
         }

         const file = req.files.image;

         const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "teachers",
         });

         // Remove temp file
         fs.unlinkSync(file.tempFilePath);

         const teacher = await TeacherModel.create({
            name,
            email,
            image: {
               public_id: result.public_id,
               url: result.secure_url,
            }

         })


         await teacher.save()

         res.status(201).json({ message: "Teacher created successfully", teacher });
      } catch (error) {
         console.log(error);

      }
   };

   static getAllTeachers = async (req, res) => {
      try {
         const teachers = await TeacherModel.find();
         res.status(200).json(teachers);
      } catch (error) {
         res.status(500).json({ message: "Server error", error });
      }
   };

   static getTeacherById = async (req, res) => {
      try {
         const teacher = await TeacherModel.findById(req.params.id);
         if (!teacher) return res.status(404).json({ message: "teacher not found" });
         res.status(200).json(teacher);
      } catch (error) {
         res.status(500).json({ message: "Server error", error });
      }
   };

   static updateTeacher = async (req, res) => {
      try {
         console.log(req.body)
         const { id } = req.params;
         const { name} = req.body;
         const { email} = req.body;
         const file = req.files?.image;

         const teacher = await TeacherModel.findById(id);
         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

         // If new image is uploaded, delete old one and upload new
         if (file) {
            // Delete old image
            await cloudinary.uploader.destroy(teacher.image.public_id);

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
               folder: 'teachers',
            });

            fs.unlinkSync(file.tempFilePath);

            teacher.image = {
               public_id: result.public_id,
               url: result.secure_url
            };
         }

         if (name) teacher.name = name;
          if (email) teacher.name = email;
         await teacher.save();

         res.status(200).json({ message: "teacher updated", teacher });
      } catch (error) {
         res.status(500).json({ message: "Server error", error });
      }
   };

    static deleteTeacher = async (req, res) => {
       try {
         const { id } = req.params;
         const teacher = await TeacherModel.findById(id);
         if (!teacher) return res.status(404).json({ message: "Teacher not found" });
   
         // Delete image from Cloudinary
         await cloudinary.uploader.destroy(teacher.image.public_id);
   
         await teacher.deleteOne();
   
         res.status(200).json({ message: "Teacher deleted" });
       } catch (error) {
         res.status(500).json({ message: "Server error", error });
       }
     };
 
}
module.exports = TeacherController