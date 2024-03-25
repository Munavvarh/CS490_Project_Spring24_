export const standard = () => ({
  feedbacks: [
    {
      id: 1,
      score: 5,
      review:
        'My code translated literally perfectly I am in love with this website <3',
      createdAt: '2002-06-11T12:34:56Z',
      User: {
        email: 'user1@example.com',
      },
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: 'print("hello world")',
      },
    },
    {
      id: 2,
      score: 4,
      review: ':O >:( :3c',
      createdAt: '2002-06-11T12:34:56Z',
      User: {
        email: 'user1@example.com',
      },
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: 'print("hello world")',
      },
    },
    {
      id: 3,
      score: 3,
      review:
        'My code translated literally perfectly I am in love with this website <3',
      createdAt: '2002-06-11T12:34:56Z',
      User: {
        email: 'user1@example.com',
      },
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: 'print("hello world")',
      },
    },
  ],
})
