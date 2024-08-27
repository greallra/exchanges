import { create } from 'zustand'

type Store = {
  count: number
  inc: () => void
}

export const useStore = create<Store>()((set) => ({
  count: 1,
  loading: false,
  setLoading: () => set((state) => ({ loading: true })),
  stopLoading: () => set((state) => ({ loading: false })),
  inc: () => set((state) => ({ count: state.count + 1 })),
}))