import { Image, Text, Button, Select, Stack, NumberInput, Menu, Loader, Group, Tooltip, ScrollArea, Tabs, Overlay, Box, AspectRatio, Container, Divider } from '@mantine/core'
import { modals } from '@mantine/modals'
import { employeesAtom, useEmployeeState } from '../../../../atoms/employees'
import { ActiveStatus, type Employee, type ReturnProps, type Role } from '../../../../typings'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { rolesAtom, myRoleAtom, useMyRole, useRoles } from '../../../../atoms/grades'
import { fetchNui } from '../../../../utils/fetchNui'
import ReactTimeAgo from 'react-time-ago'
import { notifications } from '@mantine/notifications'
import { type MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { useNuiEvent } from '../../../../hooks/useNuiEvent'
import { hasPermission } from '../../../../utils/hasPermission'
import { societyAtom, useSociety } from '../../../../atoms/society'
import { devAtom, useDev } from '../../../../atoms/permissions'
import { setClipboard } from '../../../../utils/setClipboard'
import { useTranslation, Trans } from 'react-i18next'
import { IconChartBar, IconCircle, IconClockOff, IconColumns, IconDownload, IconMessageCircle, IconPhoto, IconRotate2, IconTelescope, IconUserDollar, IconUserEdit, IconUserX } from '@tabler/icons-react'
import { useLocalization } from '../../../../providers/LocalizationProvider'
import { isEnvBrowser } from '../../../../utils/misc'
import prettyMilliseconds from 'pretty-ms'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts'
import TopCharts from './TopCharts'

const activeColors = {
	[ActiveStatus.OFF_DUTY]: 'red',
	[ActiveStatus.ON_DUTY_OFFLINE]: 'yellow',
	[ActiveStatus.ON_DUTY]: 'green',
}

interface Inspect {
	lastSeen: number
	lastCompleted: number
	lastDuty: number
	amount: number
	lastReset: number
	dutyTime: number
}

const inspectMockData = {
	lastSeen: 1355972400000,
	lastCompleted: 1355972400000,
	lastDuty: 1355972400000,
	lastReset: 1355972400000,
	dutyTime: 604472,
	amount: 72,
}

const Inspect: React.FC<{citizenid: string, role: string, canReset: boolean}> = ({citizenid, role, canReset}) => {
	const [inspect, setInspect] = useState<Inspect>(inspectMockData)
	const [loading, setLoading] = useState(true)
	const [resetting, setResetting] = useState(false)
	const { i18n, t } = useTranslation()
	
	useEffect(() => {
		const fetchData = async () => {
			const returnData = (await fetchNui('statistics', { citizenid, role }, { data: inspectMockData, delay: 500})) as ReturnProps | Inspect
			if ('status' in returnData) {
				return notifications.show({
					message: returnData.message,
					color: returnData.status,
				})
			}

			setInspect(returnData)
			setLoading(false)
		}
		fetchData()
	}, [citizenid, role])

	if (loading) {
		return (
			<Stack m='xl' justify='center'>
				<Group position='center'>
					<Loader variant="dots" />
				</Group>
			</Stack>
		)
	}

	const resetEmployee = async () => {
		setResetting(true)
		const result = await fetchNui('resetEmployee', {citizenid}) as ReturnProps
		notifications.show({
			message: result.message,
			color: result.status,
		})
		setResetting(false)
		modals.closeAll()
	}

	return (
		<Stack justify='center'>
			<Text mt='xs' ta='center'>
				<Trans
					i18nKey='lastSeen'
					components={{timeAgo: <ReactTimeAgo date={inspect.lastSeen} locale={i18n.language} />}}
				/>
			</Text>
			<Text mt='xs' ta='center'>
				<Trans
					i18nKey='lastJobCompleted'
					components={{timeAgo: <ReactTimeAgo date={inspect.lastCompleted} locale={i18n.language} />}}
				/>
			</Text>
			<Text mt='xs' ta='center'>
				<Trans
					i18nKey='On duty'
					components={{timeAgo: <ReactTimeAgo date={inspect.lastDuty} locale={i18n.language} />}}
				/>
			</Text>
			<Text mt='xs' ta='center'>
				{t('routesCompleted', {amount: inspect.amount})}
			</Text>
			<Text mt='xs' ta='center'>
				{t('dutyTime', {amount: prettyMilliseconds(inspect.dutyTime * 1000)})}
			</Text>
			<Text mt='xs' ta='center'>
			<Trans
					i18nKey='Last reset'
					components={{timeAgo: <ReactTimeAgo date={inspect.lastReset} locale={i18n.language} />}}
				/>
			</Text>
			{canReset && (
				<Group position='right'>
					<Button
						onClick={resetEmployee}
						loading ={resetting}
						rightIcon={<IconRotate2 size="1rem" />}
					>	
						{t('reset employee')}
					</Button>
				</Group>
			)}
		</Stack>
	)
}

const TextToCopy: React.FC<{text: string}> = ({text}) => {
	const [copied, setCopied] = useState(false)
	const {t} = useTranslation()

	const styles = {
		'&:hover': {
            cursor: 'copy',
		},
	}

	const copy = () => {
		setClipboard(text)
		setCopied(true)
	}

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => {
				setCopied(false)
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [copied])

	return (
		<Tooltip
			color={copied ? 'green' : undefined}
			label={copied ? t('copied') : t('clickCopy')}
			withinPortal
		>
			<Text
				sx={styles}
				onClick={copy}
			>
				{text}
			</Text>
		</Tooltip>)
}

const Employees: React.FC = () => {
	const [exporting, setExporting] = useState(false)
	const [employees, setEmployees] = useEmployeeState()
	const myRole = useMyRole()
	const roles = useRoles()
	const society = useSociety()
	const dev = useDev()
	const {t} = useTranslation()
	const canReset = dev || useMemo(() => hasPermission(myRole, 'reset'), [myRole])

	const { localization } = useLocalization()

	useNuiEvent('setEmployees', (data: Employee[]) => {
		setEmployees(data)
	})

	const canClockOut = dev || useMemo(() => hasPermission(myRole, 'clock-out'), [myRole])
	const canPayBonus = dev || useMemo(() => hasPermission(myRole, 'bonus'), [myRole])
	const canEditEmployees = dev || useMemo(() => hasPermission(myRole, 'employees'), [myRole])
	const csvExport = async () => {
		setExporting(true)
		const result = await fetchNui('exportStatistics')
		if (!isEnvBrowser()) {
			(window as any).invokeNative('openUrl', result.link)
		} else {
			window.open(result.link)
		}
		setExporting(false)
		notifications.show({
			message: result.message,
			color: result.status,
		})
	}

	const selectJobs = useMemo(() => {
		const validRoles = []
		const isOwner = myRole?.name === 'owner'

		for (let i = roles.length - 1; i >= 0; i--) {
			if (isOwner || roles[i].grade < (myRole as Role).grade) {
				validRoles.push({ value: roles[i].name, label: roles[i].label })
			}
		}

		return validRoles
	}, [roles, myRole])

	const clockOut = async (name: string, citizenid: string) => {
		const result = await fetchNui('clockOut', { citizenid}) as ReturnProps
		notifications.show({
			message: result.message,
			color: result.status,
		})
	}

	const payBonus = (name: string, citizenid: string) => {
		let bonus = 100

		modals.openConfirmModal({
			title: name,
			centered: true,
			children: (
				<NumberInput
					defaultValue={bonus}
					placeholder={t('funds')}
					label={t('bonusLabel')}
					min={1}
					max={society.funds}
					precision={0}
					onChange={(value: number) => {
						bonus = value
					}}
				/>
			),
			labels: { confirm: t('pay'), cancel: t('cancel') },
			onConfirm: async () => {
				if (bonus > society.funds) return notifications.show({
					title: t('error'),
					message: t('noFunds'),
					color: 'red',
				})
				const result = await fetchNui('payBonus', { citizenid, bonus})
				notifications.show({
					message: result.message,
					color: result.status,
				})
			},
		})
	}

	const promote = (name: string, citizenid: string, role: string) => {

		let newRole = role

		modals.open({
			id: 'promote',
			title: name,
			centered: true,
			children: (
				<>
					<Select
						withinPortal
						label={t('selectNewRole')}
						dropdownPosition='bottom'
						placeholder={t('pickOne')}
						mt='md'
						defaultValue={newRole}
						data={selectJobs}
						onChange={(value: string) => {
							newRole = value
						}}
						withAsterisk
					/>
					<Button
						fullWidth
						onClick={async (event: React.MouseEvent) => {
							event.preventDefault()
							modals.closeAll()

							if (role !== newRole) {
								const result = await fetchNui('promote', { citizenid, role: newRole })
								notifications.show({
									message: result.message,
									color: result.status,
								})
							}
						}}
						mt='md'
					>
						{t('save')}
					</Button>
				</>
			),
		})
	}

	const statistics = async (name: string, citizenid: string, role: string) => {
		modals.open({
			title: t('employeeStats', {name}),
			centered: true,
			children: (
				<Inspect citizenid={citizenid} role={role} canReset={canReset} />
			),
		})
	}

	const fire = (name: string, citizenid: string) => {
		modals.openConfirmModal({
			title: name,
			centered: true,
			children: <Text size='sm'>{t('fireConfirm')}</Text>,
			labels: { confirm: t('fire'), cancel: t('cancel') },
			confirmProps: { color: 'red' },
			onConfirm: async () => {
				const result = await fetchNui('fire', {citizenid}) as ReturnProps
				notifications.show({
					message: result.message,
					color: result.status,
				})
			},
		})
	}

	const resetStats = async () => {
		modals.openConfirmModal({
			title: t('Reset Stats'),
			centered: true,
			children: <Text size='sm' mt="md">{t('resetStatsConfirm')}</Text>,
			labels: { confirm: t('reset'), cancel: t('cancel') },
			confirmProps: { color: 'red' },
			onConfirm: async () => {
				const result = await fetchNui('resetStats') as ReturnProps
				notifications.show({
					message: result.message,
					color: result.status,
				})
			},
		})
	}

	const columns = useMemo<MRT_ColumnDef<Employee>[]>(
		() => [
			{
				header: t('status'),
				accessorKey: 'active',
				Cell: ({ cell }) => <IconCircle color={activeColors[cell.getValue<ActiveStatus>()]} />,
			},
			{
				header: t('name'),
				accessorKey: 'name',
				enableGrouping: false,
			},
			{
				header: t('role'),
				accessorFn: employee => roles.find(role => role.name === employee.role)?.label || 'Unknown',
				id: 'role',
				sortingFn: (a, b) => {
					const roleA = roles.find(role => role.name === a.original.role) as Role
					const roleB = roles.find(role => role.name === b.original.role) as Role
					return roleA.grade - roleB.grade
				},
			},
			{
				header: t('phone'),
				accessorKey: 'phone',
				enableGrouping: false,
				enableSorting: false,
				enableColumnFilter: false,
				Cell: ({cell}) => <TextToCopy text={cell.getValue<string>()}/>
			},
			{
				header: t('iban'),
				accessorKey: 'iban',
				enableGrouping: false,
				enableSorting: false,
				enableColumnFilter: false,
				Cell: ({cell}) => <TextToCopy text={cell.getValue<string>()}/>
			},
			{
				header: t('ssn'),
				accessorKey: 'citizenid',
				enableGrouping: false,
				enableSorting: false,
				enableColumnFilter: false,
				Cell: ({cell}) => <TextToCopy text={cell.getValue<string>()}/>
			},
		],
		[]
	)

	const table = useMantineReactTable({
		columns,
		data: employees,
		enableColumnDragging: false,
		enableColumnOrdering: false,
		enableGlobalFilter: true, //turn off a feature
		enableRowActions: true,
		enableGrouping: true,
        enableDensityToggle: false,
		enableFullScreenToggle: false,
		initialState:{ density: 'xs', sorting: [{ id: 'active', desc: true }] },
		localization,
		renderTopToolbarCustomActions: ({table}) => (
			<Group position='left'>
				{canReset && (<Button onClick={resetStats}>{t('Reset Stats')}</Button>)}
				<Button
					onClick={csvExport}
					loading ={exporting}
					rightIcon={<IconDownload size="1rem" />}
					color='green'
				>	
					Export to CSV
				</Button>
			</Group>
		),
		renderRowActionMenuItems: ({ row }) => {
			const role = roles.find((role) => role.name === row.original.role) as Role
			const isHigher = dev || myRole.grade > role.grade
			const employee = employees.find(employee => employee.phone === row.original.phone) as Employee

			return (
				<>
					<Menu.Item icon={<IconTelescope />} onClick={() => statistics(employee.name, employee.citizenid, employee.role)}>
						{t('statistics')}
					</Menu.Item>
					{isHigher && (
						<>
							{(row.original.active !== ActiveStatus.OFF_DUTY && canClockOut) && (
								<Menu.Item icon={<IconClockOff />} onClick={() => clockOut(employee.name, employee.citizenid)}>
									{t('clockOut')}
								</Menu.Item>
							)}
							{canPayBonus && (
								<Menu.Item icon={<IconUserDollar />} onClick={() => payBonus(employee.name, employee.citizenid)}>
									{t('payBonus')}
								</Menu.Item>
							)}
							{canEditEmployees && (
								<>
									<Menu.Item icon={<IconUserEdit />} onClick={() => promote(employee.name, employee.citizenid, employee.role)}>
										{t('changeRole')}
									</Menu.Item>
									<Menu.Item color='red' icon={<IconUserX />} onClick={() => fire(employee.name, employee.citizenid)}>
										{t('fire')}
									</Menu.Item>
								</>
							)}
						</>
					)}
				</>
			)
		},
		renderBottomToolbar: ({ table }) => (
			<Group align='left' m="md">
				<Tooltip label={"On Duty"}>
					<IconCircle color='green' />
				</Tooltip>
				<Tooltip label={"On duty offline"}>
					<IconCircle color='yellow' />
				</Tooltip>
				<Tooltip label={"Off Duty"}>
					<IconCircle color='red' />
				</Tooltip>
			</Group>
		),
		mantineTableContainerProps: {
			style: {
				height: 'calc(100vh - 45vh)',
			},
		},
		enablePagination: false,
		enableBottomToolbar: true,
		enableStickyHeader: true,
	})

	return (
		<Tabs defaultValue='table'>
			<Tabs.List>
				<Tabs.Tab value='table' icon={<IconColumns size='0.8rem' />}>
					Table
				</Tabs.Tab>
				<Tabs.Tab value='chart' icon={<IconChartBar size='0.8rem' />}>
					Charts
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value='table' pt='xs'>
				<MantineReactTable table={table} />
			</Tabs.Panel>

			<Tabs.Panel value='chart' pt='xs'>
				<TopCharts />
			</Tabs.Panel>
		</Tabs>
	)
}

export default Employees
