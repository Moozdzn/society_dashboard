import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import type { Product } from "../typings"

export const productsAtom = atom<Product[]>([])

export const useProducts = () => useAtomValue(productsAtom)
export const useSetProducts = () => useSetAtom(productsAtom)
export const useProductsState = () => useAtom(productsAtom)