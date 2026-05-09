export const topDesignTokens = {
  colors: {
    gray50: "#f9fafb",
    gray400: "#9ca3af",
    primaryDark: "#111827",
    backgroundPrimaryDark: "#111827",
    textPrimary: "#f9fafb",
    textSecondary: "#e5e7eb",
    accentLight: "#fde68a",
    glassBgLight: "rgba(255, 255, 255, 0.08)",
    glassBgMedium: "rgba(255, 255, 255, 0.12)",
    glassBorderWhiteLight: "rgba(255, 255, 255, 0.18)",
    glassBorderWhiteMedium: "rgba(255, 255, 255, 0.25)",
  },
  fontSizes: {
    xs: 12,
    base: 16,
    lg: 20,
  },
  lineHeights: {
    relaxedMultiplier: 1.25,
  },
  fontWeights: {
    medium: "500" as const,
    semibold: "600" as const,
  },
  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    6: 24,
    8: 32,
    10: 40,
  },
  radii: {
    md: 8,
    xl: 16,
    full: 9999,
  },
  sizes: {
    profileImageSm: 144,
    profileImageLg: 200,
    profileCardMaxWidth: 512,
    profileCardMinHeight: 170,
    headerLogo: 40,
    gridCell: 40,
  },
  layout: {
    profileBreakpointWidth: 768,
    horizontalPadding: 24,
    heroGap: 32,
    profileImageBorderWidth: 4,
  },
  motion: {
    typewriterCharMs: 40,
    cursorBlinkHalfMs: 500,
  },
  shadows: {
    iosGlassMedium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 32,
    },
    androidGlassMedium: {
      elevation: 4,
    },
  },
} as const;
