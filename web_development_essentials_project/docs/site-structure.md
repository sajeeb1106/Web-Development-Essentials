# Site structure / navigation flow

```text
                         HOME (index.html)
                         /   |   |   \
                        /    |   |    \
                       v     v   v     v
                 ABOUT   DESTINATIONS  PACKAGES
                   |          |           |
                   |          |           |
                   +----------+-----------+
                              |
                              v
                       BOOKING (booking.html)
                              |
                              v
                       CONTACT (contact.html)

Global navigation on every page:
Home | About | Destinations | Packages | Booking | Contact

Destination page:
- Region filter + tour-type filter + maximum-price range
- Destination cards
- In-page sample itinerary anchors for each destination

Booking page:
- User input -> client-side validation
- Package + traveller count + add-ons -> live estimate
- Group size >= 5 -> 10% discount
- Valid submit -> demo confirmation (no server submission)
```
