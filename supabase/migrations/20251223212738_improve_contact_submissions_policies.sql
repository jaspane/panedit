/*
  # Improve Contact Submissions RLS Policies

  1. Changes
    - Add policy for authenticated users to insert contact forms
    - Keep existing anonymous user policy
    - This ensures forms work whether user is logged in or not
  
  2. Security
    - Both anon and authenticated users can submit
    - No one can read, update, or delete submissions (admin-only feature for future)
    - Data is write-only for public users
*/

-- Drop policy if it exists and recreate
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Authenticated users can submit contact forms'
  ) THEN
    DROP POLICY "Authenticated users can submit contact forms" ON contact_submissions;
  END IF;
END $$;

-- Add policy for authenticated users to submit contact forms
CREATE POLICY "Authenticated users can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
