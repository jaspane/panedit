// Google Sheets integration
// Replace GOOGLE_SCRIPT_URL with your actual Google Apps Script deployment URL

const CONTACT_FORM_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''
const NEWSLETTER_SCRIPT_URL = import.meta.env.VITE_GOOGLE_NEWSLETTER_SCRIPT_URL || ''

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
  if (!CONTACT_FORM_SCRIPT_URL) {
    throw new Error('Google Sheets integration not configured. Please set VITE_GOOGLE_SCRIPT_URL in your .env file.')
  }

  console.log('Submitting contact form data to Google Sheets:', data)

  try {
    const response = await fetch(CONTACT_FORM_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addContact',
        data: {
          ...data,
          created_at: new Date().toISOString(),
        }
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.error) {
      throw new Error(result.error)
    }

    console.log('Contact form submitted successfully:', result)
    return result.data || result
  } catch (error) {
    console.error('Contact form submission error:', error)
    throw error
  }
}

export async function submitNewsletterSignup(data: Omit<NewsletterSignup, 'id' | 'subscribed_at' | 'unsubscribed_at' | 'status'>) {
  if (!NEWSLETTER_SCRIPT_URL) {
    throw new Error('Google Sheets integration not configured. Please set VITE_GOOGLE_NEWSLETTER_SCRIPT_URL in your .env file.')
  }

  console.log('Submitting newsletter signup to Google Sheets:', data)

  try {
    const response = await fetch(NEWSLETTER_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addNewsletter',
        data: {
          ...data,
          subscribed_at: new Date().toISOString(),
        }
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.error) {
      throw new Error(result.error)
    }

    console.log('Newsletter signup submitted successfully:', result)
    return result.data || result
  } catch (error) {
    console.error('Newsletter signup error:', error)
    throw error
  }
}
