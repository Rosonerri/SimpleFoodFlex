import {Document, Types, Schema, model} from "mongoose"

interface iProduct {
title: string;
description: string;
price: number;
image: string;
rate: number;
ratings: Array<{}>;
review: Array<{}>;
like: Array<string>;
}

interface iProductData extends iProduct, Document {}

const productModel = new Schema <iProductData>(
    {
        title: {
            type: String
        },
        
        description: {
            type: String
        },
        price: {
            type: Number
        },
        image: {
            type: String
        },  
        rate: {
            type: Number
        },
        ratings: [{
            type:  Types.ObjectId, ref: "ratings"
            }], 
        review: {type: []}       
    },

    {timestamps: true}
);

export default model<iProductData>("products", productModel);