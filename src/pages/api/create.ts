import prisma from '../../server/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

async function createUser(userdata: any){
    const user = prisma.user.create({
        data: {
          name: userdata.name,
          company: userdata.company,
          phone: userdata.phone,
          email: userdata.email,
        }
      })
    return user;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const result = await createUser(req.body)
      res.status(200).json({ result })
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }
  }