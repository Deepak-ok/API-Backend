const express=require('express')
const productController = require('../Controllers/ProductController')
const TeacherController = require('../Controllers/TeacherController')
const UserController = require('../Controllers/UserController')
const route=express.Router()
const auth=require('../Middleware/Auth')

//product controller
route.post('/createProduct',productController.createProduct)
route.get('/getAllProducts',productController.getAllProducts)
route.get('/viewProduct/:id',productController.getProductById)
route.post('/updateProduct/:id',productController.updateProduct)
route.get('/deleteProduct/:id',productController.deleteProduct)


//teacher controller
route.post('/createTeacher',TeacherController.createTeacher)
route.get('/getAllTeachers',TeacherController.getAllTeachers)
route.get('/viewTeacher/:id',TeacherController.getTeacherById)
route.put('/updateTeacher/:id',TeacherController.updateTeacher)
route.get('/deleteTeacher/:id',TeacherController.deleteTeacher)

// // user controller
// route.post('/register',auth,UserController.register)
route.post('/register',UserController.register)
route.post('/login',UserController.login)
route.post('/logout',UserController.logout)
route.get('/profile',auth,UserController.getProfile)


module.exports=route