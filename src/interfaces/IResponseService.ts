import { IAuthor } from "./IAuthor"
import { IFilterService } from "./IFilterService"
import { IProduct, IProducService, IProductDetail } from "./IProduct"

export interface IResponseProductList {
  author: IAuthor
  categories: Array<string>
  items: Array<IProduct>
}

export interface IResponseProduct {
  author: IAuthor
  item: IProductDetail
}

export interface IResponseServiceProducts {
  results: Array<IProducService>
  filters: Array<IFilterService>
}
