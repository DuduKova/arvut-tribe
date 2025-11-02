# Ayahuasca Design System

## Overview

This design system reflects the natural, spiritual, and ceremonial essence of Ayahuasca retreats in the Peruvian Amazon. The overall feeling is **grounding, sacred, and organic** — connecting nature, healing, and mysticism.

## Typography

### Font Selection

**Primary Font (Headings)**: **Playfair Display**
- A serif typeface that feels organic and timeless
- Used for all headings (h1-h6)
- Creates a ceremonial, hand-crafted feeling
- Applied automatically to all heading elements

**Secondary Font (Body Text)**: **Lato**
- A humanist sans-serif for clarity and balance
- Used for body text, paragraphs, and UI elements
- Provides excellent readability while maintaining warmth
- Applied to body and all non-heading text

### Typography Scale

```tsx
// Headings use primary font (Playfair Display)
<h1>Main Heading</h1>  // 2.5rem, line-height: 1.3
<h2>Section Heading</h2>  // 2rem, line-height: 1.35
<h3>Subsection</h3>  // 1.75rem, line-height: 1.4
<h4>Minor Heading</h4>  // 1.5rem, line-height: 1.4

// Body text uses secondary font (Lato)
<p>Body text with large line spacing</p>  // line-height: 1.75
```

### Line Spacing & Contrast

- **Body text**: Large line spacing (1.75) creates a calm, breathing reading experience
- **Headings**: Tighter line-height (1.3-1.45) for better visual hierarchy
- **Letter spacing**: Gentle wide spacing (0.025em) for headings adds organic feel
- **Contrast**: Maintained at WCAG AA standards for accessibility

### Usage

```tsx
// Automatic typography application
<h1 className="font-primary">Ceremonial Title</h1>
<p className="font-secondary">Body text is automatically styled</p>

// Typography utilities
<p className="leading-relaxed">Extra breathing room</p>
<h2 className="tracking-wide-gentle">Heading with gentle spacing</h2>
```

## Color Palette

### Base Colors

| Color Name | Hex Code | HSL | Usage |
|-----------|----------|-----|-------|
| **Deep Earth Brown** | `#4B2E05` | `35 88% 16%` | Roots, stability, connection to earth, primary text |
| **Jungle Green** | `#1C3925` | `139 34% 17%` | Amazon, life, natural growth, secondary elements |
| **Ancient Gold** | `#C1A35F` | `42 44% 56%` | Sacredness, wisdom, shamanic light, primary buttons |
| **Deep Indigo Violet** | `#3A2769` | `257 46% 28%` | Spirit, visions, inner exploration, accent elements |
| **Soft Bordeaux Rose** | `#8C3B3B` | `0 41% 39%` | Heart, emotion, feminine energy, destructive actions |
| **Warm Cream** | `#F4EEDC` | `45 52% 91%` | Clean, breathable background, primary surface |

### Semantic Color Mapping

- **Background**: Warm Cream - main background for readability and warmth
- **Foreground**: Earth Brown - primary text color
- **Primary**: Ancient Gold - key buttons and interface elements
- **Secondary**: Jungle Green - supporting elements and frames
- **Accent**: Indigo Violet - special highlights, quotes, ceremonies, mystical content
- **Destructive**: Bordeaux Rose - error states and removal actions
- **Muted**: Light earth tones - subtle backgrounds and secondary text

## Usage Guidelines

### Backgrounds

```tsx
// Main background (default)
<div className="bg-warm-cream">
  {/* Content */}
</div>

// Card backgrounds
<div className="bg-card">
  {/* Card content */}
</div>
```

### Text Colors

```tsx
// Primary text
<p className="text-earth-brown">Main content text</p>

// On colored backgrounds
<p className="text-primary-foreground">Text on gold button</p>
<p className="text-secondary-foreground">Text on green button</p>
```

### Buttons & Interactive Elements

```tsx
// Primary action (Gold)
<button className="bg-ancient-gold text-earth-brown hover:bg-ancient-gold/90">
  Primary Action
</button>

// Secondary action (Green)
<button className="bg-jungle-green text-warm-cream hover:bg-jungle-green/90">
  Secondary Action
</button>

// Using shadcn/ui Button component (automatically uses primary/secondary)
<Button variant="default">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
```

