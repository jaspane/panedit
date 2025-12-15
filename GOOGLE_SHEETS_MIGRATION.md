# Google Sheets Migration - Summary

Your website has been successfully migrated from Supabase to Google Sheets for data persistence.

## What Changed

### Files Modified:
1. **src/App.tsx** - Updated to use Google Sheets API instead of Supabase
2. **src/components/NewsletterSignup.tsx** - Updated to use Google Sheets API
3. **.env** - Removed Supabase credentials, added Google Sheets configuration

### Files Created:
1. **src/lib/googleSheets.ts** - New Google Sheets integration library
2. **GOOGLE_SHEETS_SETUP.md** - Complete setup instructions
3. **GOOGLE_SHEETS_MIGRATION.md** - This file

### Files Kept (No longer used but available):
1. **src/lib/supabase.ts** - Old Supabase integration (can be deleted if desired)

## Quick Setup (5 Minutes)

Follow these simple steps:

### 1. Create Two Google Sheets
- Contact Form submissions: [Create new sheet](https://sheets.google.com/create)
- Newsletter signups: [Create new sheet](https://sheets.google.com/create)

### 2. Set Up Column Headers

**Contact Form Sheet** (first row):
```
first_name | last_name | email | phone | company | website | monthly_revenue | message | created_at
```

**Newsletter Sheet** (first row):
```
email | name | consent_given | source | user_agent | ip_address | subscribed_at
```

### 3. Create Google Apps Scripts
For each sheet:
1. Open the sheet
2. Click **Extensions** → **Apps Script**
3. Copy the script code from **GOOGLE_SHEETS_SETUP.md**
4. Click **Deploy** → **New deployment**
5. Select **Web app**
6. Copy the deployment URL

### 4. Update .env File
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_CONTACT_SCRIPT_ID/usercontent
VITE_GOOGLE_NEWSLETTER_SCRIPT_URL=https://script.google.com/macros/d/YOUR_NEWSLETTER_SCRIPT_ID/usercontent
```

### 5. Test It
- Run: `npm run dev`
- Try submitting the contact form
- Try signing up for newsletter
- Check your Google Sheets for new entries

## Integration Points

### Contact Form Endpoint
- **Location**: Contact form modal in the header
- **Data sent**: First name, last name, email, phone, company, website, monthly revenue, message
- **Success behavior**: Shows success dialog, closes modal

### Newsletter Signup Endpoint
- **Location**: Bottom of page
- **Data sent**: Email, name (optional), consent, source, user agent, IP address
- **Success behavior**: Shows success message, resets form

## Error Handling

The application will handle these scenarios:

- **Missing configuration**: Shows alert with setup instructions
- **Network errors**: Shows generic error message
- **Duplicate emails** (newsletter only): Shows "already subscribed" message
- **Script errors**: Displays error message from Google Apps Script

## Advantages

- ✅ No database maintenance required
- ✅ Direct access to data in Google Sheets
- ✅ Easy to share and collaborate on data
- ✅ Google Drive integration
- ✅ Free and simple to set up

## Comparison: Supabase vs Google Sheets

| Feature | Supabase | Google Sheets |
|---------|----------|---------------|
| Real-time updates | Yes | Manual refresh |
| Query data | Complex SQL | Simple filters |
| Storage limit | 500MB free tier | 5M cells free |
| Cost | Scales with usage | Free |
| Setup complexity | Medium | Simple |
| UI for data | Supabase UI | Google Sheets |

## Troubleshooting

### Forms not submitting?
1. Check browser console for errors
2. Verify .env file has correct URLs
3. Make sure Google Apps Script is deployed as "Web app" with "Anyone" access
4. Try opening the script URL directly in browser - should return JSON error

### Data not appearing in sheets?
1. Check sheet column headers match exactly (case sensitive)
2. Verify script is deployed (check Deployments in Google Apps Script)
3. Check script logs: **Extensions** → **Apps Script** → **Execution log**

### CORS errors?
These are normal - Google Apps Script handles CORS. Make sure:
- Deployment type is "Web app"
- "Who has access" is set to "Anyone"
- URL includes `/usercontent` suffix

## Security Notes

- Google Apps Scripts are public endpoints
- No authentication is required (can be added if needed)
- Data is stored in your Google Drive
- Consider sharing sheets only with authorized users
- You can view who submitted forms directly in the sheet

## Next Steps

1. Follow **GOOGLE_SHEETS_SETUP.md** for detailed instructions
2. Test both forms
3. Share Google Sheets with team members who need access
4. Set up notifications in Google Sheets if desired (Data → Notification rules)

## Reverting to Supabase

If you want to switch back:
1. Update imports in App.tsx and NewsletterSignup.tsx
2. Restore Supabase environment variables to .env
3. The old supabase.ts file is still available

Enjoy your simplified data management!
