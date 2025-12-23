/*
  # Enable RLS and Create Policies for Form Submissions

  1. Security Changes
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert contact form submissions
    - Add policy for anonymous users to insert newsletter signups
    - These policies allow public form submissions while preventing unauthorized reads/updates
  
  2. Purpose
    - Allow visitors to submit contact forms and newsletter signups
    - Protect user data from unauthorized access
    - Enable admin-only access to view submissions (future feature)
*/

-- Enable RLS on contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact form submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to insert newsletter signups
CREATE POLICY "Anyone can signup for newsletter"
  ON newsletter_signups
  FOR INSERT
  TO anon
  WITH CHECK (consent_given = true);
