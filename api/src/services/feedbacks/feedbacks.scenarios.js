export const standard = defineScenario({
  feedback: {
    one: {
      data: {
        id: 1,
        score: 5,
        review:
          'My code translated literally perfectly I am in love with this website <3',
        createdAt: '2002-06-11T12:34:56Z',
        email: 'pjd37@njit.edu',
        codeInput: 'hi',
        codeOutput: 'lol',
      },
    },
    two: {
      data: {
        id: 2,
        score: 4,
        review: 'Works good.  I did Python to Java.',
        createdAt: '2002-06-11T12:34:56Z',
        email: 'dzwill@mit.edu',
        codeInput: 'print("Hello world")',
        codeOutput: 'System.out.println("Hello world")',
      },
    },
  },
})

export const postOnly = defineScenario({
  post: {
    feedback1: {
      data: {
        id: 16,
        score: 1,
        review: 'This thing stinks.',
        createdAt: '2009-12-25T21:55:31Z',
        email: 'hater@hater.org',
        codeInput: 'print("Stupid!")',
        codeOutput: 'System.out.println("Bad!")',
      },
    },
  },
})
