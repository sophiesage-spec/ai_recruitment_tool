import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    name: {
        type: "string",
        required: true,
        trim: true
    },

    description: {
        type: "string",
        required: true,
        trim: true
    },
    age: {
        type: "number",
        required: true,
        min: 1,
        max: 150
    },




},
    { timestamps: true }
)

export const Post = mongoose.model("Post", postSchema)