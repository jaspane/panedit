import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }

  return submission
}