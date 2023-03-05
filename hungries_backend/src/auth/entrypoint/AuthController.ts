import ITokenService from "../service/ITokenServicees";
import SignInUsecase from "../usecase/Signincase";
import * as express from 'express';
import SignUpUseCase from "../usecase/signUpUseCase";
import SignOutUseCase from "../usecase/Signoutcase";

export default class AuthController{
    private readonly signInUsecase: SignInUsecase
    private readonly signUpUsecase:SignUpUseCase
    private readonly signOutUsecase:SignOutUseCase
    private readonly token:ITokenService

    constructor(signInUseCase:SignInUsecase,signUpUsecase:SignUpUseCase,signOutUsecase:SignOutUseCase, token:ITokenService) {
        this.signInUsecase=signInUseCase
        this.signUpUsecase=signUpUsecase
        this.signOutUsecase=signOutUsecase
        this.token=token

    }
    public async signIn(req:express.Request,res:express.Response){
        
        
        try{
            
            const {email,password,name,auth_type}=req.body
            return this.signInUsecase.execute(name,email,password,auth_type)
            .then((id:string)=>res.status(200).json({auth_token: this.token.encode(id)})
            )
            .catch((err:Error)=>res.status(404).json({error:err.message}))
        }catch(err){
            res.status(404).json({error:err})
        }
    }
    
    
    public async signUp(req:express.Request,res:express.Response){
  

        try{

            const {email,name,auth_type,password,}=req.body
            return this.signUpUsecase.execute(name,email,password,auth_type)
            .then((id:string)=>res.status(200).json({auth_token: this.token.encode(id)})
            )
            .catch((err:Error)=>res.status(404).json({error:err.message}))


        }catch(err){
            res.status(404).json({error:err})
        }
    }

    public async signOut(req:express.Request,res:express.Response){
        

        try{
            const token=req.headers.authorization!
            
            return this.signOutUsecase.execute(token)
            .then((result)=>res.status(200).json({message:result})
            )
            .catch((err:Error)=>res.status(404).json({error:err.message}))


        }catch(err){
            res.status(400).json({error:err})
        }
    }


    
}

