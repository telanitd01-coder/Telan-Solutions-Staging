# Google Apps Script Backend for Career Portal

This file contains the complete, production-ready Google Apps Script (`Code.gs`) that powers your Careers page application form. It handles resume uploads to a designated **Google Drive Folder**, applicant record logging in a **Google Sheet**, direct **HR Email Notifications**, and **Automatic Confirmation Emails** back to the applicant.

---

## 🚀 Step-by-Step Deployment Instructions

To deploy this backend, follow these detailed steps. No server or web host besides your Google Account is required!

### Step 1: Create a Google Drive Folder for Resumes
1. Open [Google Drive](https://drive.google.com).
2. Click **New** > **New Folder** and name it (e.g., `Job Application Resumes`).
3. Open the folder, and look at the URL in your browser. Copy the long string of characters at the end of the URL. This is your **Folder ID**.
   - *Example URL:* `https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0J`
   - *Folder ID:* `1A2B3C4D5E6F7G8H9I0J`

### Step 2: Create a Google Sheet for Applicant Records
1. Open [Google Sheets](https://sheets.google.com).
2. Click **Blank spreadsheet** to create a new sheet. Name it (e.g., `Telan Solutions Career Applications`).
3. Locate the **Spreadsheet ID** from the URL. It is the long characters between `/d/` and `/edit`.
   - *Example URL:* `https://docs.google.com/spreadsheets/d/1X2Y3Z4A5B6C7D8E/edit`
   - *Spreadsheet ID:* `1X2Y3Z4A5B6C7D8E`
4. (Optional) Name the first sheet tab (e.g., `Applications`).
5. Set up the column headers in Row 1:
   - Column A: `Submission Date/Time`
   - Column B: `Full Name`
   - Column C: `Email Address`
   - Column D: `Phone Number`
   - Column E: `Position Applied For`
   - Column F: `Branch`
   - Column G: `Message/Cover Letter`
   - Column H: `Resume URL`

### Step 3: Open Google Apps Script Editor
1. In your newly created Google Sheet, click on the top menu: **Extensions** > **Apps Script**.
2. This opens the Apps Script IDE. Rename the project on the top left from `Untitled project` to `Telan Careers Backend`.

### Step 4: Paste & Configure the Script Code
1. Replace any template code in the `Code.gs` editor with the **Complete Apps Script Code** provided below.
2. Edit the configuration variables at the top of the file:
   - Configure `DRIVE_FOLDER_ID` with the ID from Step 1.
   - Configure `SPREADSHEET_ID` with the ID from Step 2.
   - Configure `HR_EMAIL` with the email where HR notifications should be sent (`hr.recruitment@telanlaw.com` or your preferred testing inbox).

### Step 5: Save & Deploy as a Web App
1. Click the disk icon 💾 or press `Ctrl+S` (`Cmd+S` on Mac) to save the code.
2. Click the blue **Deploy** button on the top right, then select **New deployment**.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Configure the web app settings:
   - **Description:** `Telan Careers Web Form API`
   - **Execute as:** `Me (your-gmail-address@gmail.com)`
   - **Who has access:** `Anyone` *(Crucial to allow fetch requests from GitHub Pages or AI Studio preview).*
5. Click **Deploy**.
6. Google will prompt you to **Authorize Access**. Click **Authorize access**, select your Google account, click **Advanced** on the warning window, and click **Go to Telan Careers Backend (unsafe)**, then click **Allow**.
7. Once deployed, copy the **Web App URL** shown under "Web app". It will look like this:
   `https://script.google.com/macros/s/AKfycb..._ws/exec`

### Step 6: Connect the Web App URL to your React Website
1. Paste this URL into your website's environment variables.
2. In AI Studio or development, add this line in your `.env` (or configure via the Settings > Secrets menu):
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycb..._ws/exec"
   ```

---

## 📄 Complete Apps Script Code (`Code.gs`)

Copy all the code below and paste it in your Google Apps Script editor.

```javascript
/**
 * =========================================================================
 * TELAN SOLUTIONS - CAREERS BOARD APPS SCRIPT BACKEND
 * =========================================================================
 * 
 * Instructions:
 * 1. Place your folder and spreadsheet IDs in the CONFIG block below.
 * 2. Save, then deploy as "Web App" execution as "Me" and access "Anyone".
 */

const CONFIG = {
  // ID of the Google Drive folder where resumes/CVs will be saved.
  // Leave empty "" to save in the Drive root folder.
  DRIVE_FOLDER_ID: "YOUR_FOLDER_ID_HERE", 

  // ID of the Google Sheet spreadsheet where records will be appended.
  // Leave empty "" to create/use a default file.
  SPREADSHEET_ID: "YOUR_SHEET_ID_HERE",

  // Sheet name within the spreadsheet to write records to.
  SHEET_NAME: "Applications",

  // Email address where HR receives notification alerts.
  HR_EMAIL: "hr.recruitment@telanlaw.com",

  // From-name displayed on emails sent by this backend.
  SENDER_NAME: "Telan Solutions Careers Board"
};

/**
 * Handles incoming POST requests (application form submissions)
 */
function doPost(e) {
  try {
    // Parse input data
    let data;
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    if (!data) {
      throw new Error("No data received in payload.");
    }
    
    // ----------------------------------------------------
    // 1. UPLOAD FILE TO GOOGLE DRIVE
    // ----------------------------------------------------
    let fileUrl = "No Resume Uploaded";
    
    if (data.fileData && data.fileName) {
      let folder;
      if (CONFIG.DRIVE_FOLDER_ID && CONFIG.DRIVE_FOLDER_ID !== "YOUR_FOLDER_ID_HERE") {
        folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
      } else {
        folder = DriveApp.getRootFolder();
      }
      
      // Decode Base64 string back into binary Blob
      const decodedFile = Utilities.base64Decode(data.fileData);
      const blob = Utilities.newBlob(decodedFile, data.fileType || "application/pdf", data.fileName);
      
      // Create file in the designated folder
      const createdFile = folder.createFile(blob);
      
      // Set permissions to "Anyone with link can view" so HR can click and download easily
      createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = createdFile.getUrl();
    }
    
    // ----------------------------------------------------
    // 2. APPEND APPLICANT DATA TO GOOGLE SHEET
    // ----------------------------------------------------
    let sheet;
    if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID !== "YOUR_SHEET_ID_HERE") {
      const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
      if (!sheet) {
        sheet = ss.getSheets()[0]; // Fallback to first sheet
      }
    } else {
      // Automatic fallback if Spreadsheet ID isn't set: Create or find one named after the company
      const defaultName = "Telan Solutions Job Applications";
      const files = DriveApp.getFilesByName(defaultName);
      let ss;
      if (files.hasNext()) {
        ss = SpreadsheetApp.open(files.next());
      } else {
        ss = SpreadsheetApp.create(defaultName);
      }
      sheet = ss.getSheets()[0];
    }
    
    // Ensure the sheet has headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submission Date/Time",
        "Full Name",
        "Email Address",
        "Phone Number",
        "Position Applied For",
        "Branch",
        "Message/Cover Letter",
        "Resume URL"
      ]);
    }
    
    const timestamp = new Date();
    
    // Append the row matching required Google Sheet Integration parameters
    sheet.appendRow([
      timestamp,
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.position || "",
      data.branch || "",
      data.message || "",
      fileUrl
    ]);
    
    // ----------------------------------------------------
    // 3. SEND EMAIL NOTIFICATION TO HR
    // ----------------------------------------------------
    if (CONFIG.HR_EMAIL) {
      const hrSubject = "🔔 New Application: " + (data.position || "Staff") + " - " + (data.fullName || "Applicant");
      const hrBody = 
        "Dear HR Team,\n\n" +
        "A new job application has been submitted via the Telan Solutions Careers page:\n\n" +
        "📄 APPLICANT DETAILS:\n" +
        "--------------------------------------------------\n" +
        "Submission Date  : " + timestamp.toLocaleString() + "\n" +
        "Full Name        : " + (data.fullName || "N/A") + "\n" +
        "Email Address    : " + (data.email || "N/A") + "\n" +
        "Phone Number     : " + (data.phone || "N/A") + "\n" +
        "Position Applied : " + (data.position || "N/A") + "\n" +
        "Preferred Branch : " + (data.branch || "N/A") + "\n" +
        "--------------------------------------------------\n\n" +
        "💬 MESSAGE / COVER LETTER:\n" +
        (data.message || "No cover letter provided.") + "\n\n" +
        "📎 RESUME / CV DOWNLOAD LINK:\n" +
        fileUrl + "\n\n" +
        "This application is now securely logged in the Google Sheets tracker spreadsheet.\n\n" +
        "---\n" +
        "Best regards,\n" +
        CONFIG.SENDER_NAME;
        
      MailApp.sendEmail({
        to: CONFIG.HR_EMAIL,
        subject: hrSubject,
        body: hrBody,
        name: CONFIG.SENDER_NAME
      });
    }
    
    // ----------------------------------------------------
    // 4. SEND AUTOMATIC CONFIRMATION EMAIL TO APPLICANT
    // ----------------------------------------------------
    if (data.email) {
      const applicantSubject = "We received your application! - Telan Solutions";
      const applicantBody = 
        "Dear " + (data.fullName || "Applicant") + ",\n\n" +
        "Thank you for submitting your application to join Telan Solutions! " +
        "We are excited to learn more about you.\n\n" +
        "This email confirms that we have successfully received your applicant profile and resume for the position of \"" + (data.position || "Job Opening") + "\".\n\n" +
        "🔍 What happens next?\n" +
        "Our recruitment human resources team will thoroughly review your qualifications, skills, and resume. " +
        "If your background matches the requirements for the opening, we will reach out to you via email or phone " +
        "to schedule an initial assessment or interview screening.\n\n" +
        "📝 Summary of Submitted Information:\n" +
        "- Job Applied For: " + (data.position || "Job Opening") + "\n" +
        "- Preferred Branch: " + (data.branch || "N/A") + "\n" +
        "- Submitted Email: " + (data.email || "N/A") + "\n" +
        "- Provided Phone Number: " + (data.phone || "N/A") + "\n\n" +
        "We sincerely appreciate your interest in building your career with us. We wish you the absolute best in the selection process!\n\n" +
        "Warm regards,\n\n" +
        "The Recruitment & HR Team\n" +
        "Telan Solutions Inc.\n" +
        "hr.recruitment@telanlaw.com";
        
      MailApp.sendEmail({
        to: data.email,
        subject: applicantSubject,
        body: applicantBody,
        name: CONFIG.SENDER_NAME
      });
    }
    
    // Return standard success response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Application submitted and integrated successfully!",
      resumeUrl: fileUrl
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
  }
}

/**
 * Handles CORS OPTIONS requests to allow browser-side fetch calls
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```
