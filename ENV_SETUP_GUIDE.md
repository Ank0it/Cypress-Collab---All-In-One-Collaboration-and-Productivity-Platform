# Environment Variables Setup Guide

## 1. Supabase Configuration

### NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

**Steps to get Supabase values:**

1. **Create a Supabase account** (if you don't have one):
   - Go to https://supabase.com
   - Sign up for a free account

2. **Create a new project**:
   - Click "New Project"
   - Fill in project details (name, database password, region)
   - Wait for project to initialize (takes 1-2 minutes)

3. **Get your API credentials**:
   - Go to your project dashboard
   - Click on **Settings** (gear icon in sidebar)
   - Click on **API** in the settings menu
   - You'll find:
     - **Project URL** → Copy this for `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public** key → Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Get your Database URL**:
   - In the same Settings menu, click on **Database**
   - Scroll down to **Connection string**
   - Select **URI** tab
   - Copy the connection string (it will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[project-ref].supabase.co:5432/postgres`)
   - Replace `[YOUR-PASSWORD]` with the database password you set when creating the project
   - Use this for `DATABASE_URL`

---

## 2. Stripe Configuration

### STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

**Steps to get Stripe keys:**

1. **Create a Stripe account** (if you don't have one):
   - Go to https://stripe.com
   - Sign up for an account (you can use test mode for development)

2. **Get your API keys**:
   - Log into Stripe Dashboard
   - Make sure you're in **Test mode** (toggle in top right)
   - Go to **Developers** → **API keys**
   - You'll find:
     - **Publishable key** (starts with `pk_test_...`) → Use for `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - **Secret key** (starts with `sk_test_...`) → Click "Reveal test key" and copy for `STRIPE_SECRET_KEY`

---

## 3. Stripe Webhook Secrets

### STRIPE_WEBHOOK_SECRET

**Steps to set up Stripe webhooks:**

1. **Install Stripe CLI** (for local development):
   - Download from: https://stripe.com/docs/stripe-cli
   - Install and login: `stripe login`

2. **Forward webhooks to your local server**:
   - In your project directory, run:
     ```bash
     stripe listen --forward-to localhost:3000/api/webhook
     ```
   - This will output a webhook secret (starts with `whsec_...`)
   - Copy this value for `STRIPE_WEBHOOK_SECRET`

3. **For production webhook** (`STRIPE_WEBHOOK_SECRET_LIVE`):
   - In Stripe Dashboard, go to **Developers** → **Webhooks**
   - Click **Add endpoint**
   - Enter your production URL: `https://yourdomain.com/api/webhook`
   - Select events to listen for (all subscription-related events)
   - After creating, click on the webhook endpoint
   - Copy the **Signing secret** (starts with `whsec_...`)
   - Use for `STRIPE_WEBHOOK_SECRET_LIVE` when deploying

---

## Quick Reference

### Most Common Missing Values:

1. **Supabase URL & Anon Key**: Settings → API in Supabase Dashboard
2. **Database URL**: Settings → Database → Connection string (URI) in Supabase Dashboard
3. **Stripe Webhook Secret**: Use Stripe CLI `stripe listen` command for development

