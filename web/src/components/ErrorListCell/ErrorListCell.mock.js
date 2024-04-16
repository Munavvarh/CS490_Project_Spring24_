export const standard = () => ({
  errors: [
    {
      id: 1,
      title: 'BACKEND ERROR',
      description: 'Failed to reach the OpenAI service. Please try again.',
      createdAt: '2002-06-11T12:34:56Z',
      status: 'LOGGED',
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: '',
        originalLanguage: 'java',
        translationLanguage: 'python',
        id: 8888,
      },
    },
    {
      id: 2,
      title: 'TypeError',
      description: 'NetworkError when attempting to fetch resource.',
      createdAt: '2002-06-11T12:34:56Z',
      status: 'OPEN',
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: '',
        originalLanguage: 'java',
        translationLanguage: 'python',
        id: 90,
      },
    },
    {
      id: 3,
      title: 'TRANSLATION FAILURE',
      description: 'This is a test description.',
      createdAt: '2002-06-11T12:34:56Z',
      status: 'FIXED',
      translation: {
        originalCode: 'console.log("hello world");',
        translatedCode: '',
        originalLanguage: 'unknown',
        translationLanguage: 'python',
        id: 35,
      },
    },
  ],
})
