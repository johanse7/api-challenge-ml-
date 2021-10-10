import { IPathFromRoot } from "./IFilterService"

export interface ICategory {
  id: string
  name: string
  path_from_root: Array<IPathFromRoot>
  error?: string
}
