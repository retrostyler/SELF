# Portfolio Website Design Guidelines for Arham Aqeel

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Dribbble and Behance portfolio presentations, with emphasis on clean layouts, large hero imagery, and sophisticated project showcases. Secondary influence from Notion's content organization and Linear's typography precision.

## Core Design Principles
1. **Visual Hierarchy Through Scale**: Use dramatic size contrasts to guide attention
2. **Generous Whitespace**: Let content breathe with purposeful negative space
3. **Content-First**: Every design element serves the story of Arham's multidisciplinary expertise
4. **Progressive Disclosure**: Reveal complexity gradually through interactions

---

## Typography System

**Font Families**:
- Primary: Inter (400, 500, 600, 700) for body text and UI elements
- Display: Poppins (600, 700) for headings and hero text

**Hierarchy**:
- Hero Headline: Poppins 700, 4xl (mobile) → 6xl-7xl (desktop)
- Section Titles: Poppins 600, 3xl-4xl
- Subsection Headings: Poppins 600, xl-2xl
- Project Titles: Poppins 600, 2xl
- Body Text: Inter 400, base-lg
- Captions/Metadata: Inter 500, sm, uppercase with letter-spacing
- CTAs: Inter 600, base-lg

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20, 24, 32 (p-4, m-8, gap-12, etc.)
- Component internal spacing: 4, 8
- Section padding (mobile): py-12 to py-16
- Section padding (desktop): py-20 to py-32
- Vertical rhythm between elements: 8, 12, 16, 24

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-6 lg:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy areas: max-w-4xl mx-auto

**Grid System**:
- Project Gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Skills Matrix: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
- Experience Timeline: Single column with offset imagery/icons
- Leadership Cards: grid-cols-1 md:grid-cols-2 gap-8

---

## Page Structure & Sections

### 1. Hero Section (90vh on desktop, auto on mobile)
**Layout**: Full-width with large professional headshot or workspace image on right 50% (desktop), stacked on mobile
- Left column: Name, tagline, two-line professional summary, dual CTA buttons
- Right column: High-quality portrait with subtle gradient overlay
- Floating achievement badges (e.g., "AIR-2 BAJA 2024", "60% Engagement Growth")
- Background: Subtle geometric pattern or gradient mesh

### 2. About Section
**Layout**: Two-column on desktop (40/60 split), stacked on mobile
- Column 1: Professional headshot (circular, 300px), current role, location, quick stats (Years of Experience, Projects Completed, Teams Led)
- Column 2: 3-4 paragraph bio highlighting dual expertise in Product Management and Mechanical Engineering, narrative arc from engineering to product thinking
- Below: Skills matrix with categorized tags using subtle pill-style badges with icons

### 3. Experience Timeline
**Layout**: Vertical timeline with alternating content
- Timeline spine: Vertical line with date markers
- Each role: Card with company logo placeholder, role title, duration, 3-4 bullet achievements with metrics highlighted
- Micro-interactions: Cards slide in on scroll, metrics count up on reveal

### 4. Featured Projects Showcase
**Layout**: Masonry-style grid for varied project types
- Project Cards: Large thumbnail/hero image, project title, category tags, short description (2 lines), "View Case Study" link
- Hover state: Gentle scale (1.02), subtle shadow increase
- Case Study Pages (separate routes):
  - Hero: Full-width project image/mockup
  - Context: Problem statement, role, timeline, team size
  - Process: 3-4 sections with headings, body text, supporting images
  - Results: Key metrics in large typography, before/after comparisons
  - Technical Details: Technologies, tools, methodologies in organized lists

**Project Categories** (with distinct visual treatment):
- Product Management: Customer Churn Prediction, Supply Chain Optimization
- Mechanical Engineering: MBAJA ATV, EBAJA ATV, Brake System Optimization
- Digital Marketing: Spacecord Campaigns, Blink Digital Analytics

