# Sundarban Trails — Tour & Travel Agency Website

A responsive, six-page front-end prototype for the CIS 133L Web Development Essentials Lab assignment.

## Pages
1. `index.html` — homepage, hero slider, welcome section and featured destinations.
2. `about.html` — agency overview, mission, values and staff profiles.
3. `destinations.html` — six destination cards, region/type/maximum-price filters and sample itineraries.
4. `packages.html` — package comparison table, inclusions and exclusions.
5. `booking.html` — booking inquiry form, client-side validation and live cost estimator.
6. `contact.html` — office details, validated message form and FAQ accordion.

## Files
- `style.css`: one external responsive stylesheet.
- `app.js`: one external JavaScript file for all interactions.
- `docs/`: site structure diagram, critical evaluation and testing checklist.

## Run locally
No build tools or dependencies are required. Open `index.html` in a modern browser. For best results, use VS Code with the Live Server extension and open the project folder.

## Booking estimate logic
The selected package price and optional add-ons are multiplied by the traveller count. A 10% discount is applied to the subtotal when the group has at least five travellers. The displayed amount is an estimate only.

## Important prototype note
This is a client-side academic prototype. The forms validate input and display demo confirmation messages, but do not send data to a server, accept payment or create real reservations. Prices and contact details are illustrative. Replace them with verified agency information before any real-world use.

## External resources
Google Fonts and Unsplash image URLs are loaded over the internet. If offline, the website still works but may use fallback fonts and images may not load.
