export function setSelector(baseSelector) {
  return function(selector = null) {
    return `[${[baseSelector, selector].filter(Boolean).join("-")}]`
  }
}
