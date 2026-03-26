# UserInfo: The Secure Support Diagnostic Tool

**UserInfo** is a professional, extensible, and privacy-first diagnostic tool designed for support teams to quickly gather technical details from users without the friction of manual explanations.

## 🚀 Why Use UserInfo?

- **Zero-Friction Support:** Users simply open a link and read a script or click one button to share their technical environment.
- **Privacy-First:** No data is sent to any server automatically. UserInfo is a client-side tool that only shares information when the user explicitly chooses to (via email or copy-paste).
- **Extensible Architecture:** Built with React and TypeScript, UserInfo is designed to be customized with "extensions" for specific support needs.
- **Modern & Friendly UI:** A clean, non-intimidating interface that guides users through troubleshooting steps.

## 🛠️ Key Features

- **Automated Detection:** Browser name/version, OS, Device Type, and more.
- **Network Insights:** Real-time IP address, ISP, and Geolocation detection.
- **Custom Support Links:** Support teams can generate pre-filled links (email and subject) to make the user experience even smoother.
- **Contextual Help:** Dynamic troubleshooting steps based on the user's specific browser and OS.

## 🔌 Extensions (Coming Soon)

UserInfo is moving toward a modular "Extension" system where you can enable or disable specific diagnostic modules via the URL:
- **`?ext=network`** - Detailed network diagnostics.
- **`?ext=banking`** - Specific checks for secure banking platforms (Cookies, VPN detection).
- **`?ext=performance`** - Client-side performance metrics.

## 📦 Getting Started

1. **Host it anywhere:** UserInfo is a static site. Deploy it to GitHub Pages, Netlify, or your own server.
2. **Generate a link:** Use the link generator at the bottom of the page.
3. **Send to user:** Your user gets a clear, guided diagnostic experience.

---

*UserInfo is an open-source project dedicated to making technical support more accessible and secure.*
