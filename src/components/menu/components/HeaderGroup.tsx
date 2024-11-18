import { ActionIcon, Group, Header, Text, Title, Tooltip } from '@mantine/core'
import { useSociety } from '../../../atoms/society'
import { useMyRole } from '../../../atoms/grades'
import { fetchNui } from '../../../utils/fetchNui'
import { useTranslation } from 'react-i18next'
import { IconLogout } from '@tabler/icons-react'

const HeaderGroup: React.FC = () => {

  const society = useSociety()
  const myRole = useMyRole()

  const { t } = useTranslation()

  return (
    <Header sx={{ height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} height={50}>
      <Group px={20} position='apart'>
        <Group>
          <Title order={3}>{society.label}</Title>
          <Text
            size={14}
            weight={600}
            color='blue.4'
          >{myRole?.label}: {society.name}</Text>
        </Group>
        <Group>
          <Tooltip label={t('exit')} position='bottom'>
            <ActionIcon
              color='red.4'
              style={{ margin: '5px', width: '40px', height: '40px' }}
              onClick={() => fetchNui('hideFrame')}
            >
              <IconLogout fontSize={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Header>
  )
}

export default HeaderGroup