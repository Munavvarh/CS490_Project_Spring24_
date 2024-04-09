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

import Contact from './Contact'

export const Primary = () => {
  return (
    <Contact
      contact={{
        subject: 'great website',
        message:
          'i think that BMT is an extremely qualified group of developers bravo',
        createdAt: '2002-06-11T12:34:56Z',
        user: {
          email: 'user1@example.com',
        },
        wantResponse: true,
      }}
    />
  )
}

export default {
  title: 'Components/Contact',
  component: Contact,
}

/*export const Primary = {}*/
