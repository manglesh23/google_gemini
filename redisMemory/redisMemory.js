import { createClient } from "redis";
import dotenv from 'dotenv';
import { json, text } from "express";
dotenv.config();
let client= createClient({url:process.env.REDIS_URL});

await client.connect();

export const getChatHistory= async(userId)=>{
    try{
      let getChat= await client.get(`chat${userId}`);
      if(!getChat)
        return [];

      const parsed= JSON.parse(getChat);

      return parsed.map((msg)=>({
        role:msg.role==="user"?"human":"ai",
        content:msg.text
      }));
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}

export const saveChat= async(userId,userInput,modelReply)=>{
    try{
      let getChat= await client.get(`chat${userId}`);

      let history= getChat ? JSON.parse(getChat):[];

      history.push({role:"user",text:userInput});
      history.push({role:"model",text:modelReply});

      await client.setEx(`chat${userId}`,86400,JSON.stringify(history));
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}