import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import type { ChartData, Employee } from '../typings'

export const employeesAtom = atom<Employee[]>([])

export const useEmployeeState = () => useAtom(employeesAtom)
export const useEmployee = () => useAtomValue(employeesAtom)
export const useSetEmployee = () => useSetAtom(employeesAtom)


export const dutyAtom = atom((get) => {
    const employees = get(employeesAtom)
	const activeEmployees = employees.filter(employee => employee.active)
	return activeEmployees.length
})

export const useDuty = () => useAtomValue(dutyAtom)

export const topDutyAtom = atom<ChartData[]>([
	{
		citizenid: 'HJD97872',
		amount: 40,
		dutyTime: 559240000,
	},
	{
		citizenid: 'XVG19186',
		amount: 803,
		dutyTime: 440932000,
	},
	{
		citizenid: 'IVZ03826',
		amount: 240,
		dutyTime: 267668000,
	},
	{
		citizenid: 'EJW30699',
		amount: 229,
		dutyTime: 252454000,
	},
	{
		citizenid: 'NOM95641',
		amount: 489,
		dutyTime: 233936000,
	},
	{
		citizenid: 'UTV96859',
		amount: 184,
		dutyTime: 186220000,
	},
	{
		citizenid: 'KQX79933',
		amount: 233,
		dutyTime: 175742000,
	},
	{
		citizenid: 'WXW01715',
		amount: 349,
		dutyTime: 171710000,
	},
	{
		citizenid: 'XNY45558',
		amount: 180,
		dutyTime: 168149000,
	},
	{
		citizenid: 'BJL77297',
		amount: 523,
		dutyTime: 167807000,
	},
	{
		citizenid: 'PSE90541',
		amount: 155,
		dutyTime: 161529000,
	},
	{
		citizenid: 'NZZ44135',
		amount: 826,
		dutyTime: 161162000,
	},
	{
		citizenid: 'XYW17343',
		amount: 169,
		dutyTime: 149852000,
	},
	{
		citizenid: 'YPX32170',
		amount: 304,
		dutyTime: 149464000,
	},
	{
		citizenid: 'GYN15547',
		amount: 360,
		dutyTime: 144145000,
	},
	{
		citizenid: 'CBN40604',
		amount: 655,
		dutyTime: 142956000,
	},
	{
		citizenid: 'BJV67808',
		amount: 268,
		dutyTime: 133225000,
	},
	{
		citizenid: 'RWU52030',
		amount: 301,
		dutyTime: 133032000,
	},
	{
		citizenid: 'DRN39558',
		amount: 511,
		dutyTime: 129186000,
	},
	{
		citizenid: 'SEL83876',
		amount: 184,
		dutyTime: 122816000,
	},
])

export const useTopDuty = () => useAtomValue(topDutyAtom)
export const useSetTopDuty = () => useSetAtom(topDutyAtom)
export const useTopDutyState = () => useAtom(topDutyAtom)

export const topRoutesAtom = atom<ChartData[]>([
	{
		citizenid: 'RKG67259',
		amount: 953,
		dutyTime: 80445000,
	},
	{
		citizenid: 'NZZ44135',
		amount: 826,
		dutyTime: 161162000,
	},
	{
		citizenid: 'XVG19186',
		amount: 803,
		dutyTime: 440932000,
	},
	{
		citizenid: 'AAQ82913',
		amount: 704,
		dutyTime: 96179000,
	},
	{
		citizenid: 'CBN40604',
		amount: 655,
		dutyTime: 142956000,
	},
	{
		citizenid: 'SFO35409',
		amount: 620,
		dutyTime: 77193000,
	},
	{
		citizenid: 'SPQ30647',
		amount: 576,
		dutyTime: 80640000,
	},
	{
		citizenid: 'BJL77297',
		amount: 523,
		dutyTime: 167807000,
	},
	{
		citizenid: 'DRN39558',
		amount: 511,
		dutyTime: 129186000,
	},
	{
		citizenid: 'NOM95641',
		amount: 489,
		dutyTime: 233936000,
	},
	{
		citizenid: 'FYA78701',
		amount: 467,
		dutyTime: 119106000,
	},
	{
		citizenid: 'VPS61318',
		amount: 452,
		dutyTime: 109388000,
	},
	{
		citizenid: 'DET92133',
		amount: 449,
		dutyTime: 4032000,
	},
	{
		citizenid: 'ZYB74586',
		amount: 419,
		dutyTime: 83301000,
	},
	{
		citizenid: 'WGW16641',
		amount: 414,
		dutyTime: 74325000,
	},
	{
		citizenid: 'OZW42677',
		amount: 411,
		dutyTime: 49223000,
	},
	{
		citizenid: 'GYN15547',
		amount: 360,
		dutyTime: 144145000,
	},
	{
		citizenid: 'WXW01715',
		amount: 349,
		dutyTime: 171710000,
	},
	{
		citizenid: 'TQU42989',
		amount: 342,
		dutyTime: 122099000,
	},
	{
		citizenid: 'DGW65971',
		amount: 334,
		dutyTime: 63438000,
	},
])

export const useTopRoutes = () => useAtomValue(topRoutesAtom)
export const useSetTopRoutes = () => useSetAtom(topRoutesAtom)
export const useTopRoutesState = () => useAtom(topRoutesAtom)