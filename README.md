# 🔗 TrustChain Market
### Escrow-Protected Campus Marketplace on Algorand

TrustChain Market is a blockchain-powered campus marketplace that enables students to trade items securely using Algorand escrow payments.

The platform introduces trust, transparency, and verifiable payments into student marketplaces through:
- Escrow-protected transactions
- Campus-verified wallet authentication
- Blockchain-backed reputation

---

# 🚨 Problem

Most campus trading currently happens through informal platforms such as:

- WhatsApp groups
- Telegram channels
- Instagram resale pages

These systems lack transaction security and create several problems:

- Fake payment screenshots
- No escrow protection
- No public transaction verification
- No structured reputation system
- Outsiders infiltrating student communities

As a result, students often hesitate to transact due to lack of trust and payment security.

---

# 💡 Solution

TrustChain Market introduces a campus-restricted Web3 marketplace where students can trade securely.

The platform ensures:

- Secure escrow-based payments
- Verified student participation
- Immutable transaction records on blockchain
- Reputation derived from completed transactions

This creates a closed-loop trust ecosystem for campus commerce.

**TrustChain Market aims to introduce a trust layer into student marketplaces by enabling secure peer-to-peer trading through escrow-protected blockchain payments on Algorand.**

---

# ⚙️ Core Features

## 🔐 Escrow-Protected Payments

Buyer funds are temporarily locked in an escrow wallet until delivery confirmation.

Transaction Flow: Buyer → Escrow Wallet → Seller

Steps:

1. Buyer connects wallet
2. Buyer initiates purchase
3. ALGO is transferred to escrow wallet
4. Seller marks item delivered
5. Buyer confirms receipt
6. Escrow releases funds to seller

This prevents payment fraud and non-delivery scams.

---

## 🎓 Campus-Verified Wallet Authentication

Only verified students can participate in the marketplace.

Process:

1. Student signs up using college email
2. Email is verified
3. Wallet address is linked to user profile

Only verified wallets can:
- List items
- Purchase items

This prevents outsiders and anonymous scammers.

---

## ⭐ Reputation Badge System

Trust is built through successful transaction history.

After completed escrow transactions:

- Seller transaction count increases
- Reputation badge appears on the profile

Example:

Trusted Seller — 10+ successful deals

Reputation is derived from blockchain-confirmed transactions.

---

# 🧱 System Architecture

The platform is divided into three layers.

## Frontend Layer

Responsibilities:

- Marketplace UI
- Product listings
- Wallet connection
- Escrow transaction initiation
- Transaction confirmation display

Technology:

- Next.js
- Tailwind CSS
- Pera Wallet Integration

---

## Backend Layer

Responsibilities:

- Store product listings
- Store wallet mapping
- Track order status
- Store reputation score
- Verify transaction hash via Algorand SDK

Technology options:

- Next.js API Routes
- Firebase / Supabase

---

## Blockchain Layer

Using:

- Algorand TestNet
- Algorand JavaScript SDK

Responsibilities:

- Handle ALGO transfer
- Escrow wallet transaction holding funds
- Release payment transaction
- Provide immutable transaction hash proof

---

# 🔗 Escrow Architecture Flow

User → Frontend (Next.js)

Frontend → Wallet (Transaction Signing)

Frontend → Backend (Order + Escrow Tracking)

Backend → Algorand Network (Transaction Verification)

---

# ⚡ Why Algorand

Algorand is well suited for this platform because it offers:

- Very low transaction fees
- Fast transaction finality
- Energy-efficient consensus
- Scalable infrastructure for micro-transactions

These properties make it ideal for student-scale marketplaces.

---

# 🔮 Future Scope

Potential future enhancements include:

- Fully automated smart contract escrow
- NFT-based student identity verification
- Multi-campus marketplace expansion
- Decentralized governance for campus trading
