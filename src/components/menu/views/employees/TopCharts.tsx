import { Overlay, Button, useMantineTheme, Center } from '@mantine/core'
import prettyMilliseconds from 'pretty-ms'
import { useState } from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip as RechartsTooltip } from 'recharts'
import { type PrimitiveAtom, useAtom } from 'jotai'
import type { ChartData } from '../../../../typings'
import { topDutyAtom, topRoutesAtom } from '../../../../atoms/employees'
import { fetchNui } from '../../../../utils/fetchNui'
import { IconMoodSad } from '@tabler/icons-react'

type ChartWrapperProps = {
	endpoint: string
	label: string
	atom: PrimitiveAtom<ChartData[]>
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ endpoint, atom, label }) => {
	const theme = useMantineTheme()

	const [isHidden, setIsHidden] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	const [data, setData] = useAtom(atom)

	const loadData = async () => {
		setIsLoading(true)
		const topResults = await fetchNui<ChartData[]>(endpoint, {}, { data, delay: 1500 })
		setData(topResults)
		setIsLoading(false)
		setIsHidden(false)
	}

	return (
		<>
			{label}
			<div style={{ height: 'calc(100vh - 70vh)', position: 'relative', width: '100%' }}>
				{data.length > 0 ? (
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='citizenid' />
							<YAxis
								yAxisId='left'
								orientation='left'
								stroke={theme.colors.blue[3]}
								tickFormatter={value => prettyMilliseconds(value, { compact: true })}
							/>
							<YAxis yAxisId='right' orientation='right' stroke={theme.colors.green[3]} />
							<RechartsTooltip
								formatter={(value, name, props) => {
									return props.dataKey === 'dutyTime' ? prettyMilliseconds(value as number) : value
								}}
							/>
							<Legend />
							<Bar yAxisId='left' dataKey='dutyTime' fill={theme.colors.blue[3]} name={'Time on duty'} />
							<Bar yAxisId='right' dataKey='amount' fill={theme.colors.green[3]} name={'Routes completed'} />
						</BarChart>
					</ResponsiveContainer>
				) : (
					<Center style={{ height: '100%', flexDirection: 'column' }}>
						<IconMoodSad size={48} />
						<p>No data</p>
					</Center>
				)}
				{isHidden && (
					<Overlay blur={15} center>
						<Button radius='sm' loading={isLoading} onClick={() => isHidden && !isLoading && loadData()}>
							Load
						</Button>
					</Overlay>
				)}
			</div>
		</>
	)
}

const TopCharts: React.FC = () => {
	return (
		<>
			<ChartWrapper endpoint='topDuty' atom={topDutyAtom} label={'Players with the most time on duty'} />
			<ChartWrapper endpoint='topRoutes' atom={topRoutesAtom} label={'Players with the most routes completed'} />
		</>
	)
}

export default TopCharts
