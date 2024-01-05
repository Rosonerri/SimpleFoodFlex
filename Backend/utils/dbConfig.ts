import mongoose from "mongoose"

const URL: string = "mongodb://127.0.0.1:27017/authFoodFlexDB";

export const dbConfig = async () =>{
    try {
        (await mongoose.connect(URL)).isObjectIdOrHexString(() =>{
            try {
                console.log("db connected and ready to Rock ✈✈✈")
            } catch (error) {
                return error
            }
        })
    } catch (error) {
        return error
    }
}