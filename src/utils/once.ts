/**
 * React Hooks triggers requests twice on every page.
 * To prevent it from doing this, call this function.
 * Once makes sure a function is called only once within the timeframe.
 * Always unsubscribe from this function by returning the function.
 *
 * @param fn function to be executed
 * @returns unsubscribe function
 */
export const once = (fn: Function, unsubscribe?: Function, timeout?: number) => {
  const id = setTimeout(() => {
    fn()
  }, timeout ?? 1000)

  return () => {
    if (unsubscribe) unsubscribe()
    clearTimeout(id)
  }
}
