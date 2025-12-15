# Google Sheets Integration Setup Guide

This project now uses Google Sheets instead of Supabase for storing form submissions. Follow these steps to set it up:

## Step 1: Create Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create two new spreadsheets:
   - One for **Contact Form Submissions**
   - One for **Newsletter Signups**

### Contact Form Spreadsheet Headers
Create columns with these headers in the first row:
- `first_name`
- `last_name`
- `email`
- `phone`
- `company`
- `website`
- `monthly_revenue`
- `message`
- `created_at`

### Newsletter Signups Spreadsheet Headers
Create columns with these headers in the first row:
- `email`
- `name`
- `consent_given`
- `source`
- `user_agent`
- `ip_address`
- `subscribed_at`

## Step 2: Create Google Apps Script

### For Contact Form:

1. Open the Contact Form spreadsheet
2. Click **Extensions** → **Apps Script**
3. Replace the default code with:

```javascript
// Contact Form Handler
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const payload = JSON.parse(e.postData.contents);

    if (payload.action === 'addContact') {
      const data = payload.data;
      const row = [
        data.first_name || '',
        data.last_name || '',
        data.email || '',
        data.phone || '',
        data.company || '',
        data.website || '',
        data.monthly_revenue || '',
        data.message || '',
        data.created_at || new Date().toISOString()
      ];

      sheet.appendRow(row);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        data: { email: data.email }
      })).setMimeType(ContentService.MimeType.JSON);
    }

    throw new Error('Invalid action');
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New deployment**
5. Select **Type** → **Web app**
6. Set **Execute as** to your Google account
7. Set **Who has access** to **Anyone**
8. Click **Deploy** and copy the deployment URL
9. Replace `YOUR_CONTACT_FORM_SCRIPT_ID` in `.env` with the URL

### For Newsletter Signups:

1. Open the Newsletter Signups spreadsheet
2. Click **Extensions** → **Apps Script**
3. Replace the default code with:

```javascript
// Newsletter Signup Handler
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const payload = JSON.parse(e.postData.contents);

    if (payload.action === 'addNewsletter') {
      const data = payload.data;

      // Check for duplicate email
      const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
      const emails = range.getValues();
      for (let i = 0; i < emails.length; i++) {
        if (emails[i][0] === data.email) {
          return ContentService.createTextOutput(JSON.stringify({
            error: 'This email is already subscribed to our newsletter.'
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }

      const row = [
        data.email || '',
        data.name || '',
        data.consent_given ? 'Yes' : 'No',
        data.source || '',
        data.user_agent || '',
        data.ip_address || '',
        data.subscribed_at || new Date().toISOString()
      ];

      sheet.appendRow(row);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Newsletter signup successful',
        data: { email: data.email }
      })).setMimeType(ContentService.MimeType.JSON);
    }

    throw new Error('Invalid action');
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New deployment**
5. Select **Type** → **Web app**
6. Set **Execute as** to your Google account
7. Set **Who has access** to **Anyone**
8. Click **Deploy** and copy the deployment URL
9. Replace `YOUR_NEWSLETTER_SCRIPT_ID` in `.env` with the URL

## Step 3: Update .env File

Add the deployment URLs to your `.env` file:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_CONTACT_FORM_SCRIPT_ID/usercontent
VITE_GOOGLE_NEWSLETTER_SCRIPT_URL=https://script.google.com/macros/d/YOUR_NEWSLETTER_SCRIPT_ID/usercontent
```

## Step 4: Test the Integration

1. Run your development server: `npm run dev`
2. Try submitting the contact form
3. Try signing up for the newsletter
4. Check your Google Sheets to confirm data is being saved

## Troubleshooting

### CORS Issues
If you see CORS errors in the browser console, make sure:
- The Web App deployment has "Who has access" set to **Anyone**
- You're using the correct deployment URL with `/usercontent` suffix

### Data Not Appearing
- Check that the spreadsheet column headers match exactly
- Verify the Google Apps Script is deployed as a Web App
- Check the browser's Network tab for the API call status

### Duplicate Email Errors
- The newsletter script checks for duplicate emails
- Users trying to re-subscribe will get an error message
- You can manually delete old entries if needed

## Security Notes

- Google Apps Script endpoints are public, but you can add validation
- Consider adding rate limiting to prevent spam
- Review Google Apps Script logs for debugging: **Extensions** → **Apps Script** → **Execution log**
- Never expose sensitive information in the Apps Script code

## Migrating from Supabase

All Supabase references have been removed from:
- `src/App.tsx`
- `src/components/NewsletterSignup.tsx`
- `src/lib/supabase.ts` (replaced with `src/lib/googleSheets.ts`)
- `.env` file

The functionality remains exactly the same - form submissions are just stored in Google Sheets instead of a database.
