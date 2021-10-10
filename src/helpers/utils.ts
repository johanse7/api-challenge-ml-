export const getDecimals = (value: number): number => {
  return Number((value % 1.0).toFixed(2))
}
