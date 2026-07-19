
# InstantViral v2

# Document 03 — Design System

## Status
- Version: 1.0
- Status: Draft

# Purpose

Define a single design system that every page and component follows. Cursor must implement this system exactly and should not invent styles.

# Design Philosophy

Hybrid design inspired by:
- Stripe (layout & trust)
- Linear (cards & interactions)
- Vercel (typography)
- Notion (readability)

Keywords:
- Premium
- Minimal
- Modern
- Trustworthy
- Spacious
- Fast

Avoid:
- Loud gradients
- Neon colors
- Heavy shadows
- Clutter
- Inconsistent spacing

# Brand Personality

- Professional
- Helpful
- Transparent
- Confident
- Human

# Color System

Primary:
- Neutral background
- Neutral foreground
- Brand accent
- Success
- Warning
- Error

Platform colors are accents only:
- Instagram
- TikTok
- YouTube
- Facebook

Never build entire sections with platform colors.

# Typography

Preferred fonts:
- Geist
- Inter (fallback)

Heading hierarchy:
H1
H2
H3
H4

Body:
- Large
- Default
- Small

Use consistent line heights.

# Layout

Max width:
1280px

Containers:
- xs
- sm
- md
- lg
- xl

Mobile-first responsive design.

# Spacing

Use an 8px spacing system.

No arbitrary spacing values.

# Border Radius

Small
Medium
Large
Extra Large

Keep consistency across all cards and inputs.

# Shadows

Use subtle shadows only.

Hover elevation should be minimal.

# Buttons

Variants:
- Primary
- Secondary
- Outline
- Ghost
- Destructive

Sizes:
- Small
- Medium
- Large

# Cards

Cards should include:
- Rounded corners
- Light border
- Soft shadow
- Consistent padding

# Forms

Inputs
Selects
Textarea
Checkbox
Radio
Switch

Shared validation states.

# Navigation

Sticky desktop navbar.

Responsive mobile drawer.

Mega menus generated from data.

# Footer

Six-column responsive footer.

Generated from footer.ts.

# Icons

Use Lucide React only.

# Motion

Framer Motion.

Use:
- Fade
- Slide
- Scale
- Stagger

Avoid excessive animations.

# Accessibility

WCAG friendly.

Visible focus states.

Keyboard navigation.

Semantic HTML.

# Images

Use next/image.

Placeholder images only until final assets are provided.

# Component Rules

Every reusable component must:
- Accept props
- Be typed
- Be reusable
- Avoid duplicated logic

# Tailwind Rules

Create design tokens.

No inline styles.

Prefer utility classes.

# Cursor Implementation Rules

Read this document before creating UI.

Implement a reusable design system.

Create:
- Theme tokens
- Typography tokens
- Button variants
- Card variants
- Form styles
- Section container
- Responsive utilities

Do not create final page content.

Stop after the design system is complete.

# Acceptance Checklist

- Theme configured
- Typography configured
- Buttons created
- Cards created
- Form controls created
- Responsive containers created
- Motion utilities ready
- Design tokens centralized
- Ready for homepage implementation
