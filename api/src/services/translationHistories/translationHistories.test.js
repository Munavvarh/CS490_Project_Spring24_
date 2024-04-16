import {
  translationHistories,
  translationHistory,
  createTranslationHistory,
  updateTranslationHistory,
  deleteTranslationHistory,
  deleteAllTranslationHistoriesForUser, // Import the function for deleting all histories for a user
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

  it('deletes a single translationHistory entry', async () => {
    const history = await db.translationHistory.create({
      data: {
        userId: scenarioData.user.id,
        originalCode: 'console.log("to delete")',
        translatedCode: 'print("to delete")',
        status: 'COMPLETED',
        originalLanguage: 'JavaScript',
        translationLanguage: 'Python',
      },
    })

    await deleteTranslationHistory({ id: history.id })
    const result = await translationHistory({ id: history.id })
    expect(result).toBeNull()
  })

  it('deletes all translationHistories for a user', async () => {
    // Create additional translationHistories to setup the test
    await db.translationHistory.createMany({
      data: [
        {
          userId: scenarioData.user.id,
          originalCode: 'console.log("hello 1")',
          translatedCode: 'print("hello 1")',
          status: 'COMPLETED',
          originalLanguage: 'JavaScript',
          translationLanguage: 'Python',
        },
        {
          userId: scenarioData.user.id,
          originalCode: 'console.log("hello 2")',
          translatedCode: 'print("hello 2")',
          status: 'COMPLETED',
          originalLanguage: 'JavaScript',
          translationLanguage: 'Python',
        },
      ],
    })

    // Delete all histories for the user
    await deleteAllTranslationHistoriesForUser({ userId: scenarioData.user.id })

    // Check the database to confirm deletion
    const remainingHistories = await db.translationHistory.findMany({
      where: { userId: scenarioData.user.id },
    })
    expect(remainingHistories.length).toBe(0)
  })
})
