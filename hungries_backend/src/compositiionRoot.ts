import mongoose from "mongoose";
import AuthRepository from "./auth/data/repository/authRepository";
import BecryptPasswordService from "./auth/data/services/BecryptPasswordService";
import AuthRouter from "./auth/entrypoint/AuthRouter";
import TokenService from "./auth/data/services/TokenServices";
import * as redis from 'redis'
// import RedisClient from "@redis/client/dist/lib/client";
import { reset } from "nodemon";
import { TokenValidator } from "./auth/helper/TokenValidator";
import RedisTokenStore from "./auth/data/services/RedisTokenStore";



export default class CompositionRoot{
    private static client:mongoose.Mongoose
    private static redisClient:redis.RedisClientType

    public static configure(){
        this.client= new mongoose.Mongoose()
        this.redisClient= redis.createClient()
        const connectionStr=encodeURI(process.env.TEST_DB as string)
        this.client.connect(connectionStr, {
            
        })
    }

    public static authRouter(){
        const repository= new AuthRepository(this.client)
        const tokenService=new TokenService(process.env.PRIVATE_KEY as string)
        const passwordService=new BecryptPasswordService(10)
        const tokenStore=new RedisTokenStore(this.redisClient)
        const tokenValidator=new TokenValidator(tokenService,tokenStore)

        return AuthRouter.configure(repository,tokenService,tokenStore,passwordService,tokenValidator)
    }
}