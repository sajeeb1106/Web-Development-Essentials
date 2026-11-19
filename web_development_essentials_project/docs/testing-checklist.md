# Cross-browser testing checklist

The following is a test plan. Mark each item only after you personally run it in the named browser; do not report an unperformed test as passed.

| Test | Chrome | Firefox | Edge |
|---|---|---|---|
| All six navigation links open the correct page | ☐ | ☐ | ☐ |
| Mobile menu opens and closes | ☐ | ☐ | ☐ |
| Home hero previous/next controls work | ☐ | ☐ | ☐ |
| Hero automatically advances | ☐ | ☐ | ☐ |
| Destination region filter updates cards | ☐ | ☐ | ☐ |
| Destination type and price filters combine correctly | ☐ | ☐ | ☐ |
| Reset filters restores all cards | ☐ | ☐ | ☐ |
| Booking estimate updates when package/add-ons/travellers change | ☐ | ☐ | ☐ |
| Group discount starts at five travellers | ☐ | ☐ | ☐ |
| Empty/invalid booking fields show inline errors | ☐ | ☐ | ☐ |
| Past travel date is rejected | ☐ | ☐ | ☐ |
| Contact form validates email and message length | ☐ | ☐ | ☐ |
| FAQ expands and collapses | ☐ | ☐ | ☐ |
| Back-to-top appears after scrolling | ☐ | ☐ | ☐ |
| Layout has no horizontal overflow at 375px, 768px and 1366px | ☐ | ☐ | ☐ |

## Suggested test data
- Booking date: yesterday (expect error), then a future date (expect valid date).
- Travellers: 1, 4, 5 and 8 (discount should begin at 5).
- Package prices: Explorer 6500, Comfort 10500, Signature 16000.
- Add-ons: hotel upgrade 1500/person; meal plan 800/person.
- Example: Comfort, 5 travellers, no add-ons = 5 × 10,500 = 52,500; 10% discount = 5,250; estimated total = 47,250 BDT.

## Responsive viewports
Check 375×812 (mobile), 768×1024 (tablet), 1366×768 (desktop). Also check keyboard-only navigation and browser zoom at 200%.
