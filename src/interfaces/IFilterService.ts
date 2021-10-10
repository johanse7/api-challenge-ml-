export interface IvalueFilter {
  id: string
  name: string
  path_from_root: Array<IPathFromRoot>
}

export interface IPathFromRoot {
  id: string
  name: string
}

export interface IFilterService {
  id: string
  name: string
  type: string
  values: Array<IvalueFilter>
}
