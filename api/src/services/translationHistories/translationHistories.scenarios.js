export const standard = defineScenario({
  translationHistory: {
    one: {
      data: {
        originalCode: 'console.log("hello world");',
        translatedCode: 'print("hello world")',
        updatedAt: new Date().toISOString(),
        status: 'COMPLETED',
        user: {
          create: {
            email: 'user1@example.com',
            hashedPassword: 'randomHashedPassword1',
            salt: 'randomSalt1',
          },
        },
      },
    },
    two: {
      data: {
        originalCode: 'console.log("goodbye world");',
        translatedCode: 'print("goodbye world")',
        updatedAt: new Date().toISOString(),
        status: 'COMPLETED',
        user: {
          create: {
            email: 'user2@example.com',
            hashedPassword: 'randomHashedPassword2',
            salt: 'randomSalt2',
          },
        },
      },
    },
  },
})
