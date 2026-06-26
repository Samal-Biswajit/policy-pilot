# DESIGN.md

## Purpose

This document defines the visual identity, design principles, user experience guidelines, and implementation constraints for the Biswajit Samal Portfolio website.

The goal is to ensure consistent design decisions throughout development.

This document should be treated as the visual source of truth.

---

# Core Design Philosophy

The portfolio should communicate:

> Engineering + Creativity

The website should feel memorable without sacrificing usability.

Visitors should immediately recognize that this is not a generic developer portfolio while still being able to quickly find important information.

---

# Design Inspiration

Primary Inspiration:

marjoballabani.me

Reference Assets:

```text
/reference/
├── README.md
├── repo-link.txt
├── screenshots/
```

Use the reference portfolio for inspiration.

Do NOT directly copy:

* Content
* Projects
* Personal Story
* Timeline Entries

The final result should feel inspired by the reference while remaining clearly identifiable as Biswajit's portfolio.

---

# Visual Personality

Balance:

```text
50% Professional
50% Creative
```

Desired Feelings:

* Memorable
* Playful
* Bold
* Technical
* Personal
* Modern
* Handcrafted

Avoid:

* Corporate
* Generic
* Overly Minimal
* Overly Decorative
* Startup Landing Page Aesthetic
* SaaS Dashboard Aesthetic

---

# Design Language

Primary Style:

Neo-Brutalism

Characteristics:

* Thick borders
* High contrast
* Flat colors
* Offset shadows
* Strong typography
* Playful interactions
* Visible structure

The design should feel intentional rather than polished.

Imperfection is acceptable when it adds personality.

---

# Color System

Primary Colors:

```css
--yellow
--pink
--cyan
--green
--black
--white
```

Suggested Palette:

Yellow:
Primary Accent

Pink:
Secondary Accent

Cyan:
Technology Elements

Green:
Success States

Black:
Borders, Text, Shadows

White:
Background

Requirements:

* High contrast
* Accessible text
* Consistent usage

Avoid:

* Heavy gradients
* Glassmorphism
* Excessive blur effects

---

# Typography

Primary Font:

Space Grotesk

Usage:

* Headings
* Body Text
* Navigation

Secondary Font:

Space Mono

Usage:

* Technology Labels
* Code Elements
* GitHub Sections
* Terminal Components

Optional Accent Font:

Caveat

Usage:

* Handwritten Notes
* Decorative Labels

Do not overuse.

---

# Avatar

Avatar Type:

Illustrated Avatar

Requirements:

* Friendly
* Recognizable
* Personal
* Consistent with Neo-Brutalism

Do NOT use:

* Professional Headshot
* Corporate Portrait
* AI-generated stock avatars

The avatar should become a recognizable brand element.

---

# Layout Philosophy

Single Page Portfolio

Navigation should scroll between sections.

Sections:

```text
Hero/About
Projects
GitHub Activity
Skills
Timeline
Contact
```

Future Sections:

```text
Certificates
Experience
Research
Achievements
Blog
```

Future sections should integrate seamlessly without redesigning the layout.

---

# Hero Section

Purpose:

Create immediate connection.

The hero section should also function as the About section.

Must Include:

* Name
* Headline
* Short Introduction
* Avatar
* Social Links
* Resume CTA
* Project CTA

Visual Priority:

1. Name
2. Headline
3. Resume Button
4. Intro Text
5. Social Links

The hero should feel welcoming and personal.

---

# Project Section

Most Important Section.

Purpose:

Demonstrate technical ability and product-building capability.

Project Cards Must Include:

* Project Name
* Description
* Tech Stack
* GitHub Link
* Live Demo Link
* Status

Card Style:

* Large
* Bold
* Interactive
* Easy to scan

Avoid:

* Dense text
* Long paragraphs
* Hidden information

---

# GitHub Activity Section

Include:

GitHub Contribution Heatmap

Purpose:

Provide visual proof of consistency.

Design Requirements:

* Match portfolio theme
* Responsive
* Easy to read

This section should feel like a supporting element, not the main attraction.

Projects remain more important.

---

# Skills Section

Purpose:

Display technical breadth.

Structure:

```text
Languages
Backend
Frontend
Databases
DevOps
AI
Tools
```

Visual Style:

* Tags
* Chips
* Cards

Avoid:

* Progress Bars
* Fake Percentage Ratings
* Arbitrary Skill Scores

---

# Timeline Section

Purpose:

Show growth and progression.

Message:

> Consistent Improvement

> Serious About Engineering

The timeline should combine:

* Academic Journey
* Technical Journey

Visual Style:

* Vertical Timeline
* Cards
* Milestones

Avoid:

* Complex Animations
* Interactive Maps
* Excessive Visual Effects

---

# Contact Section

Primary Conversion Point.

Purpose:

Encourage communication.

Must Include:

* Contact Form
* Social Links
* Email Access

Fields:

* Name
* Email
* Message

CTA:

```text
Send Message
```

The contact section should feel approachable and inviting.

---

# Animation Philosophy

Animations should support content.

Never distract from content.

Priority:

1. Usability
2. Readability
3. Personality

Then animation.

---

# Approved Animations

* Hover Effects
* Scroll Reveals
* Fade In
* Typing Effect
* Highlight Effects
* Subtle Motion

---

# Forbidden Animations

* Excessive Parallax
* Complex Physics Simulations
* Interactive Maps
* Snake Games
* Book Flip Effects
* Treasure Maps
* Long Intro Animations

If an animation does not improve the user experience, remove it.

---

# Responsiveness

Requirements:

Desktop First

Must also support:

* Laptop
* Tablet
* Mobile

No section should break on smaller screens.

Touch interactions should work properly.

---

# Accessibility

Requirements:

* Semantic HTML
* Keyboard Navigation
* Proper Contrast Ratios
* Accessible Form Inputs

The website should remain usable without animations.

---

# Performance

Goals:

* Fast Initial Load
* Minimal Dependencies
* Responsive Interactions

Avoid:

* Unnecessary Packages
* Heavy Libraries
* Large Asset Files

---

# Design Success Criteria

A successful design should make visitors think:

"This person combines engineering with creativity."

The website should feel:

* Memorable
* Personal
* Professional
* Technically Strong

while remaining easy to navigate and recruiter-friendly.
