/*
  # Temporarily disable RLS for contact form testing

  This migration temporarily disables RLS on the contact_submissions table
  to test if the form submission works. This is for debugging purposes only.

  1. Changes
     - Disable RLS on contact_submissions table
     - This allows all operations without policy restrictions

  Note: This is temporary for testing. RLS should be re-enabled with proper policies.
*/

-- Temporarily disable RLS for testing
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Add a comment to track this change
COMMENT ON TABLE contact_submissions IS 'RLS temporarily disabled for form testing - re-enable with proper policies';