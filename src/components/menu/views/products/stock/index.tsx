import { MRT_ColumnDef, useMantineReactTable, MantineReactTable } from "mantine-react-table"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { stockAtom, useStock } from "../../../../../atoms/stock"
import { useLocalization } from "../../../../../providers/LocalizationProvider"
import { I_Stock } from "../../../../../typings"

const Stock: React.FC = () => {
	const { t } = useTranslation()
	const stock = useStock()

	const { localization } = useLocalization()

	const columns = useMemo<MRT_ColumnDef<I_Stock>[]>(
		() => [
			{
				header: t('stock'),
				accessorFn: row => stock.find(stock => stock.name === row.name)?.label,
				enableEditing: false,
				id: 'name',
			},
			{
				header: t('quantity'),
				accessorKey: 'amount',
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
		data: stock,
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

export default Stock