export const schema = gql`
  type Feedback {
    id: Int!
    createdAt: DateTime!
    score: Int!
    email: String
    review: String
    codeInput: String
    codeOutput: String
  }

  type Query {
    feedbacks: [Feedback!]! @skipAuth
  }

  input CreateFeedbackInput {
    score: Int!
    email: String
    review: String
    codeInput: String
    codeOutput: String
  }

  input UpdateFeedbackInput {
    score: Int
    email: String
    review: String
    codeInput: String
    codeOutput: String
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @skipAuth
    deleteFeedback(id: Int!): Feedback! @requireAuth
  }
`
