import {Document, Schema, model} from "mongoose"

interface iUser{
    userName: string;
    email: string;
    password: string;
    avatar: string;
    verifictionToken: string;
    verified: boolean;
}

interface iUserData extends iUser, Document{}

const userModel = new Schema<iUserData>(
    {
        userName: {type: String},
        email: {type: String},
        password: {type: String},
        verifictionToken: {type: String, unique: true},
        avatar: {type: String},
        verified: {type: Boolean, default: false}
    },
    {timestamps: true}
);

export default model<iUserData>("users", userModel)