import { Navbar, Stack } from '@mantine/core'
import NavIcon from './NavIcon'
import { hasPermission } from '../../../utils/hasPermission'
import { useMemo } from 'react'
import { useMyRole } from '../../../atoms/grades'
import { useTranslation } from 'react-i18next'
import { IconFileSearch, IconHome, IconPackage, IconSettings, IconShirt, IconUserPlus, IconUsersGroup } from '@tabler/icons-react'
import { useProducts } from '../../../atoms/products'
import { usePurchases } from '../../../atoms/purchases'
import { useStock } from '../../../atoms/stock'

const Nav: React.FC = () => {
	const myRole = useMyRole()
	const canHire = useMemo(() => hasPermission(myRole, 'hire'), [myRole])
	const canSeeEmployees = useMemo(
		() => hasPermission(myRole, 'clock-out') || hasPermission(myRole, 'bonus') || hasPermission(myRole, 'employees'),
		[myRole]
	)
	console.log("Venho aqui 2")
	const productsAtomLength = useProducts().length
	console.log(productsAtomLength)
	const purchasesAtomLength = usePurchases().length
	console.log(purchasesAtomLength)
	const stockAtomLength = useStock().length
	console.log(stockAtomLength)
	const hasProducts = productsAtomLength > 0 || purchasesAtomLength > 0 || stockAtomLength > 0
	console.log("Sobrevivi?")
	const canSeeOutfits = useMemo(() => hasPermission(myRole, 'outfits'), [myRole])
	const canSeePermissions = useMemo(() => hasPermission(myRole, 'permissions'), [myRole])
	const canSeeProducts = useMemo(() => hasPermission(myRole, 'products'), [myRole]) && hasProducts
	const canSeeLogs = useMemo(() => hasPermission(myRole, 'logs'), [myRole])

	const { t } = useTranslation()

	return (
		<Navbar
			width={{ base: 80 }}
			p='md'
			fixed={false}
			sx={{
				height: 1500,
				'@media (max-height: 1440px)': {
					height: 1000,
				},
				'@media (max-height: 1280px)': {
					height: 775,
				},
				'@media (max-height: 720px)': {
					height: 500,
				},
			}}
		>
			<Navbar.Section grow>
				<Stack justify='center' spacing={5}>
					<NavIcon color='blue.4' tooltip={t('home')} Icon={IconHome} to='/' />
					{canSeeEmployees && <NavIcon color='blue.4' tooltip={t('employees')} Icon={IconUsersGroup} to='/employees' />}
					{canSeeProducts && <NavIcon color='blue.4' tooltip={t('products')} Icon={IconPackage} to='/products' />}
					{canHire && <NavIcon color='blue.4' tooltip={t('hire')} Icon={IconUserPlus} to='/hire' />}
					{canSeeOutfits && <NavIcon color='blue.4' tooltip={t('outfits')} Icon={IconShirt} to='/outfits' />}
					{canSeePermissions && <NavIcon color='blue.4' tooltip={t('permissions')} Icon={IconSettings} to='/permissions' />}
					{canSeeLogs && <NavIcon color='blue.4' tooltip={t('logs')} Icon={IconFileSearch} to='/logs' />}
				</Stack>
			</Navbar.Section>
		</Navbar>
	)
}

export default Nav
