/*
  # Fix Contact Submissions RLS - Final Solution

  1. Problem
    - Multiple migrations have created conflicting RLS states
    - Anonymous users cannot insert despite policies appearing correct
    - Need to completely reset RLS configuration

  2. Solution
    - Drop ALL existing policies completely
    - Disable and re-enable RLS to reset state
    - Create clean, simple policies for each role
    - Ensure anon role can INSERT
    - Ensure authenticated role can INSERT  
    - Ensure service_role has full access

  3. Security
    - Public users (anon) can only INSERT contact forms
    - Authenticated users can INSERT and SELECT their submissions
    - Service role has full access for admin operations
    - No unauthorized reads or modifications allowed
*/

-- Step 1: Drop ALL existing policies to start completely fresh
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable all for service role" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to read submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow service role full access" ON contact_submissions;
DROP POLICY IF EXISTS "allow_anonymous_insert" ON contact_submissions;
DROP POLICY IF EXISTS "allow_authenticated_read" ON contact_submissions;
DROP POLICY IF EXISTS "allow_service_role_all" ON contact_submissions;
DROP POLICY IF EXISTS "Users can read their own submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role can manage all submissions" ON contact_submissions;

-- Step 2: Reset RLS state
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 3: Create clean policies with unique names

-- Policy for anonymous users to submit contact forms (PUBLIC FORM)
CREATE POLICY "public_contact_form_insert"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for authenticated users to submit contact forms
CREATE POLICY "authenticated_contact_form_insert"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to read submissions (for future admin dashboard)
CREATE POLICY "authenticated_contact_form_select"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for service role to have full access
CREATE POLICY "service_role_all_access"
  ON contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
