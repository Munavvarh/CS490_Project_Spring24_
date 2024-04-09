import {
  contacts,
  contact,
  createContact,
  updateContact,
  deleteContact,
} from './contacts'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('contacts', () => {
  scenario('returns all contacts', async (scenario) => {
    const result = await contacts()

    expect(result.length).toEqual(Object.keys(scenario.contact).length)
  })

  scenario('returns a single contact', async (scenario) => {
    const result = await contact({ id: scenario.contact.one.id })

    expect(result).toEqual(scenario.contact.one)
  })

  scenario('creates a contact', async (scenario) => {
    const result = await createContact({
      input: {
        userId: scenario.contact.two.userId,
        subject: 'String',
        message: 'String',
        wantResponse: true,
      },
    })

    expect(result.userId).toEqual(scenario.contact.two.userId)
    expect(result.subject).toEqual('String')
    expect(result.message).toEqual('String')
    expect(result.wantResponse).toEqual(true)
  })

  scenario('updates a contact', async (scenario) => {
    const original = await contact({ id: scenario.contact.one.id })
    const result = await updateContact({
      id: original.id,
      input: { subject: 'String2' },
    })

    expect(result.subject).toEqual('String2')
  })

  scenario('deletes a contact', async (scenario) => {
    const original = await deleteContact({
      id: scenario.contact.one.id,
    })
    const result = await contact({ id: original.id })

    expect(result).toEqual(null)
  })
})
