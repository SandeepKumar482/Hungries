import {body,validationResult} from 'express-validator'
import {Request, Response,NextFunction}from 'express'

export const signUpValidationRules=()=>{
    return[
        body('name','Name is required').notEmpty(),
        body('email','email is required').notEmpty().isEmail().normalizeEmail(),
        body('auth_type','authType is required').notEmpty(),
        body('password','password is required(Min 5 characters)')
        .if(body('auth_type').equals('email'))
        .notEmpty()
        .isLength({min:5}),

    ]
}

export const signInValidationRules=()=>{
    return[
        body('name','Name is required').notEmpty()
        .if(body('auth_type').not().equals('email')),
        body('email','Invalid Email').notEmpty().isEmail().normalizeEmail(),
        body('auth_type','authType is required').notEmpty(),
        body('password','password is required(Min 5 characters)')
        .if(body('auth_type').equals('email'))
        .notEmpty()
        .isLength({min:5}),

    ]
}

export const validate=(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next
    }
    const extractedErrors: any=[]
    errors.array({onlyFirstError:true})
    .map((err)=>extractedErrors.push({[err.param]:err.msg}))
    return res.status(422).json({errors:extractedErrors})


}