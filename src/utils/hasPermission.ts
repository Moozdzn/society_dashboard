import { Role } from '../typings'

export const hasPermission = (grade: Role, permission: string) => {
	if (!grade) return false
	if (!grade.permissions) return false
	return grade.permissions.includes(permission)
}
