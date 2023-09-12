import prisma from "../../server/db"
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

async function getUser(){
    const user = prisma.user.findMany();
    return user;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const result = await getUser()
      res.status(200).json({ result })
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }
  }