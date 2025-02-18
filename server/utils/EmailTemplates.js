export const VERIFY_EMAIL_TEMLATE=`
<!DOCTYPE html>
<html>
<head>
  <title>Verify Your Email</title>
  <style>
  body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      padding: 20px;
    }

  </style>
  </head>
  <body>
  <h1>Verify Your Email</h1>
  <p>Hello {username}</p>
  <p>Thank you for signing up for our website. To complete your registration, please click the link below:</p>
  <a href="{verifyLink}" style="color=blue">Verify Your Email</a>
   <p>Link will EXpire in 24 hours:</p>
  <p>If you did not sign up for our website, please ignore this email.</p>
  <p>Best regards,</p>
  <p>Your Team</p>
  </body>
  </html>


`

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verfied SuccessFully</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Email Verfied SuccessFully</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p> Thanks for choosing Us Mr.{username}</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const FORGET_PASSWORD_EMAIL_TEMPLATE =`
<!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
  <style>
  body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      padding: 20px;
    }
      </style>
  </head>
  <body>
  <h1>Reset Password</h1>
  <p>Hello {username}</p>
  <p>To reset your password, please click the link below:</p>
  <p>Link will Expire After in min:</p>
  <a href="{resetLink}" style="color=blue">Reset Password</a>
  <p>If you did not request a password reset, please ignore this email.</p>
  <p>Best regards,</p>
  <p>Your Team</p>
  </body>
  </html>
  `