### 5. Skills & Expertise Section
**Layout**: Tabbed interface or segmented cards
- Tabs: Product Management, Engineering, Marketing & Growth, Technical
- Each tab: Grid of skill cards with icon, skill name, proficiency indicator (use bars or dots)
- Tools logos: Actual tool logos in grayscale, color on hover

### 6. Leadership & Initiatives
**Layout**: Card grid (2 columns desktop, 1 mobile)
- Each card: Organization logo/icon, role title, duration, 3-4 key contributions
- Distinct visual treatment: PSI Racing (engineering-focused), TEDxNITTrichy (creative-focused), Festember (event-focused)

### 7. Contact Section
**Layout**: Split design (desktop), stacked (mobile)
- Left (40%): Contact methods, social links with icons, location, availability status ("Open to opportunities")
- Right (60%): Form with fields: Name, Email, Subject, Message, Submit button
- Form validation: Inline error states, success message animation
- Background: Subtle gradient or abstract shape element

### 8. Footer
**Layout**: Three columns (desktop), stacked (mobile)
- Column 1: Name/logo, one-line tagline
- Column 2: Quick links (About, Projects, Experience, Contact)
- Column 3: Social media icons, Resume download button
- Bottom bar: Copyright, "Built with [technologies]"

---

## Component Library

### Buttons
- Primary: Solid fill, rounded-lg, px-8 py-3, bold text, subtle shadow
- Secondary: Outline style with 2px border, same padding
- Icon Buttons: Square/circular, hover scale 1.05
- Glass buttons on images: backdrop-blur-md bg-white/10 border border-white/20

### Cards
- Project Cards: Rounded-xl, overflow-hidden, shadow-lg hover:shadow-2xl transition
- Experience Cards: Rounded-lg, border-l-4 (accent color), p-6, subtle shadow
- Skill Cards: Rounded-lg, p-4, border with hover lift effect

### Navigation
- Desktop: Horizontal navbar, sticky on scroll, backdrop-blur effect
- Mobile: Hamburger menu expanding to full-screen overlay
- Links: Smooth scroll to sections, active state indicated by underline/dot

### Tags/Badges
- Pill-shaped, rounded-full, px-3 py-1, text-sm, subtle background
- Category tags use accent colors, skill tags use muted tones

### Animations
- Page load: Staggered fade-in for hero elements (200ms delay between)
- Scroll reveals: Intersection Observer for section entrances, translate-y + opacity
- Hover states: Subtle scale/shadow changes, duration-300
- NO complex scroll-driven animations or parallax effects

---

## Images

**Hero Section**: 
- Large professional portrait or workspace photo (right 50% of hero on desktop)
- Resolution: 1200x1400px minimum, optimized for web
- Treatment: Subtle gradient overlay (linear-gradient from transparent to primary color at 80% opacity on bottom 20%)

**About Section**:
- Circular professional headshot, 300x300px
- High-quality, well-lit, professional attire

**Project Thumbnails**:
- 16:9 aspect ratio for consistency
- Mix of: CAD renders (ATV projects), dashboard screenshots (analytics projects), design mockups (marketing projects)
- Resolution: 800x450px minimum

**Case Study Images**:
- Process diagrams: 1200px wide
- Technical renders: 1000x600px
- Before/after comparisons: Side-by-side at 600x400px each

**Background Elements**:
- Subtle geometric patterns for section backgrounds (low opacity, 5-10%)
- Abstract gradient meshes for visual interest in empty spaces

---

## Content Management Considerations

**Admin Interface Design**:
- Simple form-based editor for each content type (Projects, Experience, Skills)
- WYSIWYG editor for rich text fields
- Image upload with preview and cropping
- Drag-and-drop reordering for projects/experience items
- Publish/draft status toggle

**Editable Elements**:
- All text content (bio, experience descriptions, project details)
- Project images and thumbnails
- Skills and proficiency levels
- Social links and contact information
- Achievement metrics and stats