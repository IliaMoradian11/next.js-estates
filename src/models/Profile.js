import { model, models, Schema } from "mongoose";

const profileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1000000,
    },
    realState: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["villa", "store", "office", "apartment"],
    },
    amenities: {
      type: [{ text: String, listId: String }],
      default: [],
    },
    rules: {
      type: [{ text: String, listId: String }],
      default: [],
    },
    titleMetadata: String,
    descriptionMetadata: String,
    keyWordsMetadata: {
      type: [{ text: String, listId: String }],
      default: [],
    },
    authorMetadata: String,
    constructionDate: {
      type: Date,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Profile = models.Profile || model("Profile", profileSchema);
export default Profile;
