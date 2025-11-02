import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-primary)", "Georgia", "serif"],
        secondary: ["var(--font-secondary)", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
      },
      lineHeight: {
        "relaxed": "1.75",
        "heading": "1.4",
      },
      letterSpacing: {
        "wide-gentle": "0.025em",
      },
      colors: {
        // Ayahuasca Design System - Direct color access
        "earth-brown": "hsl(var(--earth-brown))",
        "jungle-green": "hsl(var(--jungle-green))",
        "ancient-gold": "hsl(var(--ancient-gold))",
        "indigo-violet": "hsl(var(--indigo-violet))",
        "bordeaux-rose": "hsl(var(--bordeaux-rose))",
        "warm-cream": "hsl(var(--warm-cream))",
        
        // Semantic colors (shadcn/ui compatible)
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "organic-texture": "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIj48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSJub25lIiBzdHJva2U9ImhzbCgzNSAyNSUgNzAlKSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')",
        "sacred-circle": "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMzUgMjUlIDcwJSkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKDM1IDI1JSA3MCUpIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4wNSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKDM1IDI1JSA3MCUpIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')",
        "tribal-pattern": "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCA0MEw0MCAwTDgwIDQwTDQwIDgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woNDIgNDQlIDU2JSkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA4Ii8+PHBhdGggZD0iTTIwIDQwTDMwIDIwTDMwIDYwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woNDIgNDQlIDU2JSkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA4Ii8+PHBhdGggZD0iTTUwIDQwTDMwIDIwTDMwIDYwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woNDIgNDQlIDU2JSkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')",
        "geometric-divider": "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQiIHZpZXdCb3g9IjAgMCAxMDAgNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAyTDUwIDJMMTAwIDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKDM1IDI1JSA3MCUpIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMiIgcj0iMiIgZmlsbD0iaHNsKDQyIDQ0JSA1NiUpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')",
      },
    },
  },
  plugins: [],
};

export default config;
