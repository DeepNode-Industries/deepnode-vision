import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  style?: object
  fullWidth?: boolean
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  style,
  fullWidth,
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#fff' : '#06b6d4'} />
      ) : (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </TouchableOpacity>
  )
}

// Text wrapper for button labels
export function BtnText({ children, variant = 'primary', size = 'md' }: { children: React.ReactNode; variant?: string; size?: string }) {
  return (
    <Text style={[
      styles.text,
      variant === 'primary' && styles.textPrimary,
      variant === 'ghost' && styles.textGhost,
      variant === 'outline' && styles.textOutline,
      variant === 'danger' && styles.textDanger,
      size === 'sm' && styles.textSm,
      size === 'lg' && styles.textLg,
    ]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.45 },

  // Variants
  primary: {
    backgroundColor: '#0891b2',
    borderColor: '#06b6d4',
  },
  secondary: {
    backgroundColor: 'rgba(139,92,246,0.15)',
    borderColor: 'rgba(139,92,246,0.4)',
  },
  ghost: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(6,182,212,0.4)',
  },
  danger: {
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderColor: 'rgba(239,68,68,0.4)',
  },

  // Sizes
  size_sm: { paddingHorizontal: 12, paddingVertical: 7 },
  size_md: { paddingHorizontal: 16, paddingVertical: 11 },
  size_lg: { paddingHorizontal: 20, paddingVertical: 15 },

  // Text
  text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#e2e8f0',
  },
  textPrimary: { color: '#ffffff' },
  textGhost: { color: '#94a3b8' },
  textOutline: { color: '#22d3ee' },
  textDanger: { color: '#f87171' },
  textSm: { fontSize: 12 },
  textLg: { fontSize: 16 },
})
