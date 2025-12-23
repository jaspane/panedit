import { supabase } from './supabase'

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
  console.log('Submitting contact form data to Supabase:', data)

  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([{
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        website: data.website || null,
        monthly_revenue: data.monthly_revenue || null,
        message: data.message || null,
        status: 'new'
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message)
    }

    console.log('Contact form submitted successfully:', result)
    return result
  } catch (error) {
    console.error('Contact form submission error:', error)
    throw error
  }
}

export async function submitNewsletterSignup(data: Omit<NewsletterSignup, 'id' | 'subscribed_at' | 'unsubscribed_at' | 'status'>) {
  console.log('Submitting newsletter signup to Supabase:', data)

  try {
    const { data: result, error } = await supabase
      .from('newsletter_signups')
      .insert([{
        email: data.email,
        name: data.name || null,
        ip_address: data.ip_address || null,
        user_agent: data.user_agent || null,
        consent_given: data.consent_given,
        source: data.source || 'website',
        status: 'active'
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message)
    }

    console.log('Newsletter signup submitted successfully:', result)
    return result
  } catch (error) {
    console.error('Newsletter signup error:', error)
    throw error
  }
}
