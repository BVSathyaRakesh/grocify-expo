import { Text, type TextProps } from 'react-native'

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'subtitle' | 'link'
}

export function ThemedText({ type = 'default', style, ...rest }: ThemedTextProps) {
  let textStyle: TextProps['style'] = {}

  switch (type) {
    case 'title':
      textStyle = {
        fontSize: 28,
        fontWeight: 'bold',
      }
      break
    case 'subtitle':
      textStyle = {
        fontSize: 18,
        fontWeight: '600',
      }
      break
    case 'link':
      textStyle = {
        color: '#0a7ea4',
        fontWeight: '600',
      }
      break
    default:
      textStyle = {
        fontSize: 16,
      }
  }

  return <Text style={[textStyle, style]} {...rest} />
}
