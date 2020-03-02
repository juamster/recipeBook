import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    imageURL: { type: String },
    description: { type: String },
    ingredients: [{ type: String }],
    likes: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    creatorId: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorPicture: { type: String, required: true }

    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;