async function sendEmailWithEmailJS(formData) {
    return new Promise((resolve, reject) => {
        if (typeof emailjs === 'undefined') {
            reject(new Error('EmailJS SDK not loaded.'));
            return;
        }

        // 1. INITIALIZE with your Public Key
        emailjs.init('<YOUR_PUBLIC_KEY>'); // e.g., 'user_AbCdEfGhIjKlMnOpQrStUv'

        // 2. Prepare parameters that match your template variables
        const templateParams = {
            from_name: formData.name,    // maps to {{from_name}} in template
            from_email: formData.email,  // maps to {{from_email}} in template
            subject: formData.subject,   // maps to {{subject}} in template
            message: formData.message    // maps to {{message}} in template
        };

        // 3. SEND the email
        emailjs.send(
            '<YOUR_SERVICE_ID>',   // e.g., 'service_ite254project'
            '<YOUR_TEMPLATE_ID>',  // e.g., 'template_contact'
            templateParams
        )
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
            resolve(response);
        })
        .catch(error => {
            console.error('FAILED...', error);
            reject(error);
        });
    });
}