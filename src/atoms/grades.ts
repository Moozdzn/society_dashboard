import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import type { Role } from '../typings'

export const rolesAtom = atom<Role[]>([])

export const useRoles = () => useAtomValue(rolesAtom)
export const useSetRoles = () => useSetAtom(rolesAtom)
export const useRolesState = () => useAtom(rolesAtom)


export const myRoleNameAtom = atom<string>("")

export const useMyRoleName = () => useAtomValue(myRoleNameAtom)
export const useSetMyRoleName = () => useSetAtom(myRoleNameAtom)
export const useMyRoleNameState = () => useAtom(myRoleNameAtom)

export const myRoleAtom = atom((get) => {
  const myRoleName = get(myRoleNameAtom)
  const roles = get(rolesAtom)
  return roles.find((role: Role) => role.name === myRoleName) as Role
})

export const useMyRole = () => useAtomValue(myRoleAtom)
export const useMyRoleState = () => useAtom(myRoleAtom)