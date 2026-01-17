# HK Technologies Website

This is a NextJS starter project for HK Technologies, built in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework, for all its styling. Instead of writing custom CSS files for each component or page, we apply pre-existing utility classes directly in the component files (`.tsx`). This approach is modern, highly efficient, and helps keep the project maintainable and performant.

### Utility Classes

Because we use Tailwind, it is not practical to document every CSS class in this file, as most are part of the framework itself. For a complete reference of all available utility classes (e.g., `py-16`, `text-center`, `grid`), please refer to the official **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**.

### Custom Styles & Theme

A few project-specific styles and the overall theme are defined in `src/app/globals.css`.

#### Custom Utility Classes

These are custom classes that combine several Tailwind utilities for reuse.

*   `.glassmorphic-card`: Creates a semi-transparent "frosted glass" effect. Used for card components throughout the site.
*   `.gradient-text`: Applies a gradient effect to text, making it stand out. Used for main headlines.

#### Theme Colors (CSS Variables)

The website's color palette is defined using CSS variables in `src/app/globals.css`. These variables are used by Tailwind and our UI components (`shadcn/ui`) to ensure a consistent look and feel. Modifying these variables will change the colors across the entire site.

*   `--background`: The primary background color of most pages.
*   `--foreground`: The primary color for body text.
*   `--primary`: The main accent color used for buttons, links, and important highlights.
*   `--secondary`: A secondary color used for the background of some sections to create visual separation.
*   `--accent`: A complementary accent color, often used in gradients or for secondary highlights.
*   `--card`: The background color for card elements.
*   `--muted`: A more subtle color for less important text or elements.
*   `--border`: The color used for borders and dividers.
*   `--input`: The background color for input fields.
*   `--ring`: The color of the focus ring around interactive elements.
