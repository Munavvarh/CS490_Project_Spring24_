export const schema = gql`
  type Error {
    id: Int!
    createdAt: DateTime!
    translation: TranslationHistory!
    translationId: Int!
    title: String!
    description: String!
    status: String!
  }

  type Query {
    errors: [Error!]! @requireAuth
    error(id: Int!): Error @requireAuth
  }

  input CreateErrorInput {
    translationId: Int!
    title: String!
    description: String!
    status: String!
  }

  input UpdateErrorInput {
    translationId: Int
    title: String
    description: String
    status: String
  }

  type Mutation {
    createError(input: CreateErrorInput!): Error! @requireAuth
    updateError(id: Int!, input: UpdateErrorInput!): Error! @requireAuth
    deleteError(id: Int!): Error! @requireAuth
  }
`
