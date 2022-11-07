# Grail Site Layouts with CSS

## Elements

The consistuent elements of a given layout correspond to the semantic elements used on most websites. It's recommended but not required that for proper semantics, you match the classname with the html element (ex. `<main class="main">`). These elements and their corresponding elements are as follows:

- `<html class="html">`
- `<body class="body">`
- `<nav class="nav">`
- `<aside class="aside">`
- `<footer class="footer">`

## Inner containers

It's recommended that you nest inner elements within each of the main elements on the page.

## Principals

1. The same elements and contianers are used in all layouts. We cannot reason through layout change unless we keep things simple and consistent.
2. Layouts are toggled only by changing the class on the containing element (generally, this is intended to be `html`).
3. No elements are removed on any screen resolution. If you want to change a layout's position or remove it from a layout, it can be done with your custom styles.
4. This package does not contain a css reset. You'll need to include your own.

## Layouts

1. Single - a stacked layout on all screen sizes.
2. Twin - a layout with two equal sized content containers (main, aside).
3. Standard - a layout with one large centered container (main), and on desktop smaller lefthand (nav) and righthand (aside) containers
