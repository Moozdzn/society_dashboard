import { Button, NumberInput, TextInput, Menu, Group, Divider } from '@mantine/core'
import { rolesAtom, myRoleAtom, useRoles, useMyRole } from '../../../../atoms/grades'
import { type MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import { ReturnProps, Role } from '../../../../typings'
import { hasPermission } from '../../../../utils/hasPermission'
import { fetchNui } from '../../../../utils/fetchNui'
import { employeesAtom, useEmployee } from '../../../../atoms/employees'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'
import { useTranslation } from 'react-i18next'
import { IconArrowDown, IconArrowUp, IconEdit, IconQuestionMark, IconTrash } from '@tabler/icons-react'
import Overview from '../../components/Overview'
import { useLocalization } from '../../../../providers/LocalizationProvider'

const ModalInputs: React.FC<{role: Partial<Role>, handleSubmit: () => void}> = ({role, handleSubmit}) => {
	const [label, setLabel] = useState(role.label || '')
	const [salary, setSalary] = useState(role.salary || 0)
	const [percentage, setPercentage] = useState(role.percentage || 0)

	const invalidLabel = label.length < 4

	return (
		<>
			<TextInput
				label='Role name'
				placeholder='Worker'
				mt='md'
				value={label}
				onChange={value => setLabel(value.currentTarget.value)}
				error={invalidLabel && 'Name must have at least 4 letters'}
			/>
			<NumberInput
				label='Salary ($)'
				min={0}
				mt='md'
				value={salary}
				onChange={value => setSalary(value === '' ? 0 : value)}
			/>
			<NumberInput
				label='Percentage (%)'
				mt='md'
				min={0}
				precision={2}
				step={0.01}
				max={1}
				value={percentage}
				onChange={value => setPercentage(value === '' ? 0 : value)}
			/>
			<Group position='right'>
				<Button
					type='submit'
					color='blue'
					mt='md'
					disabled={invalidLabel}
					onClick={() => {
						role.label = label
						role.salary = salary
						role.percentage = percentage
						handleSubmit()
					}}
				>
					Submit
				</Button>
			</Group>
		</>
	)
}

const Home: React.FC = () => {
	const roles = useRoles()
	const [editing, setEditing] = useState(false)
	const [roleChanges, setRoleChanges] = useState<Role[]>(roles)
	const myRole = useMyRole()
	const employees = useEmployee()

	const { t } = useTranslation()
	const { localization } = useLocalization()

	const canEditRoles = useMemo(() => hasPermission(myRole, 'roles'), [myRole])

	useEffect(() => {
		if (editing) {
			notifications.show({
				title: t('warning'),
				message: t('rolesWarning'),
				color: 'yellow',
			})
		} else {
			setRoleChanges(roles)
		}
	}, [roles])

	const newRole = () => {
		const role: Partial<Role> = {
			name: 'worker',
			label: t('Worker'),
			salary: 0,
			percentage: 0,
		}

		modals.open({
			title: t('createRole'),
			centered: true,
			children: (
				<ModalInputs
					role={role}
					handleSubmit={async () => {
						if (!role.label) return

						role.name = role.name = (role.label as string)
							.toLowerCase()
							.replace(/[^a-z0-9]+/g, '_')
							.replace(/^_+|_+$/g, '')
						
						let i = 1
						let newName = role.name
						while (roles.find(role => role.name === newName)) {
							newName = `${role.name}_${i}`
							i++
						}
						role.name = newName
						modals.closeAll()
						
						const result = await fetchNui('createRole', role) as ReturnProps
						notifications.show({
							message: result.message,
							color: result.status,
						})
					}}
				/>
			),
		})
	}

	const editRole = (name: string) => {
		const role = roles.find(role => role.name === name)
		if (!role) return

		const initialValues: Partial<Role> = {
			name: role.name,
			label: role.label,
			salary: role.salary,
			percentage: role.percentage,
		}

		modals.open({
			title: t('editRole'),
			centered: true,
			children: (
				<ModalInputs
					role={initialValues}
					handleSubmit={async () => {
						if (!initialValues.label) return
						modals.closeAll()

						if (initialValues.label === role.label) delete initialValues.label
						if (initialValues.salary === role.salary) delete initialValues.salary
						if (initialValues.percentage === role.percentage) delete initialValues.percentage

						const result = await fetchNui('updateRole', initialValues) as ReturnProps
						notifications.show({
							message: result.message,
							color: result.status,
						})
					}}
				/>
			),
		})
	}

	const deleteRole = async (name: string) => {
		const employeeWithRole = employees.find(employee => employee.role === name)
		if (employeeWithRole)
			return notifications.show({
				title: t('error'),
				message: t('roleHasEmployee'),
				color: 'red',
			})
		const result = await fetchNui('deleteRole', name) as ReturnProps
		notifications.show({
			message: result.message,
			color: result.status,
		})
	}

	const moveRole = (name: string, direction: 'up' | 'down') => {
		const index = roleChanges.findIndex(role => role.name === name)
		if (index === -1) return

		setEditing(true)

		let newList = [...roleChanges]
		const item = newList.splice(index, 1)[0]
		newList.splice(direction === 'up' ? index + 1 : index - 1, 0, item)
		newList = newList.map((role, index) => {
			const newRole = { ...role }
			newRole.grade = index + 1
			return newRole
		})
		setRoleChanges(newList)
	}

	const columns = useMemo<MRT_ColumnDef<Role>[]>(
		() => [
			{
				header: t('level'),
				accessorKey: 'grade',
			},
			{
				header: t('roles'),
				accessorKey: 'label',
			},
			{
				header: t('salary'),
				accessorKey: 'salary',
				Cell: ({ cell }) => (canEditRoles ? `$ ${cell.getValue<number>().toFixed(0)}` : t('na')),
			},
			{
				header: t('percentage'),
				accessorKey: 'percentage',
				Cell: ({ cell }) => (canEditRoles ? `${cell.getValue<number>() * 100}%` : t('na')),
			},
		],
		[]
	)

	const table = useMantineReactTable({
		columns,
		data: editing && roleChanges || roles,
		localization,
		enableColumnOrdering: false,
		enableGlobalFilter: true, //turn off a feature
		enableRowActions: canEditRoles,
		enableSorting: true,
		initialState: {
			density: 'xs',
			sorting: [{ id: 'grade', desc: true }],
		},
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		renderTopToolbarCustomActions(props) {
			return (<Group position='left'>
				{canEditRoles && <Button onClick={newRole}>{t('newRole')}</Button>}
			</Group>)
		},
		renderBottomToolbarCustomActions(props) {
			return <Group position='right'>
				{editing && <>
					<Button color='green' onClick={ async () => {
						const newHierarchy = []
						for (let i = 1; i < myRole.grade; i++) {
							const role = roleChanges.find(role => role.grade === i)
							if (!role) continue
							newHierarchy.push(role.name)
						}
						setEditing(false)
						const result = await fetchNui('updateHierarchy', newHierarchy) as ReturnProps
						notifications.show({
							message: result.message,
							color: result.status,
						})
					}}>{t('save')}</Button>
					<Button 
						color='red' 
						onClick={() => {
							setEditing(false)
							setRoleChanges(roles)
						}
					}>{t('discard')}</Button>
				</>}
			</Group>
		},
		renderRowActionMenuItems: ({ row }) => {
			if (!canEditRoles) return (
				<Menu.Item disabled icon={<IconQuestionMark />}>
					{t('nothingHere')}
				</Menu.Item>)
			const role = row.original
			const isHigherGrade = role.grade >= myRole.grade
			const isOwner = role.name === 'owner'

			const disableEdit = isHigherGrade && !isOwner
			const disableDelete = isOwner || isHigherGrade
			const disableMoveUp = isHigherGrade || role.grade === roles.length || role.grade + 1 === myRole.grade
			const disableMoveDown = isHigherGrade || role.grade === 1 || role.grade - 1 === myRole.grade

			return (<>
				<Menu.Item disabled={disableMoveUp} icon={<IconArrowUp />} onClick={() => moveRole(row.original.name, 'up')}>
					{t('moveUp')}
				</Menu.Item>
				<Menu.Item disabled={disableMoveDown} icon={<IconArrowDown />} onClick={() => moveRole(row.original.name, 'down')}>
					{t('moveDown')}
				</Menu.Item>
				<Menu.Item disabled={disableEdit} icon={<IconEdit />} onClick={() => editRole(row.original.name)}>
					{t('changeRole')}
				</Menu.Item>
				<Menu.Item disabled={disableDelete} color='red' icon={<IconTrash />} onClick={() => deleteRole(row.original.name)}>
					{t('delete')}
				</Menu.Item>
			</>)
		},
		mantineTableContainerProps: {
			style: {
				height: 'calc(100vh - 60vh)',
			},
		},
		enablePagination: false,
		enableStickyHeader: true,
	})

	return <>
		<Overview />
		<Divider my='lg' labelPosition='center'/>
		<MantineReactTable table={table} />
	</>
}

export default Home
