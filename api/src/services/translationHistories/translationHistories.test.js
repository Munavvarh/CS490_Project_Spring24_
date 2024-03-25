import { db } from 'src/lib/db'

import {
  translationHistories,
  translationHistory,
  createTranslationHistory,
  updateTranslationHistory,
  deleteTranslationHistory,
} from './translationHistories'

describe('translationHistories', () => {
  // Define a variable to hold our scenario data
  let scenarioData

  // A function to create a test scenario
  async function createTestScenario() {
    const user = await db.user.create({
      data: {
        email: 'test@example.com',
        hashedPassword: 's0m3p4ssw0rd',
        salt: 's0m3s4lt',
      },
    })
    const translationHistory = await db.translationHistory.create({
      data: {
        userId: user.id,
        originalCode: 'console.log("hello world")',
        translatedCode: 'print("hello world")',
        status: 'COMPLETED',
        originalLanguage: 'javascript',
        translationLanguage: 'python',
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
    const result = await translationHistory({
      id: scenarioData.translationHistory.id,
    })
    expect(result).toEqual(
      expect.objectContaining({ id: scenarioData.translationHistory.id })
    )
  })

  it('creates a translationHistory', async () => {
    const newTranslationHistory = {
      userId: scenarioData.user.id,
      originalCode: 'String',
      translatedCode: 'String',
      status: 'String',
      originalLanguage: 'String',
      translationLanguage: 'String',
    }
    const result = await createTranslationHistory({
      input: newTranslationHistory,
    })
    expect(result).toEqual(expect.objectContaining(newTranslationHistory))
  })

  it('updates a translationHistory', async () => {
    const result = await updateTranslationHistory({
      id: scenarioData.translationHistory.id,
      input: { originalCode: 'String2' },
    })
    expect(result.originalCode).toEqual('String2')
  })

  it('deletes a translationHistory', async () => {
    await deleteTranslationHistory({ id: scenarioData.translationHistory.id })
    const result = await translationHistory({
      id: scenarioData.translationHistory.id,
    })
    expect(result).toBeNull()
  })
})
