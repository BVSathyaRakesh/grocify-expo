import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useAuth, useSignUp } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native'

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const dynamicStyles = createStyles(colorScheme)

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (!error) await signUp.verifications.sendEmailCode()
  }

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    })
    if (signUp.status === 'complete') {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask)
            return
          }

          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url as Href)
          }
        },
      })
    } else {
      // Check why the sign-up is not complete
      console.error('Sign-up attempt not complete:', signUp)
    }
  }

  if (signUp.status === 'complete' || isSignedIn) {
    return null
  }

  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <ThemedView style={dynamicStyles.container}>
        <ThemedText type="title" style={dynamicStyles.title}>
          Verify your account
        </ThemedText>
        <TextInput
          style={dynamicStyles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor={colorScheme === 'dark' ? '#888' : '#666666'}
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <ThemedText style={dynamicStyles.error}>{errors.fields.code.message}</ThemedText>
        )}
        <Pressable
          style={({ pressed }) => [
            dynamicStyles.button,
            fetchStatus === 'fetching' && dynamicStyles.buttonDisabled,
            pressed && dynamicStyles.buttonPressed,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <ThemedText style={dynamicStyles.buttonText}>Verify</ThemedText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [dynamicStyles.secondaryButton, pressed && dynamicStyles.buttonPressed]}
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <ThemedText style={dynamicStyles.secondaryButtonText}>I need a new code</ThemedText>
        </Pressable>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={dynamicStyles.container}>
      <ThemedText type="title" style={dynamicStyles.title}>
        Sign up
      </ThemedText>

      <ThemedText style={dynamicStyles.label}>Email address</ThemedText>
      <TextInput
        style={dynamicStyles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#666666'}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        keyboardType="email-address"
      />
      {errors.fields.emailAddress && (
        <ThemedText style={dynamicStyles.error}>{errors.fields.emailAddress.message}</ThemedText>
      )}
      <ThemedText style={dynamicStyles.label}>Password</ThemedText>
      <TextInput
        style={dynamicStyles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#666666'}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors.fields.password && (
        <ThemedText style={dynamicStyles.error}>{errors.fields.password.message}</ThemedText>
      )}
      <Pressable
        style={({ pressed }) => [
          dynamicStyles.button,
          (!emailAddress || !password || fetchStatus === 'fetching') && dynamicStyles.buttonDisabled,
          pressed && dynamicStyles.buttonPressed,
        ]}
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === 'fetching'}
      >
        <ThemedText style={dynamicStyles.buttonText}>Sign up</ThemedText>
      </Pressable>
      {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
      {errors && <ThemedText style={dynamicStyles.debug}>{JSON.stringify(errors, null, 2)}</ThemedText>}

      <View style={dynamicStyles.linkContainer}>
        <ThemedText>Already have an account? </ThemedText>
        <Link href="/sign-in">
          <ThemedText type="link">Sign in</ThemedText>
        </Link>
      </View>

      {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
      <View nativeID="clerk-captcha" />
    </ThemedView>
  )
}

const createStyles = (colorScheme: 'light' | 'dark' | null) => {
  const isDark = colorScheme === 'dark'
  const colors = {
    inputBg: isDark ? '#1a1a1a' : '#fff',
    inputBorder: isDark ? '#404040' : '#ccc',
    inputText: isDark ? '#e0e0e0' : '#000',
    buttonBg: '#0a7ea4',
    buttonTextColor: '#fff',
    secondaryTextColor: '#0a7ea4',
    error: '#d32f2f',
  }

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 12,
    },
    title: {
      marginBottom: 8,
    },
    label: {
      fontWeight: '600',
      fontSize: 14,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: colors.inputBg,
      color: colors.inputText,
    },
    button: {
      backgroundColor: colors.buttonBg,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonPressed: {
      opacity: 0.7,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: colors.buttonTextColor,
      fontWeight: '600',
    },
    secondaryButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    secondaryButtonText: {
      color: colors.secondaryTextColor,
      fontWeight: '600',
    },
    linkContainer: {
      flexDirection: 'row',
      gap: 4,
      marginTop: 12,
      alignItems: 'center',
    },
    error: {
      color: colors.error,
      fontSize: 12,
      marginTop: -8,
    },
    debug: {
      fontSize: 10,
      opacity: 0.5,
      marginTop: 8,
    },
  })
}

const styles = createStyles(null)