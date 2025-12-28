# accounts/utils.py - FIXED VERSION
import logging
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)

def send_order_confirmation_email(user_email, order_data):
    """
    Send order confirmation email with order details and product images
    """
    try:
        print(f"📧 Attempting to send order confirmation email to: {user_email}")
        print(f"📦 Order data received: {order_data}")
        
        # Safely get values with defaults
        order_number = order_data.get('order_number', 'N/A')
        order_date = order_data.get('order_date', 'N/A')
        subtotal = order_data.get('subtotal', 0)
        shipping = order_data.get('shipping', 0)
        tax = order_data.get('tax', 0)
        total = order_data.get('total', 0)
        payment_method = order_data.get('payment_method', 'Not specified')
        
        shipping_address = order_data.get('shipping_address', {})
        items = order_data.get('items', [])
        
        subject = f'Order Confirmation - #{order_number} - RYYZ'
        
        # Build items HTML safely
        items_html = ""
        for item in items:
            item_name = item.get('name', 'Product')
            item_image = item.get('image', '')  # Could be empty
            item_size = item.get('size', 'N/A')
            item_color = item.get('color', 'N/A')
            item_quantity = item.get('quantity', 1)
            item_price = item.get('price', 0)
            
            # Only add image if it exists
            image_html = ""
            if item_image:
                image_html = f'<img src="{item_image}" alt="{item_name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #e0e0e0;">'
            
            items_html += f"""
            <tr>
                <td style="padding: 20px 0; border-bottom: 1px solid #e0e0e0;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                            <td style="width: 100px;">
                                {image_html}
                            </td>
                            <td style="padding-left: 15px; vertical-align: top;">
                                <p style="margin: 0 0 8px 0; font-weight: 700; font-size: 16px; color: #333;">{item_name}</p>
                                <p style="margin: 0; font-size: 14px; color: #666;">Size: {item_size} | Color: {item_color}</p>
                                <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Quantity: {item_quantity}</p>
                            </td>
                            <td style="text-align: right; vertical-align: top;">
                                <p style="margin: 0; font-weight: 700; font-size: 18px; color: #333;">{item_price * item_quantity:.2f} LE</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            """
        
        # Payment method icon
        payment_icon = "💳" if 'Cash' not in payment_method else "💵"
        
        # Shipping cost display
        shipping_display = 'FREE' if shipping == 0 else f"{shipping:.2f} LE"
        
        # Build shipping address info safely
        shipping_name = shipping_address.get('name', 'N/A')
        shipping_street = shipping_address.get('address', 'N/A')
        shipping_city = shipping_address.get('city', 'N/A')
        shipping_zip = shipping_address.get('zipCode', 'N/A')
        shipping_country = shipping_address.get('country', 'N/A')
        shipping_phone = shipping_address.get('phone', 'N/A')
        
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{ 
                    font-family: Arial, sans-serif;
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }}
                .container {{ 
                    max-width: 650px; 
                    margin: 0 auto; 
                    background: white;
                }}
                .header {{ 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white; 
                    padding: 40px 30px; 
                    text-align: center;
                }}
                .content {{ 
                    padding: 40px 30px;
                }}
                .section {{ margin: 30px 0; }}
                .summary-row {{ 
                    padding: 12px 0;
                    font-size: 15px;
                    color: #666;
                    display: flex;
                    justify-content: space-between;
                }}
                .total-row {{ 
                    border-top: 2px solid #333;
                    margin-top: 10px;
                    padding-top: 15px;
                    font-size: 20px;
                    font-weight: 700;
                    color: #333;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Order Confirmed!</h1>
                    <p>Thank you for your purchase</p>
                </div>
                
                <div class="content">
                    <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                        <h2 style="margin: 0 0 5px 0; font-size: 14px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Order Number</h2>
                        <p style="margin: 0; font-size: 24px; font-weight: 700; color: #333;">#{order_number}</p>
                        <p style="font-size: 14px; color: #666; margin-top: 5px;">{order_date}</p>
                    </div>
                    
                    <p style="font-size: 16px; color: #666; margin-bottom: 30px;">
                        Hi there! We've received your order and we're getting it ready. 
                        You'll receive a shipping confirmation email with tracking details soon.
                    </p>
                    
                    <div class="section">
                        <h3 style="font-size: 20px; font-weight: 700; color: #333; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #333;">📦 Order Items</h3>
                        <table cellpadding="0" cellspacing="0" style="width: 100%;">
                            {items_html if items_html else '<tr><td>No items in order</td></tr>'}
                        </table>
                    </div>
                    
                    <div class="section">
                        <h3 style="font-size: 20px; font-weight: 700; color: #333; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #333;">💰 Order Summary</h3>
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span style="font-weight: 600; color: #333;">{subtotal:.2f} LE</span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span style="font-weight: 600; color: #333;">{shipping_display}</span>
                        </div>
                        <div class="summary-row">
                            <span>Tax (14%)</span>
                            <span style="font-weight: 600; color: #333;">{tax:.2f} LE</span>
                        </div>
                        <div class="summary-row total-row">
                            <span>Total</span>
                            <span>{total:.2f} LE</span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h3 style="font-size: 20px; font-weight: 700; color: #333; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #333;">{payment_icon} Payment Method</h3>
                        <div style="display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 10px 20px; border-radius: 20px; font-weight: 600; font-size: 14px; margin-top: 10px;">
                            {payment_method}
                        </div>
                    </div>
                    
                    <div class="section">
                        <h3 style="font-size: 20px; font-weight: 700; color: #333; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #333;">🚚 Shipping Address</h3>
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 15px 0;">
                            <p style="margin: 8px 0; font-size: 15px; color: #666;"><strong>{shipping_name}</strong></p>
                            <p style="margin: 8px 0; font-size: 15px; color: #666;">{shipping_street}</p>
                            <p style="margin: 8px 0; font-size: 15px; color: #666;">{shipping_city}, {shipping_zip}</p>
                            <p style="margin: 8px 0; font-size: 15px; color: #666;">{shipping_country}</p>
                            <p style="margin: 8px 0; font-size: 15px; color: #666;">Phone: {shipping_phone}</p>
                        </div>
                    </div>
                    
                    <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                        If you have any questions about your order, please contact our support team at ryyzbrand@gmail.com
                    </p>
                </div>
                
                <div style="background: #333; color: white; padding: 30px; text-align: center;">
                    <p style="margin: 5px 0; font-size: 14px;"><strong>RYYZ</strong></p>
                    <p style="margin: 5px 0; font-size: 14px;">Thank you for shopping with us!</p>
                    <p style="margin-top: 15px; opacity: 0.8; font-size: 14px;">© 2024 RYYZ. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text version
        plain_message = f"""
        Order Confirmation - #{order_number}
        
        Thank you for your purchase!
        
        Order Number: #{order_number}
        Order Date: {order_date}
        
        ORDER ITEMS:
        {chr(10).join([f"- {item.get('name', 'Product')} (Size: {item.get('size', 'N/A')}, Color: {item.get('color', 'N/A')}) x{item.get('quantity', 1)} - {item.get('price', 0) * item.get('quantity', 1):.2f} LE" for item in items])}
        
        ORDER SUMMARY:
        Subtotal: {subtotal:.2f} LE
        Shipping: {shipping:.2f} LE
        Tax: {tax:.2f} LE
        Total: {total:.2f} LE
        
        Payment Method: {payment_method}
        
        SHIPPING ADDRESS:
        {shipping_name}
        {shipping_street}
        {shipping_city}, {shipping_zip}
        {shipping_country}
        Phone: {shipping_phone}
        
        Thank you for shopping with RYYZ!
        
        © 2024 RYYZ. All rights reserved.
        """
        
        # Use simple send_mail for testing
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            html_message=html_message,
            fail_silently=False,
        )
        
        print(f"✅ Order confirmation email sent successfully!")
        logger.info(f"Order confirmation email sent to {user_email} for order #{order_number}")
        return True
        
    except Exception as e:
        print(f"❌ Error sending order confirmation email: {str(e)}")
        import traceback
        traceback.print_exc()  # This will show the exact line of error
        logger.error(f"Error sending order confirmation email to {user_email}: {str(e)}")
        return False
# Add these at the END of accounts/utils.py

def send_login_notification_email(user):
    """
    Send a notification email to the user after successful login
    """
    try:
        # Access user attributes directly (not with .get())
        user_email = user.email if hasattr(user, 'email') else None
        username = user.username if hasattr(user, 'username') else 'User'
        
        if not user_email:
            print("❌ No email address found for user!")
            return False
        
        subject = 'Welcome Back to RYYZ!'
        plain_message = f"""
        Welcome Back, {username}!
        
        You've successfully logged into your RYYZ account.
        
        Login Details:
        - Username: {username}
        - Email: {user_email}
        - Time: Just now
        
        If this wasn't you, please contact our support team immediately.
        
        Thank you for being a valued member of RYYZ!
        
        Best regards,
        The RYYZ Team
        """
        
        from django.core.mail import send_mail
        from django.conf import settings
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )
        print(f"✅ Login notification email sent to {user_email}")
        return True
        
    except Exception as e:
        print(f"❌ Error sending login notification email: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
    
# KEEP THIS ONE (with debug prints):
def send_welcome_email(user):
    """
    Send a welcome email to new users
    """
    print(f"\n=== DEBUG: send_welcome_email START ===")
    print(f"User object type: {type(user)}")
    
    # Handle different user object types
    if isinstance(user, dict):
        print("User is a dictionary")
        email = user.get('email')
        username = user.get('username')
    elif hasattr(user, 'email'):
        print("User is an object with email attribute")
        email = user.email
        username = getattr(user, 'username', 'User')
    else:
        print("❌ User object doesn't have email attribute!")
        print(f"User object: {user}")
        return False
    
    print(f"Extracted email: {email}")
    print(f"Extracted username: {username}")
    
    if not email:
        print("❌ No email address found!")
        return False
    
    try:
        subject = 'Welcome to RYYZ!'
        plain_message = f"""
        Welcome to RYYZ, {username or 'User'}!
        
        Thank you for joining RYYZ! We're excited to have you on board.
        
        Your account has been successfully created with the email: {email}
        
        Start exploring our amazing collection now!
        
        Best regards,
        The RYYZ Team
        """
        
        from django.core.mail import send_mail
        from django.conf import settings
        
        print(f"\n📧 Email Configuration:")
        print(f"EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
        print(f"DEFAULT_FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
        print(f"Attempting to send to: {email}")
        
        result = send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
        
        print(f"✅ send_mail() returned: {result}")
        print(f"✅ Welcome email sent to {email}")
        return True
        
    except Exception as e:
        print(f"❌ Error in send_welcome_email: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

# REMOVE THIS DUPLICATE (at the bottom of utils.py):
