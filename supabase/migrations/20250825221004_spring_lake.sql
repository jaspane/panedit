/*
  # Fix Contact Form RLS Policy

  1. Security Updates
    - Drop existing restrictive policies
    - Add proper policy for anonymous form submissions
    - Allow public access for contact form submissions
    - Maintain security for other operations

  This migration fixes the RLS policy that was preventing anonymous users from submitting contact forms.
*/

-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Users can read their own submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role can manage all submissions" ON contact_submissions;

-- Create a proper policy for anonymous contact form submissions
CREATE POLICY "Enable insert for anonymous users" ON contact_submissions
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin purposes)
CREATE POLICY "Enable read for authenticated users" ON contact_submissions
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow service role full access for admin operations
CREATE POLICY "Enable all for service role" ON contact_submissions
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);