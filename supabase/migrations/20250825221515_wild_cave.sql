/*
  # Re-enable RLS with proper security policies

  1. Security
    - Re-enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert contact form submissions
    - Add policy for authenticated users to read submissions
    - Add policy for service role to have full access

  2. Policies
    - `allow_anonymous_insert`: Allows anonymous users to submit contact forms
    - `allow_authenticated_read`: Allows authenticated users to read submissions
    - `allow_service_role_all`: Allows service role full access for admin operations
*/

-- Re-enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "allow_anonymous_insert" ON contact_submissions;
DROP POLICY IF EXISTS "allow_authenticated_read" ON contact_submissions;
DROP POLICY IF EXISTS "allow_service_role_all" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to read submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow service role full access" ON contact_submissions;

-- Policy 1: Allow anonymous users to insert contact form submissions
CREATE POLICY "allow_anonymous_insert" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Allow authenticated users to read all submissions (for admin dashboard)
CREATE POLICY "allow_authenticated_read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Allow service role full access for backend operations
CREATE POLICY "allow_service_role_all" ON contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);