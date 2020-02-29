import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Favorite = new Schema(
  {
    creatorId: { type: String, required: true },
    recipeId: { type: String, required: true },
    deleted: { type: Boolean, default: false }

    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Favorite;