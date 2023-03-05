import IPasswordService from "../../service/IPasswordService";
import bcrypt, { hash, hashSync } from 'bcrypt';

export default class BecryptPasswordService implements IPasswordService{
    constructor(private readonly saltRound:number){}
    hash(password: string): Promise<string> {
        return hash(password,this.saltRound)

    }
    compare(password: string, hash: string): Promise<boolean> {
       return bcrypt.compare(password,hash);
        
    }
}