import { Quote } from "./models/Quote";

export const resolvers = {
  Query: {
    hello: () => "hi",
    quotes: async (_, __, { user }) => {
      if (!user) {
        throw new Error("You are not authorized!");
      }
      return await Quote.find({ user: user.sub });
    }
  },
  Mutation: {
    createQuote: async (_, { quote: { authorName, text } }, { user }) => {
      if (!user) {
        throw new Error("You are not authorized!");
      }
      const quote = new Quote({ authorName, text, user: user.sub });
      await quote.save();
      return quote;
    },
    updateQuote: async (_, { id, quote: { authorName, text } }, { user }) => {
      if (!user) {
        throw new Error("You are not authorized!");
      }
      const quote = await Quote.findByIdAndUpdate(id, { authorName, text }).where("user", user.sub);
      return quote;
    },
    deleteQuote: async (_, { id }, { user }) => {
      if (!user) {
        throw new Error("You are not authorized!");
      }
      const quote = await Quote.findByIdAndDelete(id).where("user", user.sub);
      return quote;
    }
  }
};
