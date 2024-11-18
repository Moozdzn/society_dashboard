import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import type { Permission, PermissionObject } from "../typings"

export const permissionsAtom = atom<PermissionObject>({
    default: [
        {
            name: 'hire',
            label: 'Hire',
            description: 'Allows the role to hire other players',
        },
    ],
    job: [],
    vehicles: [],
    weapons: [],
})

export const usePermissions = () => useAtomValue(permissionsAtom)
export const useSetPermissions = () => useSetAtom(permissionsAtom)
export const usePermissionsState = () => useAtom(permissionsAtom)

export const devAtom = atom<boolean>(false);

export const useDev = () => useAtomValue(devAtom)
export const useSetDev = () => useSetAtom(devAtom)
export const useDevState = () => useAtom(devAtom)

export const devPermissionsAtom = atom<Permission[]>((get) => get(devAtom) ? [] : []);
export const useDevPermissions = () => useAtomValue(devPermissionsAtom)

export const jobPermissionsAtom = atom<Permission[]>((get) => get(permissionsAtom).job || [])
export const useJobPermissions = () => useAtomValue(jobPermissionsAtom)

export const defaultPermissionsAtom = atom<Permission[]>((get) => get(permissionsAtom).default || [])
export const useDefaultPermissions = () => useAtomValue(defaultPermissionsAtom)

export const vehiclePermissionsAtom = atom<Permission[]>((get) => get(permissionsAtom).vehicles || [])
export const useVehiclePermissions = () => useAtomValue(vehiclePermissionsAtom)

export const weaponPermissionsAtom = atom<Permission[]>((get) => get(permissionsAtom).weapons || [])
export const useWeaponPermissions = () => useAtomValue(weaponPermissionsAtom)