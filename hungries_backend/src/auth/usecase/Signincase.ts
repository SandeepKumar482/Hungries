import IAuthRepositry from "../domain/IAuthRepository";
import IPasswordService from "../service/IPasswordService";

export default class SignInUsecase{
    constructor(private authRepository:IAuthRepositry,private ipasswordService:IPasswordService){}

    public async execute(name:string ,email:string ,password:string,authType:string ):Promise<string>{
        if(authType=='email') return this.emailLogin(email, password)

        return this.oauthLogin(name, email,authType)
    }


    private async emailLogin(email:string,password:string){
        const user=await this.authRepository.find(email).catch((_)=>null)
        if(!user || await this.ipasswordService.compare(password,user.password) )
        return Promise.reject('Invalid email or Password')

        return user.id
    }

    private async oauthLogin(name:string , email:string,authType:string){
        const user=await this.authRepository.find(email).catch((_)=>null)
        if(user && user.type=='email')
        return Promise.reject('user already exist, Login with password')
        if(user)
        return user.id

        const userId=await this.authRepository.add(email,name,authType)
        return userId
    }
}