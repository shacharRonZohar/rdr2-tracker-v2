import fs from 'fs/promises'
import { PrismaClient } from '@prisma/client'

const dirPath = process.argv[2]

main()
async function main() {
  const client = new PrismaClient()
  await Promise.all([
    generateBaseEntities(client),
    generateGenericNewAustin(client),
  ])
  client.$disconnect()
}

async function generateBaseEntities(client) {
  const dirs = await fs.readdir(dirPath, 'utf-8')
  const jsonFiles = dirs.filter(dir => dir.endsWith('.json'))
  const items = await Promise.all(
    jsonFiles.flatMap(async file => {
      const data = await fs.readFile(`${dirPath}/${file}`, 'utf-8')
      return JSON.parse(data).map(({ name }) => {
        return {
          name,
        }
      })
    })
  )

  return client.baseEntity.createMany({ data: items })
}

function generateGenericNewAustin(client) {
  return client.locationDescription.create({
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
