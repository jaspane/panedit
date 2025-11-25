/*
  # Newsletter Signups Table

  ## Purpose
  This migration creates a dedicated table for storing newsletter signup submissions,
  enabling the website to capture and manage email subscriptions from visitors.

  ## New Tables
  - `newsletter_signups`
    - `id` (uuid, primary key) - Unique identifier for each signup
    - `email` (text, unique, required) - Subscriber's email address
    - `name` (text, optional) - Subscriber's name
    - `subscribed_at` (timestamptz) - Timestamp when subscription was created
    - `ip_address` (text, optional) - IP address for tracking (privacy compliant)
    - `user_agent` (text, optional) - Browser/device information
    - `consent_given` (boolean) - Privacy policy consent flag
    - `status` (text) - Subscription status: 'active', 'unsubscribed', 'bounced'
    - `unsubscribed_at` (timestamptz, optional) - When user unsubscribed
    - `source` (text) - Where the signup came from (e.g., 'faq_section')

  ## Security
  - Enable Row Level Security (RLS) on newsletter_signups table
  - Add policy for public inserts (anyone can sign up)
  - Add policy for authenticated admins to view all signups

  ## Indexes
  - Index on email for quick lookups and preventing duplicates
  - Index on status for filtering active subscribers
*/

-- Create newsletter_signups table
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text,
  consent_given boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  unsubscribed_at timestamptz,
  source text DEFAULT 'faq_section'
);

-- Enable Row Level Security
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (sign up for newsletter)
CREATE POLICY "Anyone can sign up for newsletter"
  ON newsletter_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view all signups
CREATE POLICY "Authenticated users can view all signups"
  ON newsletter_signups
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can update signups
CREATE POLICY "Authenticated users can update signups"
  ON newsletter_signups
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_signups(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_signups(subscribed_at DESC);
