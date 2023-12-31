export default defineEventHandler(ev => {
  return ev.context.prisma.plant.findMany({
    select: {
      id: true,
      name: true,
      location: true,
    },
  })
})
