import { notifications } from "@mantine/notifications";
import { MRT_TableOptions, MRT_ColumnDef, useMantineReactTable, MantineReactTable } from "mantine-react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { purchasesAtom, usePurchases } from "../../../../../atoms/purchases";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import { I_Purchases, ReturnProps } from "../../../../../typings";
import { fetchNui } from "../../../../../utils/fetchNui";

const Purchases: React.FC = () => {
	const { t } = useTranslation()
	const purchases = usePurchases()
	
	const { localization } = useLocalization()

	const handleSaveRow: MRT_TableOptions<I_Purchases>['onEditingRowSave'] = async ({
		exitEditingMode,
		row,
		values,
	  }) => {

		delete values.name

		const changed: Record<string, number> = {}
		Object.entries(values).forEach(([key, value]) => {
			if (value !== row.original[key as keyof I_Purchases]) changed[key] = Number(value)
		})

		row._valuesCache.price = row.original.price
		row._valuesCache.max = row.original.max

		exitEditingMode()
		console.log(changed)
		if (Object.keys(changed).length === 0) return 

		const result = await fetchNui('updatePurchase', {name: row.original.name, ...changed}) as ReturnProps
		notifications.show({
			message: result.message,
			color: result.status,
		})
	};

	const columns = useMemo<MRT_ColumnDef<I_Purchases>[]>(
		() => [
			{
				header: t('product'),
				accessorFn: row => purchases.find(purchase => purchase.name === row.name)?.label,
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
			{
				header: t('maxAccepted'),
				accessorKey: 'max',
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
		data: purchases,
		localization,
		onEditingRowSave: handleSaveRow,
		onEditingRowCancel: ({ row }) => {
			row._valuesCache.price = row.original.price
			row._valuesCache.max = row.original.max
		},
		displayColumnDefOptions: {
			'mrt-row-actions': {
			  header: t('edit'),
			}
		},
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

export default Purchases