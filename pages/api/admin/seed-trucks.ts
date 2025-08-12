import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const a = await prisma.truck.upsert({ where: { plate: 'SEED-001' }, update: {}, create: { plate: 'SEED-001', make: 'DAF', model: 'XF', year: 2021, capacityTons: 24, status: 'available' } })
    const b = await prisma.truck.upsert({ where: { plate: 'SEED-002' }, update: {}, create: { plate: 'SEED-002', make: 'Volvo', model: 'FH', year: 2020, capacityTons: 18, status: 'available' } })
    return res.status(200).json({ ok: true, trucks: [a, b] })
  } catch (e: any) {
    console.error('seed-trucks error:', e?.message || e)
    return res.status(500).json({ error: 'Seed failed' })
  }
}
