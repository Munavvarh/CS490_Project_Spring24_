// Import necessary functions and db from your service file
import {
  translationHistories,
  translationHistory,
  createTranslationHistory,
  updateTranslationHistory,
  deleteTranslationHistory,
} from './translationHistories'
import { db } from 'src/lib/db'

describe('translationHistories', () => {
  // Define a variable to hold our scenario data
  let scenarioData

  // A function to create a test scenario
  async function createTestScenario() {
    const user = await db.user.create({
      data: { email: 'test@example.com', hashedPassword: 's0m3p4ssw0rd', salt: 's0m3s4lt' },
    })
    const translationHistory = await db.translationHistory.create({
      data: {
        userId: user.id,
        originalCode: 'console.log("hello world")',
        translatedCode: 'print("hello world")',
        status: 'COMPLETED',
        originalLanguage: 'JavaScript',
        translationLanguage: 'Python',
      },
    })
    return { user, translationHistory }
  }

  // Run before any tests are run
  beforeAll(async () => {
    scenarioData = await createTestScenario()
  })

  // Clean up after all tests are done
  afterAll(async () => {
    await db.translationHistory.deleteMany()
    await db.user.deleteMany()
  })

  it('returns all translationHistories', async () => {
    const result = await translationHistories()
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns a single translationHistory', async () => {
    const result = await translationHistory({ id: scenarioData.translationHistory.id })
    expect(result).toEqual(expect.objectContaining({ id: scenarioData.translationHistory.id }))
  })

  it('creates a translationHistory', async () => {
    const newTranslationHistoryInput = {
      userId: scenarioData.user.id,
      originalCode: 'console.log("hello new world")',
      translatedCode: 'print("hello new world")',
      status: 'COMPLETED',
      originalLanguage: 'JavaScript',
      translationLanguage: 'Python',
    }
    const result = await createTranslationHistory({ input: newTranslationHistoryInput })
    expect(result).toEqual(expect.objectContaining(newTranslationHistoryInput))
  })

  it('updates a translationHistory', async () => {
    const updatedData = { originalCode: 'console.log("updated world")' };
    const result = await updateTranslationHistory({
      id: scenarioData.translationHistory.id,
      input: updatedData,
    })
    expect(result.originalCode).toEqual(updatedData.originalCode)
  })

  it('deletes a translationHistory', async () => {
    await deleteTranslationHistory({ id: scenarioData.translationHistory.id })
    const result = await translationHistory({ id: scenarioData.translationHistory.id })
    expect(result).toBeNull()
  })
})
