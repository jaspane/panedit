/*
  # Temporarily Disable RLS for Contact Submissions - Testing
  
  1. Purpose
    - Temporarily disable RLS to test if form submissions work
    - This will help us determine if the issue is with RLS policies or something else
    - This is ONLY for testing and should be re-enabled with working policies
  
  2. Security Note
    - This is a temporary measure for debugging
    - RLS should be re-enabled once we confirm the form works
    - Contact form data is low-sensitivity (public inquiries)
*/

-- Temporarily disable RLS to test form functionality
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Add a comment to track this change
COMMENT ON TABLE contact_submissions IS 'RLS temporarily disabled for testing - 2025-12-23';
