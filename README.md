# Portfolio — Next.js 14

Premium multi-page portfolio for AI-powered web developers & automation engineers. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, dark/light modes, command palette (⌘K), scroll-triggered animations, and more.

## ✨ Features

- **Multi-page structure** — Dedicated pages for Home, Work, Services, About, Blog, FAQ, Contact
- **Dynamic routes** — `/work/[slug]` case study details, `/blog/[slug]` blog posts
- **Dark + Light mode** — With properly designed alternating section backgrounds in light
- **Command Palette** — ⌘K / Ctrl+K, keyboard shortcuts (T for theme, / for search, C for contact)
- **Editorial design** — Instrument Serif accents, section ornaments, magazine-style About
- **Animations** — Cursor glow, scroll progress, counter animations, parallax numbers, hero stagger, double-direction testimonial marquee, skills ticker
- **Accessibility** — `prefers-reduced-motion` respected throughout, WCAG AA contrast, keyboard navigation, focus rings
- **SEO** — JSON-LD (Person + ProfessionalService), per-page metadata, sitemap, robots.txt, OpenGraph

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/app
  layout.tsx              Root layout — fonts, theme, global UI, schema
  providers.tsx           Theme provider (next-themes)
  page.tsx                Home — all sections
  globals.css             All custom CSS (design tokens, components)
  not-found.tsx           Custom 404
  sitemap.ts              Auto-generated sitemap
  robots.ts               Robots.txt config
  /work
    page.tsx              All case studies
    /[slug]/page.tsx      Dynamic case study detail
  /services/page.tsx
  /about/page.tsx
  /blog
    page.tsx              Blog listing
    /[slug]/page.tsx      Dynamic blog post
  /faq/page.tsx
  /contact/page.tsx

/components
  Navbar.tsx              Sticky nav with theme + cmdk trigger
  Footer.tsx              Site footer
  GlobalUI.tsx            Command palette, cursor glow, scroll progress, scroll-to-top, keyboard shortcuts
  Counter.tsx             Animated number counter
  HugeBgNumber.tsx        Decorative background number with scroll parallax
  shared.tsx              SectionOrnament, BrowserMock
  /sections               Page sections (Hero, Services, About, etc.)

/content                  All content data (edit these to customize)
  services.ts
  projects.ts
  testimonials.ts
  faqs.ts
  posts.ts
  misc.ts                 Guarantees + process steps

/lib
  site.ts                 Site-wide config (name, email, social, stats)
  types.ts                TypeScript interfaces
```

## ✏️ Customization

All placeholder content is in `/lib/site.ts` and `/content/*.ts`. Search your project for `// TODO:` comments to find everything that needs updating.

### 1. Update site config — `lib/site.ts`

Your name, email, social URLs, location, stats, tech stack, client logos, bio.

### 2. Case studies — `content/projects.ts`

Each project has:
- `slug` — URL slug
- `num` — Display number (01, 02…)
- `clientType` — e.g. "SaaS · Germany"
- `title` + `titleAccent` (italic serif accent word)
- `pitch` — One-line summary
- `problem`, `solution` — Paragraphs
- `metrics` — Array of `{ value, label }` (e.g. "0.9s" / "LCP · from 8.2s")
- `techStack` — Pills
- `mockType` — `dashboard` | `workflow` | `chat` (renders different browser mockups)

### 3. Testimonials — `content/testimonials.ts`

Two rows (`testimonialsRow1`, `testimonialsRow2`) for the double-direction marquee. 4 items per row recommended.

### 4. Blog posts — `content/posts.ts`

Each post has:
- `slug`, `title`, `titleAccent`, `excerpt`, `category`, `date`, `readTime`
- `featured: true` — One post appears as the featured hero card
- `coverClass` — `blog-cover-1` | `blog-cover-2` | `blog-cover-3`
- `icon` — Lucide icon name
- `content` — Markdown-lite content (supports `##` headings, `###` subheadings, `- lists`, \`\`\`code blocks\`\`\`, paragraphs)

### 5. Services — `content/services.ts`

Services list shown on `/services` and home. First service is "featured" (purple left border).

### 6. FAQs — `content/faqs.ts`

Accordion questions. Home shows first 6; `/faq` shows all.

### 7. Replace photo

In `components/sections/About.tsx`, the current `.about-photo` div renders a gradient block with your initial. To use a real photo:

```tsx
// Replace:
<div className="about-photo">
  <div className="about-photo-initial">{site.initial}</div>
</div>

// With:
import Image from 'next/image';
<div className="relative aspect-[4/5] rounded-card overflow-hidden border border-[var(--border)]">
  <Image
    src="/your-photo.jpg"
    alt="Your Name"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 340px"
    priority
  />
</div>
```

Add `public/your-photo.jpg` to the project.

## ⌨️ Keyboard Shortcuts

- `⌘K` / `Ctrl+K` or `/` — Open command palette
- `T` — Toggle theme (dark ↔ light)
- `C` — Jump to contact
- `Esc` — Close palette

Shortcuts are disabled when typing in form fields.

## 🎨 Design Tokens

All colors, spacing, and typography live as CSS variables in `app/globals.css`. Change these to rebrand:

```css
:root, [data-theme='dark'] {
  --primary: #673DE6;       /* Purple — main brand color */
  --accent:  #CCFF00;       /* Lime — used on 3 strategic CTAs only */
  --background: #0A0A0F;
  /* ... */
}
```

Hostinger-inspired palette — change `--primary` and `--accent` for different branding.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add env var: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
4. Deploy

### Netlify / Other

```bash
npm run build
```

Output is in `.next/`. Follow your host's Next.js deployment guide.

## 📊 Performance Targets

- Lighthouse: 95+ (Performance, Accessibility, Best Practices, SEO)
- LCP < 1.5s
- CLS < 0.1
- TBT < 200ms

## 📝 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Inter, JetBrains Mono, Instrument Serif (via `next/font`)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Animations**: CSS + Intersection Observer + requestAnimationFrame

## 🛠 Future Enhancements

- [ ] MDX blog posts (currently using simple markdown-in-strings)
- [ ] CMS integration (Sanity, Contentful, etc.)
- [ ] Contact form via API route + email service (Resend, Mailgun)
- [ ] Analytics (Plausible, Vercel Analytics)
- [ ] RSS feed for blog
- [ ] Newsletter signup integration

## 📄 License

Personal portfolio — adapt for your own use.

---

Built with Next.js · Hosted on Vercel · Powered by _too much chai_ ☕
