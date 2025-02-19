export const accountCreatedMessage = (name) => {
  const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 30px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .cta-button {
          display: inline-block;
          padding: 12px 20px;
          background-color: #007BFF;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #aaa;
          margin-top: 30px;
        }
        .footer a {
          color: #007BFF;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to BanterBox!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for signing up to <strong>BanterBox</strong>. We're excited to have you on board. You can now start connecting with others and enjoying all the features we offer.</p>
        <p><strong>Your account is now active.</strong></p>
        <p>To get started, click the button below to explore your profile and preferences:</p>
        <a href="https://www.banterbox.com/dashboard" class="cta-button">Go to Dashboard</a>
        <p class="footer">
          <small>&copy; 2025 BanterBox. All Rights Reserved.</small><br>
          <small><a href="https://www.banterbox.com/unsubscribe">Unsubscribe</a></small>
        </p>
      </div>
    </body>
  </html>
`;
  return htmlContent;
};
