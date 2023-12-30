export default defineEventHandler(async ev => {
  const { name } = await readBody(ev)
  return ev.context.prisma.plant.create({
    data: {
      name,
    },
  })
})
