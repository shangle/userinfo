# UserInfo Project Roadmap

## Technical Tasks (Priority)
- [x] Add unit tests for detection logic.
- [x] Add CI/CD for automatic GitHub Pages deployment.

## Core Updates
- [x] Remove "Created by ChoiceOne" branding.
- [x] Add IP Address, ISP, and Geolocation info.
- [x] Major README overhaul (pitching as a secure support tool).
- [x] Componentize the UI (Hero, Card, etc.).
- [x] **Add "Common Problems" section** (Cookies, VPN, Tor).
- [x] Implement "Extension Toggle" system (via Query Params & Link Generator).
- [x] UI Review & Polishing (Responsive grid, accessible labels).

## Product Ecosystem & Marketing Suite
- [x] **Marketing Landing Page:** Professional product pitch with features/benefits.
- [x] **Interactive Tutorials:** Walkthroughs for support staff on how to use UserInfo.
- [x] **Knowledge Base:** Detailed explanations of what each diagnostic flag means.
- [x] **Training Materials:** PDF/Video scripts for onboarding new support teams.
- [x] **Case Studies:** Real-world examples of how UserInfo reduces support time.
- [x] **Sales Deck:** Presentation materials for selling UserInfo to enterprise clients.

## Completed Extensions
- [x] **Network Performance:** Ping, Download speed, latency check.
- [x] **Security Check:** Detect if the user is using a VPN, Tor, or proxy.
- [x] **Cookie Health:** Detailed check for cookie-blocking settings.
- [x] **JS/Browser Capabilities:** WebGL, Canvas, Service Worker support.
- [x] **Ad-Blocker Detection:** Inform users if an ad-blocker may be breaking the site.
- [x] **Screen & Display Info:** Color depth, refresh rate, orientation.
- [x] **Storage Diagnostics:** LocalStorage vs. SessionStorage limits.
- [x] **Time & Sync:** Check if the user's system clock is out of sync.
- [x] **Accessibility Audit:** High contrast, reduced motion, font scaling detection.
- [x] **Device Hardware:** Battery status (if available), CPU architecture.
- [x] **Social Sharing Context:** How the link appears in chat/social apps.
- [x] **Print-Friendly View:** A "Generate PDF" option for users to save their results.

## Advanced Diagnostic & Security Extensions (Next Gen)
- [x] **WebRTC Connectivity & Leak Test:** Diagnoses real-time communication issues and identifies potential local/public IP leaks.
- [x] **GPU & Hardware Acceleration Audit:** Provides detailed GPU renderer information and identifies if hardware acceleration is enabled.
- [x] **Network Protocol & HTTP/3 Check:** Detects if the network supports modern protocols like QUIC/HTTP3 for faster, more secure connections.
- [x] **Extension Conflict Detection:** Identifies if third-party browser extensions are injecting styles or scripts that could cause application errors.

- [x] **Memory & Threading Diagnostics:** Checks available JS heap memory and verifies Web Worker/SharedArrayBuffer support for high-performance tasks.
- [x] **SSL/TLS Deep Dive:** Reports the encryption protocol (e.g., TLS 1.3) and cipher suite used for the current session.
- [x] **Media Capabilities & DRM Check:** Checks for Widevine/PlayReady support and HDCP status, essential for troubleshooting video streaming.
- [x] **Font Availability & Rendering:** Detects if critical system fonts are present and how they are being rendered.
- [ ] **Peripheral & Input Scan:** Reports connected gamepads, MIDI devices, or specialized input hardware that might interfere with web apps.
- [ ] **Client-Side Security Header Check:** Detects if `cross-origin-isolated` is active and audits other client-side security flags.
- [ ] **Battery Stress & Power Mode:** Identifies if the device is in "Power Saving" mode which may throttle JavaScript performance.
- [ ] **Automation & Bot Detection:** Checks for `navigator.webdriver` and other flags to see if the browser is being controlled by automation tools.
