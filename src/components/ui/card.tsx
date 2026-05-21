import { View, Text, StyleSheet } from 'react-native'

interface CardProps {
  children: React.ReactNode
  glow?: 'cyan' | 'purple' | 'none'
  style?: object
}

export function Card({ children, glow = 'none', style }: CardProps) {
  return (
    <View style={[
      styles.card,
      glow === 'cyan' && styles.glowCyan,
      glow === 'purple' && styles.glowPurple,
      style,
    ]}>
      {children}
    </View>
  )
}

export function CardHeader({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.header, style]}>{children}</View>
}

export function CardContent({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.content, style]}>{children}</View>
}

export function CardTitle({ children, style }: { children: React.ReactNode; style?: object }) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  glowCyan: {
    borderColor: 'rgba(6,182,212,0.3)',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  glowPurple: {
    borderColor: 'rgba(139,92,246,0.3)',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 14,
    color: '#f1f5f9',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
})
