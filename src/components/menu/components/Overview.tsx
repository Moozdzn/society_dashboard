import { Group, Paper, Stack, Text } from '@mantine/core'
import { useDuty, useEmployee } from '../../../atoms/employees'
import { hasPermission } from '../../../utils/hasPermission'
import { useMyRole } from '../../../atoms/grades'
import { useMemo } from 'react'
import { useSociety } from '../../../atoms/society'
import { useTranslation } from 'react-i18next'

const Overview: React.FC = () => {
	const { funds } = useSociety()
	const employees = useEmployee()
	const onDuty = useDuty()
	const myRole = useMyRole()

	const canSeeEmployees = useMemo(() => hasPermission(myRole, 'employees'), [myRole])
	const canSeeDuty = useMemo(() => hasPermission(myRole, 'clock-out'), [myRole])
	const canSeeFunds = useMemo(() => hasPermission(myRole, 'funds'), [myRole])

	const {t, i18n} = useTranslation()

	return (
		<>
			<Group grow>
				<Paper p='md'>
					<Stack>
						<Text ta='center' size={20} weight={600}>
							{t('funds')}
						</Text>
						<Text ta='center' color='blue.4'>
							{canSeeFunds ? t('fundsAvailable', {funds: funds}) : t('na')}
						</Text>
					</Stack>
				</Paper>
				<Paper p='md'>
					<Stack>
						<Text ta='center' size={20} weight={600}>
							{t('employees')}
						</Text>
						<Text ta='center' color='blue.4'>
							{canSeeEmployees ? employees.length : t('na')}
						</Text>
					</Stack>
				</Paper>
				<Paper p='md'>
					<Stack>
						<Text ta='center' size={20} weight={600}>
							{t('onDuty')}
						</Text>
						<Text ta='center' color='blue.4'>
							{canSeeDuty ? onDuty : t('na')}
						</Text>
					</Stack>
				</Paper>
			</Group>
		</>
	)
}

export default Overview
