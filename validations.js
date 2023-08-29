import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    body('fullName', 'Incorrect full name').isLength({ min: 3 }),
    body('avatarUrl', 'Incorrect url').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Fill post title').isLength({ min: 3 }).isString(),
    body('text', 'Fill post text').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect format(create array!)').optional().isArray(),
    body('imageUrl', 'Incorrect url').optional().isString(),
]


