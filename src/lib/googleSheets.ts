import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Check your .env file.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

interface ContactSubmission {
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

interface NewsletterSignup {
  id?: string
  email: string
  name?: string
  subscribed_at?: string
  ip_address?: string
  user_agent?: string
  consent_given: boolean
  status?: 'active' | 'unsubscribed' | 'bounced'
  unsubscribed_at?: string
  source?: string
}

export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured. Please check your environment variables.')
  }

  console.log('Submitting contact form to Supabase:', data)

  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        website: data.website || null,
        monthly_revenue: data.monthly_revenue || null,
        message: data.message || null
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase INSERT error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log('Contact form submitted successfully:', result)
    return result
  } catch (error) {
    console.error('Contact form submission failed:', error)
    throw error
  }
}

export async function submitNewsletterSignup(data: Omit<NewsletterSignup, 'id' | 'subscribed_at' | 'unsubscribed_at' | 'status'>) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured. Please check your environment variables.')
  }

  console.log('Submitting newsletter signup to Supabase:', data)

  try {
    const { data: result, error } = await supabase
      .from('newsletter_signups')
      .insert({
        email: data.email,
        name: data.name || null,
        ip_address: data.ip_address || null,
        user_agent: data.user_agent || null,
        consent_given: data.consent_given,
        source: data.source || 'website'
      })
      .select()
      .maybeSingle()

    if (error) {
      console.error('Newsletter signup error:', error)

      if (error.code === '23505') {
        throw new Error('This email is already subscribed.')
      }

      throw new Error(`Database error: ${error.message}`)
    }

    console.log('Newsletter signup successful:', result)
    return result
  } catch (error) {
    console.error('Newsletter signup failed:', error)
    throw error
  }
}
