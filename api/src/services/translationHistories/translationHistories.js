import { db } from 'src/lib/db'

export const translationHistories = () => {
  return db.translationHistory.findMany()
}

export const translationHistory = ({ id }) => {
  return db.translationHistory.findUnique({
    where: { id },
  })
}

export const createTranslationHistory = ({ input }) => {
  return db.translationHistory.create({
    data: input,
  })
}

export const updateTranslationHistory = ({ id, input }) => {
  return db.translationHistory.update({
    data: input,
    where: { id },
  })
}

export const deleteTranslationHistory = ({ id }) => {
  return db.translationHistory.delete({
    where: { id },
  })
}
