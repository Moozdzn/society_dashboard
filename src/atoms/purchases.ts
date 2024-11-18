import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import type { I_Purchases } from "../typings"

export const purchasesAtom = atom<I_Purchases[]>([])

export const usePurchases = () => useAtomValue(purchasesAtom)
export const useSetPurchases = () => useSetAtom(purchasesAtom)
export const usePurchasesState = () => useAtom(purchasesAtom)