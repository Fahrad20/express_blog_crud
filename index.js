import express from 'express'
import multer from 'multer'
import mongoose from "mongoose";
import { registerValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js';
import { loginValidation, postCreateValidation } from './validations.js';
import { create, getAll, getOne, remove, update } from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect('mongodb+srv://fahradlevonyan:alfa1973@cluster0.f0np7av.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok!'))
    .catch(() => console.log('DB error!'))

const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.get('/', (_, res) => res.send('hello world!'))
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, create)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, update)

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server ok!')
})