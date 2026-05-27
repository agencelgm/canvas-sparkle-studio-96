import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        bronze: {
          DEFAULT: "hsl(var(--bronze))",
          light: "hsl(var(--bronze-light))",
          dark: "hsl(var(--bronze-dark))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C9A227 0%, #E4C76B 50%, #C9A227 100%)',
        'gradient-gold-h': 'linear-gradient(90deg, #C9A227, #E8D48A, #C9A227)',
        'shimmer-gold': 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.4) 50%, transparent 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201, 162, 39, 0.25), 0 0 40px rgba(201, 162, 39, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(201, 162, 39, 0.5), 0 0 80px rgba(201, 162, 39, 0.2)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "orbit": {
          "from": { transform: "rotate(0deg) translateX(110px) rotate(0deg)" },
          "to": { transform: "rotate(360deg) translateX(110px) rotate(-360deg)" },
        },
        "orbit-reverse": {
          "from": { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
          "to": { transform: "rotate(-360deg) translateX(80px) rotate(360deg)" },
        },
        "spin-slow": {
          "from": { transform: "rotate(0deg)" },
          "to": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "from": { opacity: "0", transform: "translateY(30px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "from": { opacity: "0" },
          "to": { opacity: "1" },
        },
        "draw-line": {
          "from": { strokeDashoffset: "1000" },
          "to": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "orbit": "orbit 22s linear infinite",
        "orbit-reverse": "orbit-reverse 18s linear infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "draw-line": "draw-line 2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
