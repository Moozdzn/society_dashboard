import { Checkbox, Stack, Table, Tabs, Tooltip, Text, Box, Divider, Menu, ActionIcon, Collapse, TextInput, Button, Portal, Group } from '@mantine/core'
import { rolesAtom, myRoleAtom, useRoles, useMyRole } from '../../../../atoms/grades'
import { fetchNui } from '../../../../utils/fetchNui'
import { defaultPermissionsAtom, jobPermissionsAtom, vehiclePermissionsAtom, weaponPermissionsAtom, devPermissionsAtom, useDefaultPermissions, useJobPermissions, useVehiclePermissions, useWeaponPermissions } from '../../../../atoms/permissions'
import { Permission, ReturnProps } from '../../../../typings'
import { useMemo, useState } from 'react'
import { MRT_Cell, MRT_Column, MRT_ColumnDef, MRT_DefinedColumnDef, MRT_TableBody, MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { societyAtom, useSociety } from '../../../../atoms/society'
import { IconCar, IconCheck, IconClipboard, IconColumns, IconSearch, IconSearchOff, IconSword, IconX } from '@tabler/icons-react'
import { useLocalization } from '../../../../providers/LocalizationProvider'

interface Column {
	role: string
	[key: string]: boolean | string
}

const TabContent: React.FC<{permissions: Permission[]}> = ({permissions}) => {
	const roles = useRoles()
	const myRole = useMyRole()
	const [editedRoles, setEditedRoles] = useState<Record<string, boolean>>({})
	const { t } = useTranslation()
	const { localization } = useLocalization()

	const data = useMemo(() => {
		const data: any = []
		roles.slice().reverse().forEach(role => {
			if (role.grade >= myRole.grade) return

			let row: any = {}
			row.role = role.name
			permissions.forEach(permission => {
				row[permission.name] = role.permissions.includes(permission.name) ? true : false
			})
			data.push(row)
		})
		return data
	}, [roles])

	const handleSaveRow: MRT_TableOptions<Column>['onEditingRowSave'] = async ({ row, exitEditingMode}) => {

		if (Object.keys(editedRoles).length === 0) return exitEditingMode()

		const result = await fetchNui('setRolePermissions', {role: row.original.role, permissions: editedRoles}) as ReturnProps
		notifications.show({
			message: result.message,
			color: result.status,
		})

		setEditedRoles({})
		exitEditingMode(); //required to exit editing mode
	};
	
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchOpen, setSearchOpen] = useState<boolean>(false)

	const columns = useMemo<MRT_ColumnDef<Column>[]>(
		() => {
			let columns: any = [
					{
					header: t('role'),
					accessorFn: (row: any) => roles.find(role => role.name === row.role)?.label || 'Unknown',
					id: 'role',
					enableEditing: false,
					enableHiding: false,
				}
			]
			permissions.forEach(permission => {

				if (searchValue && !permission.label.toLowerCase().includes(searchValue.toLowerCase())) return

				columns.push({
					header: permission.label,
					accessorKey: permission.name,
					Cell: ({ cell }: {cell: MRT_Cell<Column>}) => cell.getValue<boolean>() ? <IconCheck color="green"/> : <IconX color='red'/>,
					enableEditing: true,
					Edit: ({cell, column}: { cell: MRT_Cell<Column>, column: any}) => {
						return <Checkbox
							defaultChecked={cell.getValue<boolean>()}
							onChange={(event) => {
								const id = column.id
								const checked = event.currentTarget.checked
								setEditedRoles(prev => ({...prev, [id]: checked}))
							}}
						/>
					},
					description: permission.description,
					Header: ({ column }: {column: MRT_Column<Column>}) => {
						const permission = permissions.find(permission => permission.name === column.columnDef.accessorKey)
						if (permission?.description) {
							return <Tooltip label={permission.description}>
									<Text>{column.columnDef.header}</Text>
								</Tooltip>
						}
						return <Text>{column.columnDef.header}</Text>
					},
				})
			})
			return columns
		},
		[searchValue]
	)

	const table = useMantineReactTable({
		columns,
		data,
		localization,
		enableGlobalFilter: false,
		enableGrouping: false,
        enableDensityToggle: false,
		enableFullScreenToggle: false,
		enablePinning: false,
		enableSorting: false,
		enableHiding: true,
		enableColumnActions: false,
		enableColumnOrdering: false,
		enableColumnFilters: false,
		enableEditing: true,
		editDisplayMode: 'row',
		initialState:{
			density: 'xs',
			columnPinning: {
				left: ['role'],
			}

		},
		onEditingRowSave: handleSaveRow,
		onEditingRowCancel: () => setEditedRoles({}),
		displayColumnDefOptions: {
			'mrt-row-actions': {
			  header: t('edit')
			}
		},
		mantineTableContainerProps: {
			style: {
				height: 'calc(100vh - 50vh)',
				width: 'calc(100vw - 26vw)'
			},
		},
		enableStickyHeader: true,
		renderTopToolbarCustomActions: () => (
			<Group position='right'>
				<ActionIcon onClick={()=> setSearchOpen(!searchOpen)}>{searchOpen ? <IconSearchOff/> : <IconSearch/>}</ActionIcon>
				<Collapse in={searchOpen}>
					<TextInput
						placeholder="Search Columns"
						onChange={(event) => setSearchValue(event.currentTarget.value)}
					/>
				</Collapse>
			</Group>
		),
	})

	return <MantineReactTable table={table}/>
}

const Permissions: React.FC = () => {
	const defaultPermissions = useDefaultPermissions()
	const jobPermissions = useJobPermissions()
	const vehiclePermissions = useVehiclePermissions()
	const weaponPermissions = useWeaponPermissions()
	const society = useSociety()
	
	const { t } = useTranslation()

	return (
		<Box sx={{ width: '100%', marginTop: '1rem' }}>
			<Tabs defaultValue="default">
			<Tabs.List>
				{defaultPermissions.length !== 0 && <Tabs.Tab value="default" >{t('general')}</Tabs.Tab>}
				{jobPermissions.length !== 0 && <Tabs.Tab icon={<IconClipboard/>} value="job" >{society.label}</Tabs.Tab>}
				{weaponPermissions.length !== 0 && <Tabs.Tab icon={<IconSword/>} value="weapons" >{t('weapons')}</Tabs.Tab>}
				{vehiclePermissions.length !== 0 && <Tabs.Tab icon={<IconCar/>}value="vehicles" >{t('vehicles')}</Tabs.Tab>}
			</Tabs.List>
			<Tabs.Panel value="default" pt="xs">
				<TabContent permissions={defaultPermissions} />
			</Tabs.Panel>

			<Tabs.Panel value="job" pt="xs">
				<TabContent permissions={jobPermissions} />
			</Tabs.Panel>

			<Tabs.Panel value="weapons" pt="xs">
				<TabContent permissions={weaponPermissions} />
			</Tabs.Panel>

			<Tabs.Panel value="vehicles" pt="xs">
				<TabContent permissions={vehiclePermissions} />
			</Tabs.Panel>
		</Tabs>
		</Box>
		
	)
}

export default Permissions
