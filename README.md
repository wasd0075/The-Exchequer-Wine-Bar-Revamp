# The Exchequer Revamp — Business Intelligence & Digital Transformation

> **A full BI and CRM solution to revive a Dublin restaurant forced to close after 15 years — using Salesforce, Tableau dashboards, and data-driven strategy to address the root causes of closure.**

---

## The Problem

The Exchequer Wine Bar, a well-established Spanish tapas and wine bar in Ranelagh, Dublin, closed on 12th February 2025 after 15 years in business. Despite a loyal customer base, the restaurant couldn't survive the compounding pressures of post-pandemic inflation, rising VAT on hospitality, weak weekday revenue, and a near-total absence of digital infrastructure. Decisions were made on instinct rather than data, there was no CRM, no loyalty system, no customer analytics, and no way to proactively manage inventory waste or marketing effectiveness. By the time the problems were visible, it was too late to act.

---

## The Solution

A comprehensive digital transformation plan and implementation built around **Salesforce CRM** and **Tableau dashboards**, designed to give The Exchequer the tools to reopen, grow, and never be caught off-guard again. The solution covers automated customer engagement workflows, loyalty programs, inventory alerts, real-time KPI dashboards across sales, expenditure, suppliers and customers — all grounded in simulated datasets modelled on the restaurant's actual operating conditions.

---

## Tech Stack

| Component | Technology |
|---|---|
| CRM & Workflow Automation | Salesforce |
| BI & Dashboards | Tableau |
| Cloud Storage | AWS (proposed) |
| Data Simulation | Mockaroo |
| Data Analysis | Python, Pandas |
| Methodology | DMAIC + Kotter's 8-Step Change Management |

---

## What Was Built

### Salesforce CRM Workflows

**Admin side:**
- Auto-create Contact + Opportunity on customer registration
- Negative feedback (<2/5) → auto-generate case, assign to staff, send apology + discount offer
- Positive feedback (>2/5) → send thank-you + upcoming events, log campaign cost
- Customer responds to offer → update Opportunity stage (Won Back / Closed)
- Loyalty points >70 → auto-enrol in campaign, send personalised invite
- Inventory expiring within 2 days + >10 waste units → trigger task to inventory manager

**Customer side:**
- Seasonal/dynamic menu display
- Loyalty programme enrolment (Silver / Gold / Platinum)
- Feedback submission (feeds into admin workflows automatically)
- Home delivery order tracking
- Events and offers discovery

### Tableau Dashboards

- **Sales** — Revenue trends pre/during/post-COVID, promotion performance, best-selling items
- **Expenditure** — Budget utilisation (92.27%), variance tracking, campaign ROI
- **Customers** — Footfall by time of day, customer type breakdown, age vs. food preference
- **Suppliers** — Defect rates by supplier, spend by region, spoilage risk indicators

---

## Key Findings

- Sales collapsed in 2020 and never recovered — weekday footfall was the critical unresolved gap
- Beverages and desserts were consistently the strongest revenue categories
- 75% of customers were returning visitors — retention was a strength, not a weakness
- Top supplier defect rates flagged for Becker-Smith and Beck Ltd
- 92.27% budget utilisation left almost no buffer for shocks like COVID
- Happy Hour promotions showed the strongest forecasted uplift in weekday sales

---

## Datasets Used (Simulated via Mockaroo)

| Dataset | Key Fields |
|---|---|
| Sales | Date, Product, Category, Quantity, Price, COGS, Profit Margin, Promotion |
| Expenditure | Record Type, Category, Amount, Projected vs Actual, Campaign |
| Suppliers | Stock Level, Spoilage Rate, Supplier, Delivery Time, Waste Units |
| Customers | Visit DateTime, Rating, Age, Nationality, Customer Type, Footfall Category |

---
