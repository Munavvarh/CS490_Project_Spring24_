export const standard = defineScenario({
  contact: {
    one: {
      data: {
        subject: 'String',
        message: 'String',
        wantResponse: true,
        user: {
          create: {
            email: 'String3249642',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        subject: 'String',
        message: 'String',
        wantResponse: true,
        user: {
          create: {
            email: 'String9366457',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
