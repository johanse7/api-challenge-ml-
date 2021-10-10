import { axiosInstance } from "../config/configAxios"
import configEnv from "../config/configEnv"
import { FILTER_CATEGORY } from "../helpers/const"
import { getDecimals } from "../helpers/utils"
import { ICategory } from "../interfaces/ICategory"
import { IvalueFilter } from "../interfaces/IFilterService"
import { IProduct, IProductDetailService } from "../interfaces/IProduct"
import { IProductDescription } from "../interfaces/IProductDescription"
import {
  IResponseProduct,
  IResponseProductList,
  IResponseServiceProducts,
} from "../interfaces/IResponseService"

export const getProductsByKeyWordSearch = async (search: string): Promise<IResponseProductList> => {
  const {
    data: { results, filters },
  } = await axiosInstance.get<IResponseServiceProducts>(`/sites/MLA/search?q=${search}`)

  const products: Array<IProduct> = results.map<IProduct>(
    ({ id, title, currency_id, price, address, condition, shipping, thumbnail }) => {
      return {
        id,
        title,
        price: {
          currency: currency_id,
          amount: price,
          decimals: getDecimals(price),
        },
        condition,
        free_shipping: shipping.free_shipping,
        picture: thumbnail,
        state_name: address.state_name,
      }
    },
  )

  const categoryValues: Array<IvalueFilter> | undefined = filters.find(
    ({ id }) => id === FILTER_CATEGORY,
  )?.values

  const categories: Array<string> = categoryValues
    ? categoryValues.flatMap(({ path_from_root }) => path_from_root.map(({ name }) => name))
    : []

  return {
    author: {
      name: configEnv.authorName,
      lastName: configEnv.authorLastName,
    },
    categories,
    items: products,
  }
}

export const getProductDetailById = async (id: string): Promise<IResponseProduct> => {
  const promeseServicesDetail = Promise.all([
    axiosInstance.get<IProductDetailService>(`/items/${id}`),
    axiosInstance.get<IProductDescription>(`/items/${id}/description`),
  ])

  const [detail, productDescription] = await promeseServicesDetail

  let categories: Array<string> = []
  if (detail.data.category_id) {
    categories = await getCategoriesByProduct(detail.data.category_id)
  }

  return {
    author: {
      name: configEnv.authorName,
      lastName: configEnv.authorLastName,
    },
    item: {
      id: detail.data.id,
      title: detail.data.title,
      condition: detail.data.condition,
      free_shipping: detail.data.shipping.free_shipping,
      picture: detail.data.pictures.length > 0 ? detail.data.pictures[0].secure_url : "",
      price: {
        amount: detail.data.price,
        currency: detail.data.currency_id,
        decimals: getDecimals(detail.data.price),
      },
      sold_quantity: detail.data.sold_quantity,
      description: productDescription.data.plain_text,
      categories,
    },
  }
}

export const getCategoriesByProduct = async (categoryId: string): Promise<Array<string>> => {
  const { data: categoriesProduct } = await axiosInstance.get<ICategory>(
    `/categories/${categoryId}/`,
  )
  return categoriesProduct.error ? [] : categoriesProduct.path_from_root.map(({ name }) => name)
}
