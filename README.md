# Bhavesh Jethani — Portfolio Website

Pixel-matched rebuild of the Figma portfolio design using React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP-ready structure, Lenis smooth scroll, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Images

All imagery in `public/images` is taken directly from your `portfilo_img.zip` — nothing generated or replaced:

| File | Used in |
|---|---|
| `hero.jpeg` | Hero illustration |
| `about.jpg` | About avatar |
| `poster-1.png` | Selected Works — Coffee Cafe in Mansarovar |
| `poster-2.png` | Selected Works — BTech Admission Campaign |
| `poster-3.png` | Selected Works — Kohler Showroom Jaipur |
| `poster-4.png` | Selected Works — Villa Painting in Jaipur |
| `poster-5.png` | Selected Works — Best Painting Company in Jaipur |
| `poster-6.png` | Selected Works — Interior Painting Jaipur |

Poster order in the grid matches the screenshot exactly: poster-3, poster-2, poster-4, poster-1, poster-6, poster-5.

## One thing to double check

The screenshot's contact-section email/phone text was too low-resolution to read reliably, so `components/Contact.tsx` currently has a **placeholder email** (`hello@bhaveshjethani.com`). Swap in your real email/contact details there.

## Structure

```
app/            # App Router: layout, page, global styles
components/     # Navbar, Hero, About, Services, SelectedWorks, Contact, Footer, SmoothScroll, PageLoader, ScrollProgress
lib/data.ts     # Nav links, services, and works content
public/images/  # Your original assets, untouched
```
