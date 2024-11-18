export interface I_Purchases {
    name: string
    label: string
    price: number
    max: number
    min?: number
}

export interface I_Logs {
    id: number
    type: string
    message: string
    timestamp: number
}

export interface ReturnProps {
    status: string
    message: string
}

export interface PermissionObject {
    default: Permission[]
    job?: Permission[]
    vehicles?: Permission[]
    weapons?: Permission[]
    dev?: boolean
}

export interface I_Stock {
    name: string
    label: string
    amount: number
}

export interface OpenData {
    purchases: I_Purchases[]
	products: Product[]
    stock: I_Stock[]
	funds: number
	roles: Role[]
	employees: Employee[]
    permissions: PermissionObject
	name: string
	myRole: string
	label: string
    dev: boolean
}

export interface Product {
    name: string
    label: string
    price: number
    min: number
}

export interface Society {
    name: string
    label: string
    funds: number
}

export interface Role {
    name: string
    salary: number
    percentage: number
    label: string
    permissions: string[]
    outfits: {
        female: string
        male: string
    }
    grade: number
}

export enum ActiveStatus {
	OFF_DUTY,
	ON_DUTY_OFFLINE,
	ON_DUTY,
} 

export interface Employee {
    active: ActiveStatus
    name: string
    role: string
    phone: string
    iban: string
    citizenid: string
}

export interface Player {
    citizenid: number;
    name: string;
    distance: number;
    unique: number;
}

export interface Permission {
    name: string;
    label: string;
    description?: string;
}

export type ChartData = {
    citizenid: string
    amount: number
    dutyTime: number
}