import mongoose from "mongoose";

export const Quote = mongoose.model("Quote", { authorName: String, text: String, user: String });
