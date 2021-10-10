import { IPictureService } from "./IPictureService"

export interface IProduct {
  id: string
  title: string
  price: {
    currency: string
    amount: number
    decimals: number
  }
  picture: string
  condition: string
  free_shipping: boolean
  state_name: string
}

export interface IProductDetail extends Omit<IProduct, "state_name"> {
  sold_quantity: number
  description: string
  categories: Array<string>
}

export interface IProducService {
  id: string
  title: string
  currency_id: string
  price: number
  thumbnail: string
  condition: string
  shipping: {
    free_shipping: boolean
  }
  address: {
    state_name: string
  }
}
export interface IProductDetailService {
  id: string
  title: string
  price: number
  category_id: string
  currency_id: string
  pictures: Array<IPictureService>
  sold_quantity: number
  condition: string
  shipping: {
    free_shipping: boolean
  }
}
