// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Error from './Error'

export default { component: Error }

export const Primary = () => {
  return (
    <Error
      error={{
        title: 'BACKEND ERROR',
        description: 'Failed to reach the OpenAI service. Please try again.',
        createdAt: '2002-06-11T12:34:56Z',
        translation: {
          id: 200000,
          originalCode: 'console.log("hello world");',
          translatedCode: '',
          originalLanguage: 'java',
          translationLanguage: 'python',
        },
        status: 'LOGGED',
      }}
    />
  )
}
