import express, { Express } from "express"
import { TransactionCodeEnum } from "../enums/CommonEnum"
import { IQueryParamsItems } from "../interfaces/IQueyParams"
import { getProductDetailById, getProductsByKeyWordSearch } from "../services/productService"

export const productsRoute = (app: Express) => {
  const router = express.Router()
  app.use("/api", router)

  router.get("/items", async (req: express.Request<{}, {}, {}, IQueryParamsItems>, res, next) => {
    const { q } = req.query

    try {
      const dataProduct = await getProductsByKeyWordSearch(q)

      res.json({
        ...dataProduct,
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/items/:id", async (req, res, next) => {
    const { id } = req.params
    try {
      const productDetail = await getProductDetailById(id)

      res.json({
        ...productDetail,
      })
    } catch (error) {
      if (error?.response.status === TransactionCodeEnum.notFound) {
        res.sendStatus(TransactionCodeEnum.notFound)
        return
      }

      next(error)
    }
  })
}
