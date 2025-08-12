import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const o1 = await prisma.offer.create({ data: { company: 'EuroTrans', origin: 'Sofia, BG', destination: 'Berlin, DE', availableFrom: new Date(Date.now() + 864e5), cargoType: 'Furniture', requestedTons: 8, priceEur: 450 } })
    const o2 = await prisma.offer.create({ data: { company: 'Balkan Logistics', origin: 'Sofia, BG', destination: 'Munich, DE', availableFrom: new Date(Date.now() + 2*864e5), cargoType: 'Electronics', requestedTons: 6, priceEur: 390 } })
    return res.status(200).json({ ok: true, offers: [o1, o2] })
  } catch (e: any) {
    console.error('seed-offers error:', e?.message || e)
    return res.status(500).json({ error: 'Seed failed' })
  }
}
