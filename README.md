# 🛍️ ShopNest - E-Commerce Platform With NgRx Signal Store

**ShopNest** is a cutting-edge, full-featured e-commerce platform built with **Angular 19** that leverages the latest innovations in reactive state management powered by **NgRx SignalStore**. Designed for exceptional performance and user experience, ShopNest offers real-time shopping cart updates, a favorites system, and a dynamic product catalog — all seamlessly synchronized with a robust **Node.js/Express** backend enabling secure, Stripe-powered checkout.

Built with out-of-the-box support for **Server-Side Rendering (SSR)**, ShopNest delivers blazing-fast initial page loads, improved SEO, and optimal cross-platform performance by intelligently detecting the execution environment (browser or server). Its modern architecture embraces standalone components, reactive signals, and an extensible theme system to create a responsive, accessible, and maintainable e-commerce experience.

Experience the future of Angular e-commerce with ShopNest — where advanced state management meets high-performance SSR and seamless integrations.


<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white">
  <img src="https://img.shields.io/badge/NgRx_SignalStore-BA55D3?style=for-the-badge&logo=ngrx&logoColor=white">
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=rxjs&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
</p>

<p align="center">
<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NtR1S43HQ5eObm6iR2KaLQ.png" alt="NgRx Architecture" width="600">
</p>

## 🌟 Why ShopNest?

ShopNest is a **showcase project** created to harness and demonstrate the power of **Angular 16+**, specifically featuring:

- **NgRx SignalStore** 📊: The next-level state management solution fully embracing Angular Signals for simple yet powerful state handling.
- **Server-Side Rendering (SSR)** 🌐: Boost SEO, improve performance, and provide seamless server/browser platform detection.
- **Modern UX/UI Patterns** ✨: Responsive design, dynamic dark/light theme toggling, real-time updates, and smooth loading experiences.

## 🎯 Main Purposes

- Explore Angular's new reactive paradigm with **Signal-based State Management**
- Build a production-grade e-commerce SPA with **optimized SSR**
- Demonstrate advanced architectural patterns like standalone components and reactive signals
- Develop a fully themed application with user-friendly toggling and persistent preferences
- Implement a secure checkout workflow using Stripe integration

## 🛠️ Technical Highlights

| Feature                      | Description                                                       |
|-----------------------------|-------------------------------------------------------------------|
| **Angular 16+**              | Standalone components, signals, and reactive forms               |
| **NgRx SignalStore** 📊       | Declarative, opinionated state management with native Signals     |
| **SSR & Platform Detection** 🌐 | Server vs client platform detection via `platform-detection.service.ts` for universal rendering |
| **Theme System** 🎨          | SCSS variables for light/dark themes + toggle component that stores user preference in `localStorage` |
| **State Persistence** 🔄      | Cart and favorites saved and restored in real-time                |
| **UI/UX**                   | Responsive layout, toast notifications, skeleton loaders, theme toggle |
| **API Backend** ⚙️           | Node.js/Express with Stripe integration for secure checkout       |

## 🚀 Features Overview

### Modern Angular Architecture ✨

- Fully **standalone components** — minimal module boilerplate
- Signal-powered reactive programming for **fine-grained performance**
- **Type-safe, declarative stores** with NgRx SignalStore  
  > *NgRx SignalStore* is a **robust and extensible state management solution** leveraging Angular’s new Signals. It lets you define stores declaratively, making state logic simple yet powerful and maintainable.

### Shopping Experience 🛒

- Dynamic product catalog with powerful **filtering and search**
- Real-time **shopping cart** with instant UI updates
- Wishlist & Favorites tracking with state sync and persistence
- Smooth and secure **checkout flow** powered by Stripe API integration

### Server-Side Rendering (SSR) & Platform Detection 🌍

- Universal app support for blazing fast first paint and enhanced SEO
- A robust **Platform Detection Service** (`platform-detection.service.ts`) to optimize behavior based on whether code runs on browser or server
- **Incremental Hydration:** Enables partial activation of page components on user interaction or viewport entry, significantly enhancing startup performance.

### Themes & User Preferences 🌗

- Fully themable UI with **predefined SCSS light/dark variables**
- Intuitive **Theme Toggle Component** allowing one-click switches
- Saves user choice persistently in **localStorage** for consistent UX

## 📂 Project Structure

```text
src/
├── app/
│   ├── features/
│   │   ├── cart/              # Cart logic + UI
│   │   │   ├── components/    # Cart-related views
│   │   │   └── store/         # NgRx SignalStore state logic
│   │   ├── favorites/         # Wishlist logic & components
│   │   ├── products/          # Catalog, search, filters
│   │   └── shared-ui/         # Layout components, header, etc.
│   ├── core/
│   │   ├── store/             # App-level reducers/meta-reducers
│   │   └── services/          # API clients, storage sync,Platform detection, theme management
│   └── app.routes.ts         # Route configuration
├── shared/
│   ├── models/                # Interfaces, types, enums
│   ├── pipes/                 # Custom pipes
│   └── ui/                    # Reusable components (buttons, cards)
└── assets/                    # Static files (images, icons)



