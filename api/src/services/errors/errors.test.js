import { errors, error, createError, updateError, deleteError } from './errors'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('errors', () => {
  scenario('returns all errors', async (scenario) => {
    const result = await errors()

    expect(result.length).toEqual(Object.keys(scenario.error).length)
  })

  scenario('returns a single error', async (scenario) => {
    const result = await error({ id: scenario.error.one.id })

    expect(result).toEqual(scenario.error.one)
  })

  scenario('creates a error', async (scenario) => {
    const result = await createError({
      input: {
        translationId: scenario.error.two.translationId,
        title: 'String',
        description: 'String',
        status: 'String',
      },
    })

    expect(result.translationId).toEqual(scenario.error.two.translationId)
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.status).toEqual('String')
  })

  scenario('updates a error', async (scenario) => {
    const original = await error({ id: scenario.error.one.id })
    const result = await updateError({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a error', async (scenario) => {
    const original = await deleteError({ id: scenario.error.one.id })
    const result = await error({ id: original.id })

    expect(result).toEqual(null)
  })
})
