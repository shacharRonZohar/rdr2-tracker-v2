import fs from 'fs/promises'
import { PrismaClient, State } from '@prisma/client'

const dirPath =
  'C:/dev/ProjectsAndExercises/JS/Side/rdr2/tracker/src/assets/data'

main()
async function main() {
  const client = new PrismaClient()

  await generateBaseEntities(client)
  await generateGenericNewAustin(client)
  client.$disconnect()
}

async function generateBaseEntities(client: PrismaClient) {
  const dirs = await fs.readdir(dirPath, 'utf-8')
  const jsonFiles = dirs.filter(dir => dir.endsWith('.json'))
  const items = (
    await Promise.all(
      jsonFiles.flatMap(async file => {
        const data = await fs.readFile(`${dirPath}/${file}`, 'utf-8')
        const category = fromKebabCaseToSnakeCase(file.split('.')[0])
        return JSON.parse(data).flatMap(({ name }: { name: string }) => {
          return {
            name: name.toLowerCase(),
            category,
          }
        })
      })
    )
  ).flatMap(item => item)

  return client.baseEntity.createMany({ data: items })
}

const newAustinPlants = [
  'blackcurrant',
  'wild feverfew',
  'prairie poppy',
  'desert sage',
]
async function generateGenericNewAustin(client: PrismaClient) {
  const locationDataInput = {
    region: 'generic new austin',
    state: State.NEW_AUSTIN,
  }

  const locationData = await client.locationData.create({
    data: locationDataInput,
  })

  const locationInput = {
    text: 'generic new austin',
    locationData: {
      connect: {
        id: locationData.id,
      },
    },
  }
  const location = await client.location.create({ data: locationInput })

  // const location
  console.log('location', location.id)
  // return
  return Promise.all(
    newAustinPlants.map(async name => {
      // connect base entity to location, without creating a new one
      const entity = await client.baseEntity.update({
        select: {
          id: true,
        },
        where: {
          name,
        },
        data: {
          locations: {
            connect: {
              id: location.id,
            },
          },
        },
      })

      return entity
    })
  )
}

function fromKebabCaseToSnakeCase(str: string) {
  return str
    .split('-')
    .map(word => word.toUpperCase())
    .join('_')
}
