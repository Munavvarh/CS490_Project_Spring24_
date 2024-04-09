export const schema = gql`
  type Contact {
    id: Int!
    createdAt: DateTime!
    userId: Int!
    user: User!
    subject: String!
    message: String!
    wantResponse: Boolean!
    sentResponse: Boolean
  }

  type Query {
    contacts: [Contact!]! @requireAuth
    contact(id: Int!): Contact @requireAuth
  }

  input CreateContactInput {
    userId: Int!
    subject: String!
    message: String!
    wantResponse: Boolean!
    sentResponse: Boolean
  }

  input UpdateContactInput {
    userId: Int
    subject: String
    message: String
    wantResponse: Boolean
    sentResponse: Boolean
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @requireAuth
    updateContact(id: Int!, input: UpdateContactInput!): Contact! @requireAuth
    deleteContact(id: Int!): Contact! @requireAuth
  }
`
