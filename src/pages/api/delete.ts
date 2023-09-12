import prisma from '../../server/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 


async function deleteUser(body: any){
    const user = prisma.user.delete({
        where: {
            id: body.id
        }
      })
    return user;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const result = await deleteUser(req.body)
      res.status(200).json({ result })
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }
  }