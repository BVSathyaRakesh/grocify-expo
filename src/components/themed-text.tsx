import { Text, type TextProps } from 'react-native'

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'subtitle' | 'link'
}

export function ThemedText({ type = 'default', className, ...rest }: ThemedTextProps) {
  let baseClass = 'text-foreground'

  switch (type) {
    case 'title':
      baseClass = 'text-foreground text-2xl font-bold'
      break
    case 'subtitle':
      baseClass = 'text-foreground text-lg font-semibold'
      break
    case 'link':
      baseClass = 'text-primary font-semibold'
      break
    default:
      baseClass = 'text-foreground text-base'
  }

  return <Text className={`${baseClass} ${className || ''}`} {...rest} />
}
