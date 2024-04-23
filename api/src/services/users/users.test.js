import {
  users,
  user,
  createUser,
  updateUser,
  deleteUser,
  userByEmail,
  userByName,
} from './users'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('returns a single user via email', async (scenario) => {
    const result = await userByEmail({ email: scenario.user.one.email })

    expect(result).toEqual(true)
  })

  scenario('returns a single user via name', async (scenario) => {
    const result = await userByName({ name: scenario.user.one.name })

    expect(result).toEqual(true)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        email: 'String7445702',
        hashedPassword: 'String',
        salt: 'String',
      },
    })

    expect(result.email).toEqual('String7445702')
    expect(result.hashedPassword).toEqual('String')
    expect(result.salt).toEqual('String')
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { email: 'String96027122' },
    })

    expect(result.email).toEqual('String96027122')
  })

  scenario('updates a user password', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { hashedPassword: 'testpass' },
    })
    expect(result.hashedPassword).toEqual('testpass')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
