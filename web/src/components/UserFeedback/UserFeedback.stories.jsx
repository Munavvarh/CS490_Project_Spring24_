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

import UserFeedback from './UserFeedback'

export const Primary = () => {
  return (
    <UserFeedback
      feedback={{
        score: 5,
        review:
          'My code translated literally perfectly I am in love with this website <3',
        createdAt: '2002-06-11T12:34:56Z',
        email: 'pjd37@njit.edu',
        codeInput: 'hi',
        codeOutput: 'lol',
      }}
    />
  )
}

export default {
  title: 'Components/UserFeedback',
  component: UserFeedback,
}

/*export const Primary = {}*/
