import { Button, Menu, Text } from "@mantine/core";
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { useEffect, useMemo, useState } from "react";
import { fetchNui } from "../../../../utils/fetchNui";
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Player, ReturnProps } from "../../../../typings";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
import { mockHire } from "../../../../dev/hire";
import { IconUserPlus } from "@tabler/icons-react";
import { useLocalization } from "../../../../providers/LocalizationProvider";


const getClosestPlayers = async () => {
  return await fetchNui('closest', {}, { data: mockHire, delay: 500 })
}


const Hire: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const { t } = useTranslation()
    const { localization } = useLocalization()

    useEffect(() => {
      getClosestPlayers().then(setPlayers)
    }, [])

    useNuiEvent('setClosest', (data: Player[]) => {
      setPlayers(data)
    })

    const hire = async (citizenid: number) => {
      const result = await fetchNui('hire', { citizenid }) as ReturnProps
      notifications.show({
        message: result.message,
        color: result.status,
      })
      if (result.status === 'success') {
        setPlayers(prev => prev.filter(player => player.citizenid !== citizenid))
      }
    }

    const columns = useMemo<MRT_ColumnDef<Player>[]>(
        () => [
          {
            header: t('name'),
            accessorKey: "name",
          },
          {
            header: t('distance'),
            accessorKey: "distance",
            Cell: ({ cell }) => {
              const distance = Math.round(cell.getValue<number>() * 100) / 100
              return t('meter', {count: distance})
            }
          },
          {
            header: "ID",
            accessorKey: "unique",
          },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: players,
        localization,
        enableColumnOrdering: false,
        enableGlobalFilter: true, //turn off a feature
        enableRowActions: true,
        initialState:{ density: 'xs' },
        enableDensityToggle: false,
		    enableFullScreenToggle: false,
        renderRowActionMenuItems: ({ row }) => {
          return (<Menu.Item icon={<IconUserPlus />} onClick={() => hire(row.original.citizenid)}>{t('hire')}</Menu.Item>)
        },
        renderTopToolbarCustomActions(props) {
          return (
            <Button
              color="blue"
              onClick={async () => {
                const data = await getClosestPlayers()
                setPlayers(data)
              }}
          >
              {t('refreshList')}
          </Button>
          )
        },
        mantineTableContainerProps: {
          style: {
            height: 'calc(100vh - 45vh)',
          },
        },
        enablePagination: false,
        enableBottomToolbar: false,
        enableStickyHeader: true,
        renderEmptyRowsFallback: ({table}) => (<Text
          sx={{
            color: 'gray',
            fontStyle: 'italic',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            textAlign: 'center',
            width: '100%',
          }}
        >
          No Players Nearby
        </Text>)
      })

    return <MantineReactTable table={table} />
};

export default Hire;
