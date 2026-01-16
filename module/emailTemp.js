
function emailCreator(message1, message2,emailAddress,btnText ) {

     const emailTemplate = `
     <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
         <div style="background-color: #af8931; padding: 20px; text-align: center;">
             <h1 style="color: white; margin: 0; font-size: 28px;">${message1}</h1>
         </div>
         
         <div style="padding: 30px;">
             <h2 style="color: #af8931;">Hello there,</h2>
             <p style="font-size: 16px;">${message2}</p>
             
             <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #af8931; margin: 20px 0;">
                 <p style="margin: 0; font-weight: bold;">Account Details:</p>
                 <p style="margin: 5px 0;">Username: ${emailAddress}</p>
                 <p style="margin: 5px 0;">Status: <span style="color: #28a745;">Active</span></p>
             </div>
     
             <p style="font-size: 16px;">You can now start browsing our latest collections and enjoy exclusive member discounts.</p>
             
             <div style="text-align: center; margin-top: 30px;">
                 <a href="http://yourdomain.com/login" style="background-color: #af8931; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">${btnText}</a>
             </div>
         </div>
     
         <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
             <p style="margin: 5px 0;">&copy; 2024 OnlineShop. All rights reserved.</p>
             <p style="margin: 5px 0;">If you did not do any request for this account, please ignore this email.</p>
         </div>
     </div>
     `;;
     return emailTemplate
}

module.exports = emailCreator