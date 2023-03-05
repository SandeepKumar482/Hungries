import IAuthRepositry from "../domain/IAuthRepository";
import IPasswordService from "../service/IPasswordService";

export default class SignUpUseCase{

    constructor(
        private authRepository:IAuthRepositry,
        private passwordService:IPasswordService)
    {}

    public async execute(
        name:string,
        email:string,
        password:string,
        authType:string
    ):Promise<string>{
        
        const user=await this.authRepository.find(email).then((user)=>{
            return Promise.reject('User already Exist')
        }).catch(async (err)=>{if(err=='User not found'){
            
        
        
        let passwordHash
        if(password)
        passwordHash=await this.passwordService.hash(password)
        else passwordHash=undefined

        const userId=this.authRepository.add(
            email,
            name,
            authType,
            passwordHash,
        )
        
        return userId
        }})

        return ''
        
    
    }
}