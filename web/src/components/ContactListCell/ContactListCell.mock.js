// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  contacts: [
    {
      subject: 'great website',
      message:
        'i think that BMT is an extremely qualified group of developers bravo',
      createdAt: '2002-06-11T12:34:56Z',
      user: {
        email: 'user1@example.com',
      },
      wantResponse: false,
    },
    {
      subject: 'mid website',
      message:
        'shrug its fine... (my ability to measure the quality of websites is severely incorrect)',
      createdAt: '2002-06-11T12:34:56Z',
      user: {
        email: 'user2@example.com',
      },
      wantResponse: false,
    },
    {
      subject: 'what am i doing here',
      message: 'this is a cool site but not my thing idk',
      createdAt: '2002-06-11T12:34:56Z',
      user: {
        email: 'alice@example.com',
      },
      wantResponse: true,
    },
  ],
})
