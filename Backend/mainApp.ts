import express, {Response, Request, Application} from "express"


export const mainApp = (app: Application) => {
 try {
    app.get("/", (req: Request, res:Response) =>{
        try {
            return res.status(200).json({
                message: "Welcomwe to Our API"
            })
        } catch (error) {
            return res.status(404).json({
                message: "Error",
            })
        }
    })
 } catch (error) {
    console.log(error)
 }
}