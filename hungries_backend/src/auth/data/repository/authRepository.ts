import { Mongoose } from "mongoose";
import IAuthRepositry from "../../domain/IAuthRepository";
import User from "../../domain/Users";
import { UserModel, UserSchema } from "../model/userModel";

export default class AuthRepository implements IAuthRepositry{
   constructor(private readonly client:Mongoose){}
   
   public async find(email: string): Promise<User> {
        const users=this.client.model<UserModel>('User',UserSchema)

        const user=await users.findOne({email:email})
        if(!user) return Promise.reject('User not found')
        
        return new User(
            user.id,
            user.name,
            user.password?? " ",
            user.type)

    }
    
    public async add(
            email: string,
            name: string, 
            type: string,
            passwordHash?: string,
          ): Promise<string> {
        const userModel= this.client.model<UserModel>('User',UserSchema)
        const savedUser=new userModel({
            type:type,
            name:name,
            email:email,
        }) 
        if(passwordHash) savedUser.password=passwordHash

        savedUser.save()
        return savedUser.id

    }

}