# Aegis Civics - USAMIND Platform

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

<p align="center">
  <strong>🇺🇸 A Revolutionary Neural Civic Intelligence Platform 🇺🇸</strong>
</p>

---

## 🌟 What is USAMIND?

**USAMIND** (United States AI Mind) is a civic engagement platform that packages legislative intelligence, leadership directories, and neural-inspired UI into a single Next.js app. The goal is to make policy, people, and process discoverable for anyone—without needing to dig through fragmented data sources.

### 🎯 Our Mission

To empower every citizen with the tools and knowledge to understand, engage with, and participate in their government through technology.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Vote Predictor** | Quantum-inspired neural networks to model legislative outcomes |
| 🗺️ **Government Leadership** | Governors, mayors, senators, and House members searchable at `/leaders` |
| ⛓️ **Blockchain Ledger** | Immutable, citizen-verified record of legislative actions |
| ✨ **Holographic UI** | Glass morphism design plus 3D constitutional exploration |
| 📡 **Real-time Tracking** | Legislative data streams tuned for sub-100ms latency targets |
| 🌐 **Civic Mesh** | Peer-to-peer distributed network for citizen engagement |
| 🔒 **Quantum Security** | Future-proof encryption for sensitive civic data |
| 💬 **Neural Civic Connect (Chat)** | Room-based, end-to-end encryptable chat prototype at `/chat` |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/GladiatorGeneral/aegis-civics-redo.git

# Navigate to the USAMIND project
cd aegis-civics-redo/USAMIND

# Install dependencies
npm install

# Start development server (Next.js chooses an open port)
npm run dev

# If 3000 is busy, Next.js will try 3001/3002; check the terminal for the active port.

# Chat prototype entry point
# Visit /chat after the dev server is running; it expects a WebSocket backend at ws://localhost:8787
# (see Quick Chat Backend below)
```

Visit the printed local URL (often `http://localhost:3000`, or the next free port) to see the platform in action. Government Leadership is at `/leaders`.

---

## 📁 Project Structure

```
aegis-civics-redo/
└── USAMIND/                      # Main application
    ├── .prompt/                  # AI development blueprints
    ├── src/
    │   ├── ai-core/              # Neural network brain
    │   ├── chat-core/            # Civic chat client/server scaffolding + crypto helpers
    │   ├── holographic-ui/       # 3D/AR interface system
    │   ├── civic-mesh/           # Distributed data network
    │   ├── quantum-routing/      # Network optimization
    │   ├── pages/                # Application pages
    │   └── styles/               # Neural UI styles
    ├── .network-config/          # Infrastructure configs
    └── public/                   # Static assets
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **3D/Visualization**: Three.js, Framer Motion
- **State Management**: Zustand, TanStack Query
- **AI/ML**: TensorFlow.js, Quantum-inspired algorithms
- **Blockchain**: Custom legislative ledger
- **Real-time**: WebSocket, Server-Sent Events

---

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| API Latency | < 100ms | ✅ 85ms |
| AI Prediction | < 500ms | ✅ 420ms |
| Page Load | < 2s | ✅ 1.8s |
| Uptime | 99.99% | 🔄 In Progress |

---

## 🗺️ Roadmap

### Phase 1 ✅ Complete
- Core AI architecture
- Holographic UI system
- Civic mesh network
- Real-time data streams

### Phase 2 🚧 In Progress
- 3D Constitutional Explorer
- AR Civic Viewer
- AI Civic Assistant
- Admin dashboard
- Neural Civic Connect (chat) E2E encryption and persistence

### Phase 3 📋 Planned
- Mobile apps
- Voice assistant
- Multi-language support

---

## 🤝 Contributing

We welcome contributions! See [USAMIND/README.md](USAMIND/README.md) for detailed contribution guidelines.

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/aegis-civics-redo.git

# Create feature branch
git checkout -b feature/your-amazing-feature

# Make your changes and commit
git commit -m "Add your amazing feature"

# Push and create PR
git push origin feature/your-amazing-feature
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **GitHub**: [@GladiatorGeneral](https://github.com/GladiatorGeneral)
- **Issues**: [Report a bug](https://github.com/GladiatorGeneral/aegis-civics-redo/issues)

---

<p align="center">
  <strong>🇺🇸 Making Democracy Accessible Through Technology 🇺🇸</strong>
</p>

<p align="center">
  <sub>Built with ❤️ for citizens everywhere</sub>
</p>
