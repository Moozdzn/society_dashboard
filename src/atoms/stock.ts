import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import type { I_Stock } from "../typings"

export const stockAtom = atom<I_Stock[]>([])

export const useStock = () => useAtomValue(stockAtom)
export const useSetStock = () => useSetAtom(stockAtom)
export const useStockState = () => useAtom(stockAtom)