import { productsAtom, useProducts } from '../../../../atoms/products'
import { fetchNui } from '../../../../utils/fetchNui'
import React, { useMemo } from 'react'
import { MRT_ColumnDef, MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { Product, ReturnProps } from '../../../../typings'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@mantine/core'
import { purchasesAtom, usePurchases } from '../../../../atoms/purchases'
import { useLocalization } from '../../../../providers/LocalizationProvider'
import { stockAtom, useStock } from '../../../../atoms/stock'
import Purchases from './purchases'
import Stock from './stock'

const ProductsTable: React.FC = () => {
	const { t } = useTranslation()
	const products = useProducts()
	
	const { localization } = useLocalization()

	const handleSaveRow: MRT_TableOptions<Product>['onEditingRowSave'] = async ({
		exitEditingMode,
		row,
		values,
	  }) => {
		const price = Number(values.price)
		row._valuesCache.price = row.original.price
		exitEditingMode()	
		
		const productData = products.find(product => product.name === row.original.name) as Product
		if (price >= productData.min) {
			const result = await fetchNui('updateProduct', {name: row.original.name, price: price}) as ReturnProps
			notifications.show({
				message: result.message,
				color: result.status,
			})
		} else {
			notifications.show({
				message: t('editPriceMin', { amount: productData.min }),
				color: 'red',
			})
		}	
	};

	const columns = useMemo<MRT_ColumnDef<Product>[]>(
		() => [
			{
				header: t('product'),
				accessorFn: row => products.find(product => product.name === row.name)?.label,
				enableEditing: false,
				id: 'name',
			},
			{
				header: t('price'),
				accessorKey: 'price',
				Cell: ({ cell }) => `$ ${cell.getValue<number>().toFixed(0)}`,
				mantineEditTextInputProps: {
					type: 'number',
					min: 0,
					required: true,
				},
			},
		],
		[]
	)

	const table = useMantineReactTable({
		columns,
		data: products,
		localization,
		enableColumnOrdering: false,
		enableGlobalFilter: true,
		enableSorting: true,
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		initialState:{
			density: 'xs',
			sorting: [{ id: 'name', desc: false }],
		},
		enableEditing: true,
		editDisplayMode: 'row',
		onEditingRowSave: handleSaveRow,
		onEditingRowCancel: ({ row }) => {
			row._valuesCache.price = row.original.price
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

const Products: React.FC = () => {

	const products = useProducts()
	const purchases = usePurchases()
	const stock = useStock()

	const { t } = useTranslation()

	const defaultValue = useMemo(() => products.length !== 0 ? 'sell' : purchases.length !== 0 ? 'buy' : 'stock', [])

	return (
		<Tabs defaultValue={defaultValue}>
			<Tabs.List>
				{products.length !== 0 && <Tabs.Tab value="sell" >{t('sell')}</Tabs.Tab>}
				{purchases.length !== 0 && <Tabs.Tab value="buy" >{t('buy')}</Tabs.Tab>}
				{stock.length !== 0 && <Tabs.Tab value="stock" >{t('stock')}</Tabs.Tab>}
			</Tabs.List>
			<Tabs.Panel value="sell" pt="xs">
				<ProductsTable />
			</Tabs.Panel>

			<Tabs.Panel value="buy" pt="xs">
				<Purchases />
			</Tabs.Panel>

			<Tabs.Panel value="stock" pt="xs">
				<Stock />
			</Tabs.Panel>
		</Tabs>
	)
}

export default Products
