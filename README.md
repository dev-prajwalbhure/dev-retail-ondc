# Value Marketplace: The ONDC-Native Commerce OS

Value Marketplace is an enterprise-grade multi-vendor commerce operating system built specifically for the ONDC (Open Network for Digital Commerce) Retail ecosystem. 

It is designed to provide parity with high-end traditional marketplace architectures (like Bagisto) while being completely natively aligned to ONDC specifications, Beckn protocols, and decentralized network realities.

## 🚀 Key Modules & Personas

The platform operates via a unified sandbox that instantly spins up isolated Role-Based Access Control (RBAC) environments for different ecosystem participants:

### 1. Super Administrator (Marketplace Operator)
- **Role**: `admin@valuemarketplace.com`
- **Capabilities**:
  - Global Order Ledger visibility (Tracking Commission vs Gross vs Net)
  - Seller Onboarding & Moderation (Approve/Reject sellers)
  - Global Product Moderation (Suspend non-compliant SKUs)
  - Payout & Settlement Management (Process withdrawal requests from sellers)

### 2. Seller Application (Advanced Seller OS)
- **Role**: `seller@valuemarketplace.com` (e.g. Alvin Joyner)
- **Capabilities**:
  - Advanced Analytics Dashboard (Total Sales, Net Payouts, Avg Order Value)
  - ONDC Catalog Management (Physical goods, with stubs for B2B/Services)
  - Order Fulfillment (Pick, Pack, Ship via ONDC Logistics)
  - Customer CRM & Review Moderation
  - Financial Ledger & Transaction History

### 3. Buyer Application (Consumer Storefront)
- **Role**: `customer@valuemarketplace.com`
- **Capabilities**:
  - B2C E-commerce storefront
  - **Multi-Vendor Discovery**: View identical products sold by multiple sellers across the network and compare based on price/rating/delivery time.
  - Cart, Checkout, and Network Order placement
  - Submit product ratings and seller feedback

### 4. Technical Personas
- **TSP Admin** (`tsp@valuemarketplace.com`): Monitors network uptime, API logs, and webhook health.
- **Warehouse Manager** (`warehouse@valuemarketplace.com`): Dedicated inventory module.

## 🛠 Tech Stack
- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand (Global mocked database for simulated realtime interaction)
- **Styling**: Vanilla CSS (CSS Variables) + Lucide Icons
- **Routing**: React Router DOM v6
- **Build Tool**: Vite

## 🏃‍♂️ Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Click the "Login" button on the landing page to access the unified Persona Portal and switch between roles instantly!

## 📦 Phase 2 Completions
- Replaced static mock UI with dynamic Zustand store.
- Built Bagisto-parity Super Admin and Advanced Seller Dashboards.
- Implemented ONDC Multi-Vendor comparison views in the Storefront.
