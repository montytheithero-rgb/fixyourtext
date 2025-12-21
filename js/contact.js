// ============================================
// Contact Form Handler with Math CAPTCHA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captcha');
    
    let correctAnswer = 0;

    // Generate random math CAPTCHA
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        correctAnswer = num1 + num2;
        captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
        captchaInput.value = '';
    }

    // Initialize CAPTCHA on page load
    generateCaptcha();

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset message display
        formMessage.style.display = 'none';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const captchaAnswer = parseInt(captchaInput.value);

        // Validate all fields are filled
        if (!name || !email || !subject || !message) {
            showError('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        // Validate CAPTCHA
        if (isNaN(captchaAnswer) || captchaAnswer !== correctAnswer) {
            showError('CAPTCHA verification failed. Please try again.');
            generateCaptcha();
            return;
        }

      // If all validation passes, send to Formspree
      sendViaFormspree(name, email, subject, message);

      // Reset form
      contactForm.reset();

      // Generate new CAPTCHA
      generateCaptcha();
        // 
        // This form currently shows a success message but doesn't send an email.
        // To actually receive emails, you need to integrate ONE of these services:
        //
        // OPTION 1: Formspree (Recommended - Free & Easy)
        // 1. Go to https://formspree.io
        // 2. Create an account and add your form
        // 3. Replace the form ID below
        // 4. Uncomment the code below:
        //
        // sendViaFormspree(name, email, subject, message);
        //
        // OPTION 2: Netlify Forms (if hosting on Netlify)
        // 1. Add netlify="true" attribute to form tag
        // 2. No additional code needed
        //
        // OPTION 3: EmailJS (Free & Simple)
        // 1. Go to https://www.emailjs.com
        // 2. Set up account and get your Service ID
        // 3. Use sendViaEmailJS() function below
        //
        // For now, the form validates and shows success message locally.
    });

    // Show error message
    function showError(message) {
        formMessage.textContent = message;
        formMessage.className = 'form-message error-message';
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Show success message
    function showSuccess(message) {
        formMessage.textContent = message;
        formMessage.className = 'form-message success-message';
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

  // ============================================
    // Formspree Integration (ACTIVE)
    // ============================================
    function sendViaFormspree(name, email, subject, message) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        fetch('https://formspree.io/f/xjkqwnak', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccess('Thank you! Your message has been sent. We will get back to you soon.');
            } else {
                showError('There was an error sending your message. Please try again.');
            }
        })
        .catch(error => {
            showError('Error: ' + error.message);
        });
    }

    // ============================================
    // OPTIONAL: EmailJS Integration
    // ============================================
    // Uncomment this function and add EmailJS script when ready
    /*
    function sendViaEmailJS(name, email, subject, message) {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_email: 'contact@fixourtext.com',
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        }).then(function(response) {
            showSuccess('Thank you! Your message has been sent.');
            contactForm.reset();
            generateCaptcha();
        }, function(error) {
            showError('Error sending message. Please try again.');
        });
    }
    */
});