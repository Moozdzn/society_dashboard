import { ActionIcon, type MantineGradient, type MantineNumberSize, Tooltip } from '@mantine/core'
import type { FloatingPosition } from '@mantine/core/lib/Floating'
import type { ReactElement } from 'react'

interface TableIconProps {
    label: string
    icon: ReactElement
    position?: FloatingPosition
    size?: MantineNumberSize
    color?: MantineGradient
    disabled?: boolean
    handleClick?: () => void
}

const TableIcon: React.FC<TableIconProps> = ({label, position, color, icon, size, disabled, handleClick}) => {

  return (
    <Tooltip label={label} position={position || 'top'}>
        <ActionIcon
            variant="gradient"
            size={size || 'lg'}
            aria-label={label}
            gradient={color || { from: "green", to: "lime", deg: 90 }}
            disabled={disabled || false}
            onClick={handleClick}
        >
            {icon}
        </ActionIcon>
    </Tooltip>
  )
}

export default TableIcon