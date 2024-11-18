import { useMemo } from 'react'
import { myRoleAtom, rolesAtom, useMyRole, useRoles } from '../../../../atoms/grades'
import { MRT_ColumnDef, MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { fetchNui } from '../../../../utils/fetchNui'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { ReturnProps, Role } from '../../../../typings'
import { useLocalization } from '../../../../providers/LocalizationProvider'

interface Outfit {
	role: string
	male: string
	female: string
}

const Outfits: React.FC = () => {
	const roles = useRoles()
	const myRole = useMyRole()

	const { t } = useTranslation()
	const { localization } = useLocalization()

	const data = useMemo<Outfit[]>(() => {
		const data: Outfit[] = []

		for (const role of roles) {
			if (myRole.grade >= role.grade) {
				data.push({
					role: role.name,
					male: role.outfits.male,
					female: role.outfits.female,
				})
			}
		}

		return data
	}, [roles])

	const handleSaveRow: MRT_TableOptions<Outfit>['onEditingRowSave'] = async ({
		exitEditingMode,
		row,
		values,
	  }) => {
		delete values.role

		const changed: Record<string, string> = {}
		Object.entries(values).forEach(([key, value]) => {
			if (value !== row.original[key as keyof Outfit]) changed[key] = value
		})

		exitEditingMode()
		if (Object.keys(changed).length === 0) return 

		const result = await fetchNui('changeOutfit', {role: row.original.role, outfits: changed}) as ReturnProps
		notifications.show({
			message: result.message,
			color: result.status,
		})
	};

	const columns = useMemo<MRT_ColumnDef<Outfit>[]>(
		() => [
			{
				header: t('role'),
				accessorFn: row => roles.find(role => role.name === row.role)?.label,
				id: 'role',
				enableEditing: false,
				sortingFn: (a, b) => {
					const roleA = roles.find(role => role.name === a.original.role) as Role
					const roleB = roles.find(role => role.name === b.original.role) as Role
					return roleA.grade - roleB.grade
				},
			},
			{
				header: t('man'),
				accessorKey: 'male',
				enableSorting: false,
			},
			{
				header: t('woman'),
				accessorKey: 'female',
				enableSorting: false,
			},
		],
		[]
	)

	const table = useMantineReactTable({
		columns,
		data,
		localization,
		enableColumnOrdering: false,
		enableGlobalFilter: false,
		enableSorting: true,
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		enableGrouping: false,
  		enableColumnDragging: false,
		initialState:{
			density: 'xs',
			sorting: [{ id: 'role', desc: true}],
		},
		enableEditing: true,
		editDisplayMode: 'row',
		onEditingRowSave: handleSaveRow,
		onEditingRowCancel: ({ row }) => {
			row._valuesCache.female = row.original.female
			row._valuesCache.male = row.original.male
		},
		displayColumnDefOptions: {
			'mrt-row-actions': {
			  header: t('edit'),
			}
		},
		mantineTableContainerProps: {
			style: {
				height: 'calc(100vh - 45vh)',
			},
		},
		enablePagination: false,
		enableBottomToolbar: false,
		enableStickyHeader: true,
	})

	return <MantineReactTable table={table} />
}

export default Outfits
