// function updateTime() {
//     const currentTimeElement = document.querySelector('[data-testid="test-user-time"]');
//     currentTimeElement.textContent = Date.now()
// }

// updateTime();
// setInterval(updateTime, 1000);

function updateTime() {
    const currentTimeElement = document.querySelector('[data-testid="test-user-time"]');
    if (currentTimeElement) { // ✅ Add null check
        currentTimeElement.textContent = Date.now();
    }
}

updateTime();
setInterval(updateTime, 1000);

// Wrap in DOMContentLoaded to ensure form exists
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitMessage = document.querySelector('[data-testid="test-contact-success"]');

    // Check if form exists (only on contact page)
    if (!form) return;

    // Validation rules
    const validationRules = {
        fullname: { // ✅ Changed from fullName to fullname
            testId: "test-contact-error-name",
            validate: (value) => {
                if (!value.trim()) return "Full name is required";
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
                return null;
            }
        },
        email: {
            testId: "test-contact-error-email",
            validate: (value) => {
                if (!value.trim()) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return null;
            }
        },
        subject: {
            testId: "test-contact-error-subject",
            validate: (value) => {
                if (!value.trim()) return "Subject is required"; // ✅ Fixed typo
                if (value.trim().length < 3) return "Subject must be at least 3 characters";
                if (value.trim().length > 100) return "Subject must be less than 100 characters";
                return null;
            }
        },
        message: {
            testId: "test-contact-error-message",
            validate: (value) => {
                if (!value.trim()) return "Message is required";
                if (value.trim().length < 10) return "Message must be at least 10 characters";
                if (value.trim().length > 2000) return "Message must be less than 2000 characters";
                return null;
            }
        }
    };

    // Show error message
    function showError(fieldName, errorMessage) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.querySelector(`[data-testid="${validationRules[fieldName].testId}"]`);
        
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.classList.add('show');
        errorElement.querySelector('span').textContent = errorMessage;
    }

    // Clear error message
    function clearError(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.querySelector(`[data-testid="${validationRules[fieldName].testId}"]`);
        
        field.classList.remove('error');
        errorElement.classList.remove('show');
    }

    // Show success state
    function showSuccess(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        field.classList.add('success');
        field.classList.remove('error');
        clearError(fieldName);
    }

    // Validate single field
    function validateField(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const value = field.value;
        const error = validationRules[fieldName].validate(value);

        if (error) {
            showError(fieldName, error);
            return false;
        } else {
            showSuccess(fieldName);
            return true;
        }
    }

    // Real-time validation on input
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(fieldName);
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        Object.keys(validationRules).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        // If all valid, show success message
        if (isValid) {
            // Hide form temporarily
            form.style.display = 'none';
            
            // Show success message
            submitMessage.classList.add('show'); // ✅ Fixed variable name
            
            // Scroll to top to see success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                
                // Remove all success/error states
                Object.keys(validationRules).forEach(fieldName => {
                    const field = form.querySelector(`[name="${fieldName}"]`);
                    field.classList.remove('success', 'error');
                    clearError(fieldName);
                });
                
                // Hide success message and show form again
                setTimeout(() => {
                    submitMessage.classList.remove('show'); // ✅ Fixed variable name
                    form.style.display = 'flex';
                }, 3000);
            }, 2000);
        } else {
            // Focus on first error field
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    });

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// About me section

// Set active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});