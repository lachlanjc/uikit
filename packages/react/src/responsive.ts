import { useParent } from './context.js'

export function useRootSize() {
  return useParent().root.node.size
}
