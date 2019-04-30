import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input QuoteInput {
    authorName: String
    text: String
  }

  type Quote {
    id: ID!
    authorName: String
    text: String
  }

  type Query {
    hello: String!
    quotes: [Quote!]!
  }

  type Mutation {
    createQuote(quote: QuoteInput): Quote
    updateQuote(id: ID!, quote: QuoteInput): Quote
    deleteQuote(id: ID!): Quote
  }
`;
