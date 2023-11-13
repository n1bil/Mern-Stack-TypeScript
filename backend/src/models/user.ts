import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },         // select means when we retrieve a user from database, we don't return email and 
    password: { type: String, required: true, select: false },      // password. We return only username from database
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);