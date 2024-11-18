import { Route, Routes } from 'react-router-dom'
import { AppShell, Box, createStyles, Transition } from '@mantine/core'
import { useNuiEvent } from '../../hooks/useNuiEvent'
import { debugData } from '../../utils/debugData'
import type React from 'react'
import Nav from './components/Nav'
import HeaderGroup from './components/HeaderGroup'
import Home from './views/home'
import { useVisibility } from '../../providers/VisibilityProvider'
import Employees from './views/employees'
import Products from './views/products'
import Hire from './views/hire'
import Logs from './views/logs'
import Permissions from './views/permissions'
import Outfits from './views/outfits'
import { mockOpenData } from '../../dev/open'
import type { Employee, I_Purchases, I_Stock, OpenData, PermissionObject, Product, Role } from '../../typings'
import { useSetRoles, useSetMyRoleName } from '../../atoms/grades'
import { useSetEmployee } from '../../atoms/employees'
import { useSetProducts } from '../../atoms/products'
import { useSetSociety } from '../../atoms/society'
import { useSetDev, useSetPermissions } from '../../atoms/permissions'
import { useSetPurchases } from '../../atoms/purchases'
import { useSetStock } from '../../atoms/stock'
import { ErrorBoundary } from "react-error-boundary";
import { fetchNui } from '../../utils/fetchNui'

const useStyles = createStyles(theme => ({
	wrapper: {
		width: '80vw',
		color: theme.colors.dark[1],
	},
}))

debugData([
	{
		action: 'setVisible',
		data: true,
	},
	{
		action: 'setSocietyData',
		data: mockOpenData,
	},
])

const Menu: React.FC = () => {
	const visibilityProvider = useVisibility()
	const { classes } = useStyles()

	const setProducts = useSetProducts()
	const setEmployees = useSetEmployee()
	const setRoles = useSetRoles()
	const setMyNameRole = useSetMyRoleName()
	const setSociety = useSetSociety()
	const setPermissions = useSetPermissions()
	const setPurchases = useSetPurchases()
	const setStock = useSetStock()
	const setDev = useSetDev()

	useNuiEvent('setSocietyData', ({ products, employees, roles, myRole, funds, name, label, permissions, purchases, stock, dev }: OpenData) => {
		setMyNameRole(myRole)
		setProducts(products)
		setEmployees(employees)
		setRoles(roles)
		setSociety({ name, label, funds })
		setPermissions(permissions)
		setPurchases(purchases)
		setStock(stock)
		setDev(dev)
	})

	useNuiEvent('setMyRole', (role: string) => {
		setMyNameRole(role)
	})

	useNuiEvent('setRoles', (roles: Role[]) => {
		setRoles(roles)
	})

	useNuiEvent('addEmployee', (employee: Employee) => {
		setEmployees(prev => [...prev, employee])
	})

	useNuiEvent('removeEmployee', (citizenid: string) => {
		setEmployees(prev => prev.filter(employee => employee.citizenid !== citizenid))
	})

	useNuiEvent('updateEmployee', ({citizenid, data}: {citizenid: string, data: Partial<Employee>}) => {
		setEmployees(prev => prev.map(prevEmployee => prevEmployee.citizenid === citizenid ? {...prevEmployee, ...data} : prevEmployee))
	})

	useNuiEvent('updateProduct', (product: Product) => {
		setProducts(prev => prev.map(prevProduct => prevProduct.name === product.name ? product : prevProduct))
	})

	useNuiEvent('updateFunds', (funds: number) => {
		setSociety(prev => ({...prev, funds}))
	})

	useNuiEvent('updateRolePermissions', ({role, permissions}: {role: string, permissions: string[]}) => {
		setRoles(prev => prev.map(prevRole => prevRole.name === role ? {...prevRole, permissions} : prevRole))
	})

	useNuiEvent('updateRoleOutfits', ({role, outfits}) => {
		setRoles(prev => prev.map(prevRole => prevRole.name === role ? {...prevRole, outfits} : prevRole))
	})

	useNuiEvent('setPermissions', (permissions: PermissionObject) => {
		setPermissions(permissions)
	})

	useNuiEvent('updatePurchase', (purchase: I_Purchases) => {
		setPurchases(prev => prev.map(prevPurchase => prevPurchase.name === purchase.name ? purchase : prevPurchase))
	})

	useNuiEvent('updateStock', (amount: number) => {
		setStock(prev => prev.map(prevStock => prevStock.amount === amount ? {...prevStock, amount} : prevStock))
	})

	return (
		<ErrorBoundary
			FallbackComponent={({ error }) => {
				return (
					<div role='alert'>
						<p>Something went wrong:</p>
						<pre>{error.message}</pre>
					</div>
				)
			}}
			onError={(error, info) => {
				fetchNui('logError', { error, info })
			}}
		>
			<Transition duration={100} transition='slide-right' mounted={visibilityProvider.visible}>
				{style => (
					<Box className={classes.wrapper}>
						<AppShell padding='md' fixed={false} navbar={<Nav />} header={<HeaderGroup />}>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/employees' element={<Employees />} />
								<Route path='/products' element={<Products />} />
								<Route path='/hire' element={<Hire />} />
								<Route path='/permissions' element={<Permissions />} />
								<Route path='/outfits' element={<Outfits />} />
								<Route path='/logs' element={<Logs />} />
							</Routes>
						</AppShell>
					</Box>
				)}
			</Transition>
		</ErrorBoundary>
	)
}

export default Menu
