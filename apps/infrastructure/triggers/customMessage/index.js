const handler = async (event, context, callback) => {
  const code = event.request.codeParameter;
  const username = event.userName;
  const email =
    event.request.usernameParameter || event.request.userAttributes.email;

  // const websiteBaseUrl = 'https://email-builder-gray.vercel.app';
  const websiteBaseUrl = 'http://localhost:4200';

  const forgotPasswordUrl = `${websiteBaseUrl}/reset-password?code=${code}&username=${username}&email=${email}`;
  const confirmAccountUrl = `${websiteBaseUrl}/callback/confirm-account?code=${code}&username=${username}`;

  const forgotPasswordMessage = `
      <p>
      Hi, <br /> <br />
      Click <a href="${forgotPasswordUrl}">here</a> to reset your password.
      </p>
      `;

  const verifyAccountMessage = `
      <html ⚡4email data-css-strict>

<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <style amp4email-boilerplate>
    body {
      visibility: hidden
    }
  </style>

  <script async src="https://cdn.ampproject.org/v0.js"></script>


  <style amp-custom>
    .u-row {
      display: flex;
      flex-wrap: nowrap;
      margin-left: 0;
      margin-right: 0;
    }
    
    .u-row .u-col {
      position: relative;
      width: 100%;
      padding-right: 0;
      padding-left: 0;
    }
    
    .u-row .u-col.u-col-100 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    
    @media (max-width: 767px) {
      .u-row:not(.no-stack) {
        flex-wrap: wrap;
      }
      .u-row:not(.no-stack) .u-col {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    table,
    td {
      color: #000000;
    }
    
    a {
      color: #0000ee;
      text-decoration: underline;
    }
  </style>


</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
              <div class="u-row">

                <div class="u-col u-col-100">
                  <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 160%;"><span style="color: #013399; font-size: 14px; line-height: 22.4px;"><span style="font-size: 14px; line-height: 22.4px;">SEP</span><span style="font-size: 14px; line-height: 22.4px;">6</span><span style="font-size: 14px; line-height: 22.4px;">.com</span></span>
                              </p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N I N G&nbsp; &nbsp;U P !</strong></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                </span>
                              </p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
              <div class="u-row">

                <div class="u-col u-col-100">
                  <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
                              <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You're almost ready to get started. Please click on the button below to verify your email address and enjoy creating emails with us! </span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                            <div align="center">
                              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse;  font-family:'Cabin',sans-serif;"><tr><td style="font-family:'Cabin',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:46px; v-text-anchor:middle; width:235px;" arcsize="8.5%" stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                              <a href="${confirmAccountUrl}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; ">
                                <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">VERIFY YOUR EMAIL</span></strong>
                                </span>
                                </span>
                              </a>
                              <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                              <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
              <div class="u-row">

                <div class="u-col u-col-100">
                  <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 160%;"><span style="color: #013399; font-size: 14px; line-height: 22.4px;">Some text</span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights &copy; Company All Rights Reserved</span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
      `;
  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Reset your Password';
    event.response.emailMessage = forgotPasswordMessage;
  }
  if (event.triggerSource === 'CustomMessage_SignUp') {
    event.response.emailSubject = 'Confirm your Account';
    event.response.emailMessage = verifyAccountMessage;
  }

  callback(null, event);
};

exports.handler = handler;
