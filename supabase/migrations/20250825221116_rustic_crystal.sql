/*
  # Allow Anonymous Contact Form Submissions

  1. Security Changes
    - Drop existing restrictive policies
    - Create simple policy allowing anonymous users to insert contact submissions
    - Maintain read access for authenticated users
    - Keep full access for service role

  This migration specifically addresses the RLS policy violation error by ensuring
  anonymous users can submit contact forms without authentication.
*/

-- Drop existing policies that might be blocking anonymous access
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable all for service role" ON contact_submissions;

-- Create a simple policy that allows anyone to insert contact submissions
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin purposes)
CREATE POLICY "Allow authenticated users to read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access"
  ON contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);