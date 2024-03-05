import { db } from 'src/lib/db'

export const feedbacks = () => {
  return db.feedback.findMany()
}

export const feedback = ({ id }) => {
  return db.feedback.findUnique({
    where: { id },
  })
}

export const feedbackByScore = ({ score }) => {
  return db.feedback.findMany({
    where: { score },
  })
}

export const feedbackByEmail = ({ email }) => {
  return db.feedback.findMany({
    where: { email },
  })
}

export const createFeedback = ({ input }) => {
  return db.feedback.create({
    data: input,
  })
}

export const deleteFeedback = ({ id }) => {
  return db.feedback.delete({
    where: { id },
  })
}
