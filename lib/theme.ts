export const colors = {
  background: "#F0F0F0",
  surface: "#FFFFFF",

  mintBg: "#D0F0E0",
  mintCard: "#CFE5DE",
  mintStrong: "#20C090",

  cyanSoft: "#E0F0F0",
  cyan: "#5ED1F5",

  pink: "#F05080",
  pinkSoft: "#F0E0E0",

  yellow: "#F0B000",
  yellowSoft: "#F0E050",

  lilac: "#80A0E0",

  text: "#222222",
  textSoft: "#666666",
  textMuted: "#8A8A8A",

  border: "#2F2F2F",
  borderSoft: "#D9D9D9",

  overlayDark: "rgba(0,0,0,0.55)",
  danger: "#FF7A5C",
  overlaySoft: "rgba(0,0,0,0.25)",
  dangerSoft: "#FFF1F1",
  mintSoft: "#D0F0E0",
  mint: "#CFE5DE",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  pill: 999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 38,
  },
  h2: {
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: "700" as const,
    lineHeight: 24,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: "500" as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: "500" as const,
    lineHeight: 16,
  },
};

export const shadows = {
  soft: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  medium: {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  strong: {
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 8,
  },
};

export const components = {
  screen: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.borderSoft,
    ...shadows.soft,
  },

  outlinedCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.border,
    ...shadows.soft,
  },

  mintCard: {
    backgroundColor: colors.mintCard,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.border,
    ...shadows.soft,
  },

  pillButton: {
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.mintCard,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    flexDirection: "row" as const,
    ...shadows.medium,
  },

  smallPill: {
    minHeight: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingHorizontal: spacing.lg,
    ...shadows.soft,
  },

  input: {
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    color: colors.text,
  },

  textarea: {
    minHeight: 110,
    borderRadius: radius.md,
    borderWidth: 1.2,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.text,
  },
};
