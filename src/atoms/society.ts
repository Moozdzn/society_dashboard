import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import type { Society } from '../typings'

export const societyAtom = atom<Society>({
	name: 'Robert Colombo',
	funds: 454759,
	label: 'Pizza This',
})

export const useSociety = () => useAtomValue(societyAtom)
export const useSetSociety = () => useSetAtom(societyAtom)
export const useSocietyState = () => useAtom(societyAtom)
