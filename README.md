# Grail Site Layouts using CSS

## Elements

The constituent elements of a layout correspond to the semantic elements commonly used on most websites. It is recommended, but not required, to match the classname with the HTML element for proper semantics (e.g., `<main class="main">`). The following are the recommended elements and their corresponding classes:

- `<html class="html">`
- `<body class="body">`
- `<nav class="nav">`
- `<aside class="aside">`
- `<footer class="footer">`

## Inner Containers

It is recommended to nest inner elements within each of the main elements on the page.

## Principles

1. Consistent elements and containers are used in all layouts to keep things simple and manageable.
2. Layouts are toggled only by changing the class on the containing element, typically the `html` tag.
3. No elements are removed on any screen resolution. If you want to change the position or remove a layout, you can do so with your custom styles.
4. This package does not include a CSS reset, so you will need to include your own.

## Layouts

1. Single - a stacked layout on all screen sizes.
2. Twin - a layout with two equally sized content containers (main, aside).
3. Standard - a layout with one large centered container (main), and smaller left-hand (nav) and right-hand (aside) containers on desktop screens.
