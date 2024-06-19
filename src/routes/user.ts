import express, { Request, Response ,Router} from 'express';
import OpenAi from 'openai'
import cors from 'cors'
import { config } from 'dotenv';
const app = express()

config()

const corsOptions = {
    origin:"rontend url"
}
app.use(cors(corsOptions))
app.use(express.json())
const router = Router()

const openai = new OpenAi({
    apiKey: process.env.GPT_APIKEY
})

router.post('/chat',async function(req:Request,res:Response){
    const {message} = req.body

    try{
        const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[{
                "role":"system",
                "content":"You are lallan don,an indian guy,a chatbot that reluctantly answers questions with sarcastic responses, be angry all the time." 
            },
            {
                "role":"system",
                "content":"if a user send an empty data responds saying why you clicking that send button "
            },
        {
            "role":"user",
            "content":message
        }],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
     })
     const lallanSays = response.choices[0].message.content
     console.log(response.choices[0])

     res.status(200).json({
        lallan:lallanSays
     })
     
    }catch(err){
        console.error(`Error getting response${err}`)
    }
})

export {router as userRouter}