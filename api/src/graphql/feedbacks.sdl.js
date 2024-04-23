export const schema = gql`
  type Feedback {
    id: Int!
    createdAt: DateTime!
    score: Int!
    translation: TranslationHistory
    translationId: Int
    review: String
    User: User!
    userId: Int!
  }

  type Query {
    feedbacks: [Feedback!]! @skipAuth
    feedback(id: Int!): Feedback @skipAuth
  }

  input CreateFeedbackInput {
    score: Int!
    translationId: Int!
    review: String
    userId: Int!
  }

  input UpdateFeedbackInput {
    score: Int
    translationId: Int
    review: String
    userId: Int
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @requireAuth
    updateFeedback(id: Int!, input: UpdateFeedbackInput!): Feedback!
      @requireAuth
    deleteFeedback(id: Int!): Feedback! @requireAuth
  }
`
