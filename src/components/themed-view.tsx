import { View, type ViewProps } from 'react-native'

export function ThemedView({ className, ...rest }: ViewProps) {
  return (
    <View
      className={`bg-background ${className || ''}`}
      {...rest}
    />
  )
}
