import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    content: { type: String },
    deleted: { type: Boolean, default: false },
    creatorId: { type: String, required: true },
    recipeId: { type: String, required: true }

    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Comment;