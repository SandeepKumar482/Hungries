import User from "./Users";

export default interface IAuthRepositry{
    find(email: string): Promise<User>
    add(email :string, name:string , type:string,passwordHash?:string):Promise<string>

}