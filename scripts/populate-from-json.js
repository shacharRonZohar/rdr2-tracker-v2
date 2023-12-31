import fs from 'fs/promises'

import { PrismaClient } from '@prisma/client'

const filePath = process.argv[2]
const client = new PrismaClient()
await main2()
client.$disconnect()

async function main() {
  const data = await fs.readFile(filePath, 'utf-8')
  const json = JSON.parse(data)
  const items = json.map(({ name }) => {
    return {
      name,
    }
  })
  console.log(items.length, new Set(items).size)
  //   items.leng
  await client.plant.createMany({ data: items })
}

async function main2() {
  await client.locationDescription.create({
    data: {
      text: 'this is a test location for generic new austin',
      location: {
        connect: {
          id: 'clqtdn2m20000ptms6li33xmm',
        },
      },
      relatedEntities: [
        {
          type: 'plant',
          id: 'clqte76fr0004co85js603plv',
        },
      ],
    },
  })
}
