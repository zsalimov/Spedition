import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const t1 = await prisma.truck.upsert({ where: { plate: 'SEED-001' }, update: {}, create: { plate: 'SEED-001', make: 'DAF', model: 'XF', year: 2021, capacityTons: 24, status: 'available', location: 'Sofia' } })
    const t2 = await prisma.truck.upsert({ where: { plate: 'SEED-002' }, update: {}, create: { plate: 'SEED-002', make: 'Volvo', model: 'FH', year: 2020, capacityTons: 18, status: 'available', location: 'Plovdiv' } })

    const o1 = await prisma.offer.create({ data: { company: 'EuroTrans', origin: 'Sofia, BG', destination: 'Berlin, DE', availableFrom: new Date(Date.now() + 864e5), cargoType: 'Furniture', requestedTons: 8, priceEur: 450 } }).catch(() => null)
    const o2 = await prisma.offer.create({ data: { company: 'Balkan Logistics', origin: 'Sofia, BG', destination: 'Munich, DE', availableFrom: new Date(Date.now() + 2*864e5), cargoType: 'Electronics', requestedTons: 6, priceEur: 390 } }).catch(() => null)

    return res.status(200).json({ ok: true, trucks: [t1, t2], offers: [o1, o2] })
  } catch (e: any) {
    console.error('seed-all error:', e?.message || e)
    return res.status(500).json({ error: 'Seed failed' })
  }
}
