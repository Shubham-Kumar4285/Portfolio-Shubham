# Image Structure Documentation

This document describes the organized image structure for the portfolio project.

## Directory Structure

```
public/
├── favicon.png                          # Site favicon
├── profile.png                          # Profile picture for About section
├── preview.PNG                          # Portfolio preview/thumbnail
│
├── hero/                                # Hero section assets
│   ├── background/
│   │   ├── hero-bg.jpg                 # Main hero background (dark/universal)
│   │   └── hero-bg-light.jpg           # Light theme hero background
│   └── subject/
│       ├── hero-subject.png            # Main hero subject image (transparent PNG)
│       └── hero-subject-alt.png        # Alternative hero subject image
│
└── projects/                            # Project screenshots organized by project
    ├── reel-pick/
    │   └── screenshot.png              # Reel Pick app screenshot
    ├── recipe-app/
    │   └── screenshot.png              # Recipe App screenshot
    └── voyagex/
        └── screenshot.png              # VoyageX app screenshot
```

## Naming Conventions

### Hero Images
- **Background**: `hero-bg.jpg` (main), `hero-bg-light.jpg` (light theme variant)
- **Subject**: `hero-subject.png` (main), `hero-subject-alt.png` (alternative)

### Project Images
- **Location**: `/projects/{project-slug}/`
- **Naming**: `screenshot.png` (main screenshot)
- **Project Slugs**: Use kebab-case (lowercase with hyphens)
  - `reel-pick` for "Reel Pick - Movie Recommender app"
  - `recipe-app` for "Recipe App"
  - `voyagex` for "VoyageX – AI Travel Planner App"

### Profile Images
- **Profile Picture**: `profile.png` (root level)
- **Preview/Thumbnail**: `preview.PNG` (root level)

## Image Requirements

### Hero Background
- **Format**: JPG
- **Recommended Size**: 1920x1080 or higher
- **Optimization**: Compress for web (quality 80-85%)
- **Purpose**: Full-screen background with parallax effect

### Hero Subject
- **Format**: PNG with transparency
- **Recommended Size**: 800-1200px height
- **Requirements**: Clean cutout, no background
- **Purpose**: Layered between text for 3D effect

### Project Screenshots
- **Format**: PNG or JPG
- **Recommended Size**: 1200x800 or 16:9 aspect ratio
- **Optimization**: Compress for web
- **Purpose**: Project showcase in carousel/grid

### Profile Picture
- **Format**: PNG or JPG
- **Recommended Size**: 400x400 or higher (square)
- **Purpose**: About section profile display

## Adding New Projects

When adding a new project:

1. Create a new folder in `public/projects/` with kebab-case name
2. Add `screenshot.png` to the folder
3. Update `data/portfolio.json` with the new image path:
   ```json
   {
     "title": "Project Name",
     "image": "/projects/project-slug/screenshot.png",
     ...
   }
   ```

## Adding Multiple Screenshots

For projects with multiple screenshots:

```
public/projects/project-name/
├── screenshot.png          # Main screenshot
├── screenshot-1.png        # Additional screenshot 1
├── screenshot-2.png        # Additional screenshot 2
└── demo.gif               # Optional demo GIF
```

## Image Optimization Tips

1. **Compress images** before adding to the project
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: < 200KB for screenshots, < 500KB for backgrounds

2. **Use appropriate formats**
   - JPG for photos and backgrounds (no transparency needed)
   - PNG for images requiring transparency (hero subject, logos)
   - WebP for modern browsers (optional, with fallbacks)

3. **Responsive images**
   - Next.js Image component handles optimization automatically
   - Provide high-resolution source images (2x display size)

4. **Lazy loading**
   - All images use Next.js Image component for automatic lazy loading
   - Critical images (hero, above-fold) use `priority` prop

## Migration Notes

### Old Structure → New Structure

| Old Path | New Path | Purpose |
|----------|----------|---------|
| `/wallpapers/universal-wallpaper.jpg` | `/hero/background/hero-bg.jpg` | Hero background |
| `/wallpapers/light-wallpaper.jpg` | `/hero/background/hero-bg-light.jpg` | Light theme bg |
| `/images/toji_2.png` | `/hero/subject/hero-subject.png` | Hero subject |
| `/images/toji-fushiguro.png` | `/hero/subject/hero-subject-alt.png` | Alt subject |
| `/r13.png` | `/projects/reel-pick/screenshot.png` | Project image |
| `/r31.png` | `/projects/recipe-app/screenshot.png` | Project image |
| `/r21.png` | `/projects/voyagex/screenshot.png` | Project image |

### Deprecated Folders
- `/wallpapers/` - Moved to `/hero/background/`
- `/images/` - Moved to `/hero/subject/`
- Root-level project images (`r13.png`, etc.) - Moved to `/projects/`

## References Updated

The following files have been updated with new image paths:
- ✅ `data/portfolio.json` - Project image paths
- ✅ `app/page.jsx` - Hero section images
- ✅ `app/hero-demo/page.tsx` - Demo page images

## Maintenance

When updating images:
1. Keep the same filename to avoid breaking references
2. Or update all references in the files listed above
3. Maintain the directory structure for consistency
4. Document any new image categories in this file
