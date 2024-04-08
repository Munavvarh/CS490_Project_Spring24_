import { db } from 'src/lib/db'

export const errors = () => {
  return db.error.findMany()
}

export const error = ({ id }) => {
  return db.error.findUnique({
    where: { id },
  })
}

export const createError = ({ input }) => {
  return db.error.create({
    data: input,
  })
}

export const updateError = ({ id, input }) => {
  return db.error.update({
    data: input,
    where: { id },
  })
}

export const deleteError = ({ id }) => {
  return db.error.delete({
    where: { id },
  })
}

export const Error = {
  translation: (_obj, { root }) => {
    return db.error.findUnique({ where: { id: root?.id } }).translation()
  },
}
