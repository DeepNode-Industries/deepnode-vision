'use client'

import { useEffect } from 'react'

/**
 * Initializes Capacitor native plugins on app start.
 * Runs only on native platforms (Android / iOS).
 * Must be mounted at root level (layout.tsx).
 */
export function CapacitorInit() {
  useEffect(() => {
    async function init() {
      try {
        const { Capacitor } = await import('@capacitor/core')
        if (!Capacitor.isNativePlatform()) return

        // ── Status Bar ────────────────────────────────────────────────────
        try {
          const { StatusBar, Style } = await import('@capacitor/status-bar')
          await StatusBar.setStyle({ style: Style.Dark })
          await StatusBar.setBackgroundColor({ color: '#020817' })
          // Don't overlay — WebView starts below the status bar (no padding needed)
          await StatusBar.setOverlaysWebView({ overlay: false })
        } catch (e) {
          console.warn('[DeepNode] StatusBar init failed:', e)
        }

        // ── Splash Screen ─────────────────────────────────────────────────
        try {
          const { SplashScreen } = await import('@capacitor/splash-screen')
          await SplashScreen.hide({ fadeOutDuration: 400 })
        } catch (e) {
          console.warn('[DeepNode] SplashScreen init failed:', e)
        }

        // ── App lifecycle (back button handler) ───────────────────────────
        try {
          const { App } = await import('@capacitor/app')
          App.addListener('backButton', ({ canGoBack }) => {
            if (canGoBack) {
              window.history.back()
            } else {
              App.minimizeApp()
            }
          })
        } catch (e) {
          console.warn('[DeepNode] App listener failed:', e)
        }
      } catch (e) {
        console.warn('[DeepNode] Capacitor not available:', e)
      }
    }
    init()
  }, [])

  return null
}
