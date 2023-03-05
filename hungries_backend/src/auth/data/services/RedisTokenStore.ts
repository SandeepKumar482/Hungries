import * as redis from "redis";
import ITokenStore from "../../service/ITokenStore";
import {promisify} from 'util';

export default class RedisTokenStore implements ITokenStore{
    constructor(private readonly client:redis.RedisClientType){}
    save(token: string): void {
        this.client.set(token,token)
    }
    async get(token: string): Promise<string> {
        const getAsync=promisify(this.client.get).bind(this.client)
        const res= await getAsync(token)
        return res ?? ' '
    }

}