export const durations = {
  fast: 160,
  normal: 240,
  medium: 320,
  slow: 420,
  xslow: 700,
};

export const springs = {
  soft: {
    damping: 16,
    stiffness: 180,
    mass: 0.8,
  },
  button: {
    damping: 14,
    stiffness: 240,
    mass: 0.7,
  },
  pop: {
    damping: 12,
    stiffness: 260,
    mass: 0.75,
  },
  float: {
    damping: 18,
    stiffness: 120,
    mass: 1,
  },
};

export const stagger = {
  xs: 50,
  sm: 80,
  md: 120,
  lg: 160,
};

export const scale = {
  pressIn: 0.97,
  pressOut: 1,
  subtleStart: 0.96,
  subtleEnd: 1,
  popStart: 0.82,
  popEnd: 1,
};

export const translate = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 28,
};

export const opacity = {
  hidden: 0,
  soft: 0.4,
  visible: 1,
};

export const loops = {
  idleFloatDuration: 2800,
  idlePulseDuration: 1800,
  glowPulseDuration: 1600,
};

export const easings = {
  standard: "ease",
  softOut: "easeOut",
  softInOut: "easeInOut",
};
