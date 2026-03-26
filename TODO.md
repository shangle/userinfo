# UserInfo Project Roadmap

## Core Updates (Next up)
- [x] Remove "Created by ChoiceOne" branding.
- [x] Add IP Address, ISP, and Geolocation info.
- [ ] **Add "Common Problems" section** (Cookies, VPN, Tor).
- [ ] Implement "Extension Toggle" system (via Query Params & Link Generator).
- [x] Major README overhaul (pitching as a secure support tool).
- [ ] UI Review & Polishing (Responsive grid, accessible labels).

## Extension Ideas (Future Growth)
1. **Network Performance:** Ping, Download speed, latency check.
2. **Security Check:** Detect if the user is using a VPN, Tor, or proxy.
3. **Cookie Health:** Detailed check for cookie-blocking settings.
4. **JS/Browser Capabilities:** WebGL, Canvas, Service Worker support.
5. **Ad-Blocker Detection:** Inform users if an ad-blocker may be breaking the site.
6. **Screen & Display Info:** Color depth, refresh rate, orientation.
7. **Storage Diagnostics:** LocalStorage vs. SessionStorage limits.
8. **Time & Sync:** Check if the user's system clock is out of sync.
9. **Accessibility Audit:** High contrast, reduced motion, font scaling detection.
10. **Device Hardware:** Battery status (if available), CPU architecture.
11. **Social Sharing Context:** How the link appears in chat/social apps.
12. **Print-Friendly View:** A "Generate PDF" option for users to save their results.

## Technical Tasks
- [ ] Componentize the UI (Hero, Card, HelpSection, etc.).
- [ ] Add unit tests for detection logic.
- [ ] Add CI/CD for automatic GitHub Pages deployment.
