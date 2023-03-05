import * as express from 'express';
import IAuthRepositry from '../domain/IAuthRepository';
import ITokenService from '../service/ITokenServicees';
import IPasswordService from '../service/IPasswordService';
import AuthController from './AuthController';
import SignInUsecase from '../usecase/Signincase';
import SignUpUseCase from '../usecase/signUpUseCase';
import { signInValidationRules, signUpValidationRules, validate } from '../helper/validator';
import SignOutUseCase from '../usecase/Signoutcase';
import ITokenStore from '../service/ITokenStore';
import { TokenValidator } from '../helper/TokenValidator';

export default class AuthRouter{

    public static configure(
        authRespository:IAuthRepositry,
        tokenService:ITokenService,
        tokenStore:ITokenStore,
        passwordService:IPasswordService,
        tokenValidator:TokenValidator
    ):express.Router{

        const router=express.Router()

        let controller=AuthRouter.composeController(authRespository,tokenService,tokenStore,passwordService)
        router.post('/signin',
        (req:express.Request,res:express.Response)=>controller.signIn(req,res)
        )
        router.post('/signup',
        (req:express.Request,res:express.Response)=>controller.signUp(req,res) 
        )
        router.post('/signout',
        (req,res,next)=>tokenValidator.validate(req,res,next),  
        (req:express.Request,res:express.Response)=>controller.signOut(req,res)
        )
        return router

    }
    private static composeController(authRespository: IAuthRepositry, tokenService: ITokenService,tokenStore:ITokenStore, passwordService: IPasswordService):AuthController {
        const signInUsecase= new SignInUsecase(authRespository,passwordService)
        const signUpUsecase= new SignUpUseCase(authRespository,passwordService)
        const signOutUsecase= new SignOutUseCase(tokenStore)
        const controller= new AuthController(signInUsecase,signUpUsecase,signOutUsecase,tokenService)
        return controller
    }

    
}