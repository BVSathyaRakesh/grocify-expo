import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Show, useClerk, useUser } from '@clerk/expo'
import { Link } from 'expo-router'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const colorScheme = useColorScheme()
  const dynamicStyles = createStyles(colorScheme)

  return (
    <ThemedView style={dynamicStyles.container}>
      <ThemedText type="title" style={dynamicStyles.title}>
        Welcome!
      </ThemedText>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in">
          <ThemedText style={dynamicStyles.link}>Sign in</ThemedText>
        </Link>
        <Link href="/(auth)/sign-up">
          <ThemedText style={dynamicStyles.link}>Sign up</ThemedText>
        </Link>
      </Show>
      <Show when="signed-in">
        <ThemedText>Hello {user?.emailAddresses[0].emailAddress}</ThemedText>
        <Pressable style={({ pressed }) => [dynamicStyles.button, pressed && dynamicStyles.buttonPressed]} onPress={() => signOut()}>
          <ThemedText style={dynamicStyles.buttonText}>Sign out</ThemedText>
        </Pressable>
      </Show>
    </ThemedView>
  )
}

const createStyles = (colorScheme: 'light' | 'dark' | null) => {
  const isDark = colorScheme === 'dark'
  const colors = {
    buttonBg: '#0a7ea4',
    buttonTextColor: '#fff',
    linkColor: '#0a7ea4',
  }

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
      gap: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    link: {
      color: colors.linkColor,
      fontWeight: '600',
      fontSize: 16,
    },
    button: {
      backgroundColor: colors.buttonBg,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonPressed: {
      opacity: 0.7,
    },
    buttonText: {
      color: colors.buttonTextColor,
      fontWeight: '600',
    },
  })
}

const styles = createStyles(null)