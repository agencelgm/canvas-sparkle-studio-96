

## Add YouTube Video Embed to Hero Section

### What changes

Add a responsive YouTube video embed between the subheadline ("structuré et pilotable.") and the CTA buttons in the Hero component.

### File: `src/components/Hero.tsx`

Between line 38 (end of subheadline `</p>`) and line 40 (CTAs `<div>`), insert:

- A container `div` with `max-w-3xl mx-auto mb-8 sm:mb-10 px-2`
- Inside: a 16:9 aspect-ratio wrapper using `aspect-video` (Tailwind)
- An `<iframe>` with the YouTube embed URL, rounded corners, subtle border matching the design (`border border-border rounded-lg overflow-hidden`)
- A placeholder YouTube URL that you'll need to replace with your actual video link

### Technical details

- Uses native `<iframe>` embed — no extra dependencies
- `aspect-video` gives a clean 16:9 ratio on all screen sizes
- The iframe gets `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"` and `allowFullScreen`
- You'll need to provide your YouTube video URL so I can set the correct embed `src`

