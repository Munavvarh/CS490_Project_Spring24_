import { db } from 'src/lib/db'

export const translationHistories = () => {
  return db.translationHistory.findMany()
}

export const translationHistory = ({ id }) => {
  return db.translationHistory.findUnique({
    where: { id },
  })
}

export const createTranslationHistory = async ({ input }) => {
  // Assuming `input` includes `userId`
  const { userId } = input

  // Check if user exists
  const userExists = await db.user.findUnique({
    where: { id: userId },
  })

  if (!userExists) {
    throw new Error(`User with ID ${userId} does not exist.`)
  }

  // If the user exists, proceed to create the translation history
  return db.translationHistory.create({
    data: input,
  })
}

export const updateTranslationHistory = ({ id, input }) => {
  return db.translationHistory.update({
    data: input,
    where: { id: id },
  })
}

export const deleteTranslationHistory = ({ id }) => {
  return db.translationHistory.delete({
    where: { id },
  })
}
