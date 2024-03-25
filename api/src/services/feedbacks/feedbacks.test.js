import { db } from 'src/lib/db'

import {
  feedbacks,
  feedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from './feedbacks'
import { standard } from './feedbacks.scenarios'

jest.mock('src/lib/db', () => ({
  db: {
    feedback: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('feedbacks', () => {
  it('returns all feedbacks', async () => {
    db.feedback.findMany.mockResolvedValue([
      { id: 1, score: 5 },
      { id: 2, score: 4 },
    ])
    const result = await feedbacks()
    expect(result).toEqual([
      { id: 1, score: 5 },
      { id: 2, score: 4 },
    ])
  })
})

describe('feedback', () => {
  it('returns a specific feedback by id', async () => {
    db.feedback.findUnique.mockResolvedValue({ id: 1, score: 5 })
    const result = await feedback({ id: 1 })
    expect(result).toEqual({ id: 1, score: 5 })
  })
})

describe('createFeedback', () => {
  it('creates a new feedback', async () => {
    const input = { score: 5 }
    db.feedback.create.mockResolvedValue({ id: 1, ...input })
    const result = await createFeedback({ input })
    expect(result).toEqual({ id: 1, ...input })
  })
})

describe('updateFeedback', () => {
  it('updates an existing feedback', async () => {
    const input = { score: 4 }
    db.feedback.update.mockResolvedValue({ id: 1, ...input })
    const result = await updateFeedback({ id: 1, input })
    expect(result).toEqual({ id: 1, ...input })
  })
})

describe('deleteFeedback', () => {
  it('deletes an existing feedback', async () => {
    db.feedback.delete.mockResolvedValue({ id: 1 })
    const result = await deleteFeedback({ id: 1 })
    expect(result).toEqual({ id: 1 })
  })
})

describe('standard scenario', () => {
  it('runs the standard scenario', async () => {
    await createFeedback(standard.feedback.one.data)
    await createFeedback(standard.feedback.two.data)

    const feedbacks = await db.feedback.findMany()

    expect(feedbacks.length).toEqual(2)
  })
})
