import express,{Request, Response, response} from "express"
import productModel from "../model/productModel"
import userModel from "../model/userModel";

export const createProduct = async (req:Request, res:Response) => {
    try{

        const {title, description, price, rate} = req.body
        const product = await productModel.create({
            title,
            description,
            price,
            rate,
            image: title.charAt(0)
        });

        return res.status(201).json({
            message: "Product Created",
            data: product
        });
    } catch (error: any){
            return res.status(404).json({
                message: "Error",
                data: error.message
            });
    }
};

export const getProduct = async (req: Request, res:Response) => {
    try{
            const product = await productModel.find();

            return res.status(200).json({
                message : "Product Gotten",
                data: product
            })
    }catch(error){
        return res.status(404).json({
            message: "Error",
            data: error.message
        });
    }
}

export const getOneProduct = async (req:Request, res:Response) => {
    try{
        const {productId} = req.params;

        const Product = await productModel.findById(productId);
        return res.status(200).json({
            message: "One Product gotten",
            data: Product
        })

    } catch(error) {
        return res.status(404).json({
            message: "Error",
            data: error.message
        });
    } 
};


export const getOneProductAndLike = async (req:Request, res:Response) => {
    try {
        const {productId, userId} = req.params;

        const user = await productModel.findById(userId);
        const product = await productModel.findById(productId);

        if (user && product) {
            const check = product.like.some((el) => el === userId);

            if (check){
                return res.status(200).json({
                    mesage: "You've Already Liked this Product"
                });
            } else {
                const like = await productModel.findByIdAndUpdate(
                    productId,
                    {
                        like: [...product.like, userId],
                    },
                    { new: true}
                );

                return res.status(200).json({
                    message: "product found",
                    data: like
                });
            }
        }else {
            return res.status(404).json({
                message: "Product or user not Found"
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
}

export const getOneProductAndUnLike = async (req:Request, res: Response) =>{
    try {
        const {productId, userId} = req.params;

        const user = await userModel.findById(userId);
        const product = await productModel.findById(productId)

        if( user && product) {
            const Like = await productModel.findByIdAndUpdate(
                productId,
                {
                    Like: product.like.filter((el) => el !== userId),
                },
                {new: true}
            );

            return res.status(200).json({
                message: "product found",
                data: Like
            })
        } else {
            return res.status(404).json({
                message: "Product Or User not Found"
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message
        });
    }
};