### Accents & Highlights

```tsx
// Mystical content, quotes, ceremonies
<div className="bg-indigo-violet text-warm-cream p-4 rounded-lg">
  Sacred quote or ceremony information
</div>

// Emotional/heart content
<div className="border-l-4 border-bordeaux-rose pl-4">
  Heart-centered message
</div>

// Natural details and textures
<div className="border border-earth-brown/30 bg-jungle-green/5 p-4">
  Natural element frame
</div>
```

### Borders & Frames

```tsx
// Subtle borders
<div className="border border-earth-brown/20">
  Content with subtle border
</div>

// Natural frames
<div className="border-2 border-jungle-green/30 rounded-lg">
  Framed natural content
</div>
```

## Tailwind Class Usage

### Direct Color Access

All colors are available directly in Tailwind classes:

```tsx
// Backgrounds
bg-earth-brown
bg-jungle-green
bg-ancient-gold
bg-indigo-violet
bg-bordeaux-rose
bg-warm-cream

// Text
text-earth-brown
text-jungle-green
text-ancient-gold
text-indigo-violet
text-bordeaux-rose
text-warm-cream

// Borders
border-earth-brown
border-jungle-green
border-ancient-gold
// etc.
```

### Semantic Tokens (shadcn/ui compatible)

```tsx
// Backgrounds
bg-background      // Warm Cream
bg-card           // Lighter cream for cards
bg-primary        // Ancient Gold
bg-secondary      // Jungle Green
bg-accent         // Indigo Violet
bg-destructive    // Bordeaux Rose

// Text
text-foreground   // Earth Brown
text-primary-foreground
text-secondary-foreground
text-accent-foreground
text-muted-foreground
```

## Design Patterns

### Organic Textures

The design system includes subtle organic textures for depth and authenticity:

```tsx
// Apply subtle texture overlay
<div className="bg-organic-texture opacity-10">
  Content with organic texture
</div>
```

### Color Combinations

**Natural & Grounding**
- Earth Brown + Warm Cream: Stable, readable, grounded
- Jungle Green + Warm Cream: Life, growth, natural

**Sacred & Mystical**
- Ancient Gold + Earth Brown: Wisdom, sacredness, shamanic
- Indigo Violet + Warm Cream: Spirit, visions, inner exploration

**Emotional & Heart-Centered**
- Bordeaux Rose + Warm Cream: Heart, emotion, feminine energy

### Accessibility

- Text contrast ratios meet WCAG AA standards
- Primary buttons use high contrast (Gold on Earth Brown text)
- Secondary buttons use high contrast (Green on Warm Cream)
- Focus states use gold ring for visibility

## Dark Mode

The design system includes a thoughtful dark mode that maintains the mystical atmosphere:

- Backgrounds use deeper earth tones
- Text remains warm cream for readability
- Gold and accent colors remain vibrant
- Borders become more subtle

Toggle dark mode by adding the `dark` class to the root element or using your theme provider.

## Component Examples

### Card with Natural Frame

```tsx
<div className="bg-card border-2 border-jungle-green/30 rounded-lg p-6">
  <h3 className="text-earth-brown text-xl font-semibold mb-2">Title</h3>
  <p className="text-foreground">Content with natural framing</p>
</div>
```

### Sacred Quote Block

```tsx
<blockquote className="bg-indigo-violet text-warm-cream p-6 rounded-lg border-l-4 border-ancient-gold">
  <p className="italic">"Sacred quote or ceremony text"</p>
</blockquote>
```

### Primary CTA Button

```tsx
<Button variant="default">
  Begin Your Journey
</Button>

// Enhanced with soft shadows, rounded corners, and hover glow
// Uses shadow-md by default, shadow-lg on hover
// Subtle light glow effect with gold/green colors on hover
```

### Enhanced Button Styling

