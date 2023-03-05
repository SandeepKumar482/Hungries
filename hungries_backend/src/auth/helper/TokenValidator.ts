import { NextFunction, Request, Response } from "express";
import ITokenService from "../service/ITokenServicees";
import ITokenStore from "../service/ITokenStore";

export class TokenValidator{
    constructor( 
      private readonly tokenService:ITokenService,
      private readonly tokenStore:ITokenStore
    ){}
    
    public async validate(req: Request,res:Response,next:NextFunction){
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({err: 'Authorisation Header is Required'})
        }
        if(this.tokenService.decode(authHeader)=='' || await this.tokenStore.get(authHeader)!=''){
            return res.status(402).json({error:'Invalid Token'})
        }
        next()  
    }


}