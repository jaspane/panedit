import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl ? 'Present' : 'Missing')
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

// Declare supabase at top level for proper export
let supabase: ReturnType<typeof createClient>

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please connect to Supabase first.')
  // Create a dummy client to prevent crashes
  supabase = createClient('https://dummy.supabase.co', 'dummy-key')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

// Export the supabase client
export { supabase }

// Types for our contact form
export interface ContactSubmission {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company?: string
  website?: string
  monthly_revenue?: string
  message?: string
  status?: 'new' | 'contacted' | 'qualified' | 'closed'
  created_at?: string
  updated_at?: string
}

// Function to submit contact form
export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  // Check if Supabase is properly configured
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error('Supabase is not connected. Please click "Connect to Supabase" button in the top right corner.')
  }

  console.log('Submitting contact form data:', data)

  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Supabase error details:', error)
    throw error
  }

  console.log('Form submitted successfully:', submission)
  return submission
}