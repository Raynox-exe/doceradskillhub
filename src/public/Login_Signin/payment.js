// ============================================
// CONFIGURATION - REPLACE WITH YOUR KEYS
// ============================================
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-527b64aa21c2dd1ec10c123bbf274399-X'; // Replace with your Flutterwave public key
const EMAILJS_PUBLIC_KEY = 'vfGGyxnBSApNnGXBe';        // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'service_447y7zk';               // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_od6pcsg';             // Replace with your EmailJS template ID
const PAYMENT_AMOUNT = 50000;                                // Amount in Naira (₦50,000)

// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Page loaded successfully');
  
  // Check if required libraries are loaded
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS library not loaded!');
    alert('Error: EmailJS library failed to load. Please check your internet connection.');
    return;
  }
  
  if (typeof FlutterwaveCheckout === 'undefined') {
    console.error('❌ Flutterwave library not loaded!');
    alert('Error: Flutterwave library failed to load. Please check your internet connection.');
    return;
  }
  
  console.log('✅ EmailJS loaded');
  console.log('✅ Flutterwave loaded');
  
  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('✅ EmailJS initialized');

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  const signupForm = document.getElementById('signupForm');
  
  if (!signupForm) {
    console.error('❌ Signup form not found!');
    return;
  }
  
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('🔹 Form submitted');
    
    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    console.log('🔹 Form data collected:', { fullname, email, phone, termsChecked: terms });
    
    // Validate passwords match
    if (password !== confirmPassword) {
      console.log('❌ Password validation failed: passwords do not match');
      alert('❌ Passwords do not match!');
      return;
    }
    
    // Validate password length
    if (password.length < 8) {
      console.log('❌ Password validation failed: less than 8 characters');
      alert('❌ Password must be at least 8 characters long!');
      return;
    }
    
    // Validate terms acceptance
    if (!terms) {
      console.log('❌ Terms validation failed: not accepted');
      alert('❌ Please accept the Terms of Service and Privacy Policy!');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email validation failed: invalid format');
      alert('❌ Please enter a valid email address!');
      return;
    }
    
    console.log('✅ All validations passed');
    
    // Prepare form data
    const formData = {
      fullname: fullname,
      email: email,
      phone: phone,
      password: password
    };
    
    console.log('🔹 Registering user with backend...');

    // Call Backend API
    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('🔹 Backend response:', data);
      
      if (data.token || data.message === 'User already exists') {
        // If registration successful or user exists, proceed to payment
        console.log('✅ User registered/verified. Initiating payment...');
        initiatePayment(formData);
      } else {
        alert('❌ Registration failed: ' + (data.message || 'Unknown error'));
      }
    })
    .catch(error => {
      console.error('❌ Backend error:', error);
      alert('❌ Failed to connect to server. Please ensure the backend is running.');
    });
  });
});

// ============================================
// PASSWORD TOGGLE FUNCTIONALITY
// ============================================
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const icon = document.getElementById(fieldId + '-icon');
  
  if (field.type === 'password') {
    field.type = 'text';
    icon.className = 'ri-eye-line text-gray-400 hover:text-gray-600';
  } else {
    field.type = 'password';
    icon.className = 'ri-eye-off-line text-gray-400 hover:text-gray-600';
  }
}

// ============================================
// EMAIL RECEIPT FUNCTION
// ============================================
function sendEmailReceipt(paymentData) {
  const templateParams = {
    to_email: paymentData.email,
    to_name: paymentData.fullname,
    transaction_ref: paymentData.transaction_id,
    amount: `₦${PAYMENT_AMOUNT.toLocaleString()}`,
    payment_date: new Date().toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    customer_phone: paymentData.phone,
    payment_method: 'Flutterwave'
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
      console.log('Email sent successfully!', response.status, response.text);
    }, function(error) {
      console.error('Failed to send email:', error);
      // Don't block user flow if email fails
      alert('Payment successful! However, email receipt could not be sent. Please check your inbox later.');
    });
}

// ============================================
// FLUTTERWAVE PAYMENT FUNCTION
// ============================================
function initiatePayment(formData) {
  FlutterwaveCheckout({
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: 'SKILLHUB-' + Date.now(),
    amount: PAYMENT_AMOUNT,
    currency: 'NGN',
    payment_options: 'card,banktransfer,ussd',
    customer: {
      email: formData.email,
      phone_number: formData.phone,
      name: formData.fullname,
    },
    customizations: {
      title: 'Docerad SkillHub',
      description: 'Enrollment Payment',
      logo: 'https://your-logo-url.com/logo.png', // Optional: Add your logo URL
    },
    callback: function (data) {
      console.log('Payment successful:', data);
      
      // Prepare payment data for email receipt
      const paymentData = {
        email: formData.email,
        fullname: formData.fullname,
        phone: formData.phone,
        transaction_id: data.transaction_id,
        amount: PAYMENT_AMOUNT
      };
      
      // Save enrollment data to localStorage
      let enrollments = JSON.parse(localStorage.getItem('skillhub_enrollments') || '[]');
      enrollments.push({
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        transactionRef: data.transaction_id,
        date: new Date().toISOString()
      });
      localStorage.setItem('skillhub_enrollments', JSON.stringify(enrollments));
      
      // Send email receipt
      sendEmailReceipt(paymentData);
      
      // Show success message
      alert('✅ Payment successful! Transaction Ref: ' + data.transaction_id + '\n\nA receipt has been sent to your email.');
      
      // Redirect to dashboard (create this page or change to your desired page)
      setTimeout(function() {
        window.location.href = 'student-dashboard.html';
      }, 2000);
    },
    onclose: function() {
      alert('Payment cancelled. You can try again when ready.');
    },
  });
}
