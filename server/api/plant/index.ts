export default defineEventHandler(ev => {
  return ev.context.prisma.plant.findMany({
    include: {
      Location: true,
    },
  })
})