All buttons include:
- **Rounded corners**: Using design system radius (`rounded-lg`)
- **Soft shadows**: `shadow-md` for depth, `shadow-lg` on hover
- **Hover glow**: Subtle light glow using gold (primary) or green (secondary) colors
- **Smooth transitions**: 200ms transitions for all interactive states

```tsx
// Primary button with gold glow
<Button variant="default">Primary Action</Button>

// Secondary button with green glow
<Button variant="secondary">Secondary Action</Button>
```

## Mood & Feeling

The design system is intentionally crafted to evoke:

- **Grounded**: Deep earth tones provide stability and connection
- **Sacred**: Gold accents suggest wisdom and shamanic light
- **Natural**: Green tones connect to the Amazon and life
- **Mystical**: Indigo violet represents spirit and inner exploration
- **Inviting**: Warm cream background creates a breathable, welcoming space
- **Balanced**: Combination of jungle energy and inner peace

## Implementation Notes

- All colors use HSL format for easier manipulation
- CSS custom properties allow for dynamic theming
- Tailwind classes provide easy access to all colors
- shadcn/ui components automatically use semantic tokens
- Dark mode is fully supported with adjusted values

## Imagery & Visual Elements

### Photography Style Guidelines

When selecting or commissioning photography:

**Focus Areas:**
- Jungle landscapes and rivers
- Ceremony spaces and ritual moments
- Indigenous culture and traditions
- Natural textures (wood, leaves, woven fabrics, cacao, ayahuasca vines)

**Visual Characteristics:**
- **Lighting**: Warm, natural light preferred over artificial filters
- **Atmosphere**: Mist, soft focus, and gentle diffusion
- **Colors**: Earth tones, natural color palette
- **Style**: Authentic, ceremonial, and soulful (avoid overly psychedelic effects)

### Sacred Geometry Patterns

Subtle geometric patterns for backgrounds and section dividers:

```tsx
// Organic texture overlay
<div className="bg-organic-texture opacity-10">
  Content with subtle texture
</div>

// Sacred circle pattern
<div className="bg-sacred-circle opacity-5">
  Mystical section background
</div>

// Tribal pattern
<div className="bg-tribal-pattern opacity-8">
  Cultural element background
</div>

// Geometric divider
<div className="h-1 bg-geometric-divider">
  Section divider
</div>
```

### Pattern Guidelines

- Use patterns at **low opacity** (5-10%) to maintain readability
- Apply to backgrounds, section dividers, or subtle overlays
- Keep patterns **authentic and ceremonial** rather than overly decorative
- Patterns use design system colors (earth brown, ancient gold)

## Iconography & Details

### Icon Style

**Characteristics:**
- **Minimal**: Clean, simple iconography
- **Rounded**: Soft, organic appearance with rounded line caps
- **Hand-crafted feel**: Resembling carvings or hand-drawn symbols
- **Colors**: Gold or green for icons and separators

### Icon Usage

```tsx
// Icons automatically inherit organic styling
<Button>
  <Icon /> Action
</Button>

// Gold accent icons
<div className="icon-gold">
  <Icon />
</div>

// Green accent icons
<div className="icon-green">
  <Icon />
</div>

// Organic icon appearance
<div className="icon-organic">
  <Icon />
</div>
```

### Icon Colors

- **Primary buttons**: Icons use foreground color (earth brown on gold)
- **Secondary buttons**: Icons use foreground color (warm cream on green)
- **Accent icons**: Use `.icon-gold` for golden icons, `.icon-green` for green icons
- All icons use rounded line caps and joins for organic feel

### Links & Interactive Elements

All links and interactive elements include:

- **Rounded corners**: Using design system radius
- **Soft shadows on hover**: Subtle drop shadow with gold tint
- **Smooth transitions**: 200ms ease transitions
- **Focus states**: Gold ring outline for accessibility

```tsx
// Links automatically have hover glow
<Link href="/path">Link with glow</Link>

// Disable glow if needed
<Link href="/path" className="no-glow">Link without glow</Link>
```

## Resources

- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `src/app/globals.css`
- **Design Tokens**: CSS custom properties in `:root` and `.dark`
- **Fonts**: Playfair Display (primary), Lato (secondary) via Next.js font optimization

