// api/src/graphql/translationHistories.sdl.js

export const schema = gql`
type TranslationHistory {
  id: Int!
  userId: Int!
  originalCode: String!
  translatedCode: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: String!
  originalLanguage: String!
  translationLanguage: String!
  user: String
}

type Query {
  translationHistories: [TranslationHistory!]! @requireAuth
  translationHistory(id: Int!): TranslationHistory @requireAuth
}

input CreateTranslationHistoryInput {
  userId: Int!
  originalCode: String!
  translatedCode: String!
  status: String!
  originalLanguage: String!
  translationLanguage: String!
}

input UpdateTranslationHistoryInput {
  userId: Int
  originalCode: String
  translatedCode: String
  status: String
}

type Mutation {
  createTranslationHistory(input: CreateTranslationHistoryInput!): TranslationHistory! @requireAuth
  updateTranslationHistory(id: Int!, input: UpdateTranslationHistoryInput!): TranslationHistory! @requireAuth
  deleteTranslationHistory(id: Int!): TranslationHistory! @requireAuth
}

mutation CreateTranslationHistory($input: CreateTranslationHistoryInput!) {
  createTranslationHistory(input: $input) {
    id
  }
}
`