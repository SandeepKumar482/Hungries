import ITokenService from "../../service/ITokenServicees";
import  Jwt  from "jsonwebtoken";

export default class TokenService implements ITokenService{
    constructor(private readonly privateKey:string) {}

    encode(payload: string | object): string | object {
        let token =Jwt.sign({data:payload},this.privateKey,{
            issuer:'com.hungries',
            expiresIn:'1h',
            algorithm: 'HS256'
        })
        return token
    }
    decode(token: string): string | object {
        try{
        const decoded=Jwt.verify(token,this.privateKey)
        return decoded
        }
        catch(error){
            return 'Invalid Token'
        }
    }

}