# Twin Layout Specification

The following applies to layout under the `.html.layout-twin` class.

**On mobile**, all containers except `nav` are stacked. In the case of the `header`, `main`, `aside`, and `footer`, a container's height scales with its content.

**consider removing the `aside` from the DOM on mobile** to be shown on button press.

The `nav` element is hidden from view. Consider position: absolute combined with other rules to display it on mobile.

**On tablet, desktop, and widescreen** widths `main` and `aside` take up equal proportions.
