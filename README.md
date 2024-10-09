edit-profile-form.vercel.app

# User Profile Edit Feature in Angular v18

## Objective

This project implements a user profile edit feature where users can update their profile information through a form. It includes form validation, data pre-population, API integration, and profile picture upload.

## Features

- **Form Creation:** A form with fields for First Name, Last Name, Email, Phone Number, and Profile Picture.
- **Form Validation:** Required validation for First Name, Last Name, and Email, along with phone number input validation.
- **Data Pre-Population:** The form is pre-populated with the user's current profile data.
- **API Integration:** The form sends an HTTP request to update the user's profile data.
- **Profile Picture Upload:** Users can preview and upload a profile picture before submission.
- **UI/UX:** Styled with Angular Material, including Save and Cancel buttons, and a loading spinner during submission.
- **Routing:** The feature is accessible via the `/edit-profile` route.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org).
- **Angular CLI**: Ensure that you have Angular CLI installed globally. You can install it by running:
  ```bash
  npm install -g @angular/cli
  ```
