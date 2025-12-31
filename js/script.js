
// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nice NGO website loaded successfully!');
    
    // Initialize components
    initFormValidation();
    initSmoothScrolling();
    initScrollAnimations();
    initTestimonialRotator();
    
    // Set current year in footer
    setCurrentYear();
});

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.querySelector('footer p.mb-0');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}

// Form Validation for Contact Form
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset previous error states
            resetErrors([name, email, message]);
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your full name');
                isValid = false;
            }
            
            // Validate email using patterns
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.bg-light form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
}

// Show error message for form fields
function showError(inputElement, message) {
    inputElement.classList.add('is-invalid');
    
    let errorDiv = inputElement.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }
    
    errorDiv.textContent = message;
}

// Reset error states
function resetErrors(inputs) {
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.textContent = '';
        }
    });
}

// Show success message
function showSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    
    // Create success alert
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
    successAlert.innerHTML = `
        <strong>Message sent successfully!</strong> Thank you for contacting Nice NGO. We'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert after form
    contactForm.parentNode.insertBefore(successAlert, contactForm.nextSibling);
    
    // Reset form
    contactForm.reset();
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        if (successAlert.parentNode) {
            successAlert.remove();
        }
    }, 5000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only for same-page anchors
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .table, .blockquote').forEach(el => {
        observer.observe(el);
    });
}

// Testimonial Rotator (Bonus Feature)
function initTestimonialRotator() {
    const testimonialSection = document.querySelector('.bg-light .row');
    
    if (testimonialSection) {
        const testimonials = testimonialSection.querySelectorAll('.col-md-4');
        let currentIndex = 0;
        
        // Only activate on mobile
        if (window.innerWidth < 768) {
            // Hide all except first
            testimonials.forEach((testimonial, index) => {
                if (index > 0) {
                    testimonial.style.display = 'none';
                }
            });
            
            // Create navigation dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots d-flex justify-content-center mt-3';
            
            testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `dot mx-1 ${index === 0 ? 'active' : ''}`;
                dot.innerHTML = '.';
                dot.style.cssText = 'border: none; background: none; font-size: 1.5rem; color: #ccc; cursor: pointer;';
                
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                });
                
                dotsContainer.appendChild(dot);
            });
            
            testimonialSection.parentNode.appendChild(dotsContainer);
            
            // Auto rotate every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            }, 5000);
            
            function showTestimonial(index) {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.display = i === index ? 'block' : 'none';
                });
                
                // Update dots
                document.querySelectorAll('.dot').forEach((dot, i) => {
                    dot.style.color = i === index ? '#1a73e8' : '#ccc';
                });
                
                currentIndex = index;
            }
        }
    }
}

// Bootstrap Modal
function initModalExample() {
    // Check if we're on the home page
    if (document.querySelector('.hero-section')) {
        // Create a modal button in hero section
        const heroBtn = document.querySelector('.hero-section .btn');
        if (heroBtn) {
            // Create modal HTML
            const modalHTML = `
                <div class="modal fade" id="exampleModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Join Our Mission</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p>Thank you for your interest in Nice NGO! By supporting us, you're helping to provide education to thousands of children in rural communities.</p>
                                <p>Choose how you'd like to contribute:</p>
                                <div class="d-grid gap-2">
                                    <a href="contact.html" class="btn btn-primary">Become a Volunteer</a>
                                    <a href="contact.html" class="btn btn-outline-primary">Make a Donation</a>
                                    <a href="contact.html" class="btn btn-outline-primary">Partner With Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Change hero button to trigger modal
            heroBtn.setAttribute('data-bs-toggle', 'modal');
            heroBtn.setAttribute('data-bs-target', '#exampleModal');
            heroBtn.textContent = 'Join Our Mission ';
            heroBtn.innerHTML += '<i class="fas fa-arrow-right ms-2"></i>';
            
            // Remove href to prevent navigation
            heroBtn.removeAttribute('href');
        }
    }
}

// Call modal initialization
initModalExample();

// Responsive Table Enhancement
function enhanceTables() {
    document.querySelectorAll('.table').forEach(table => {
        if (window.innerWidth < 768) {
            table.classList.add('table-sm');
        }
    });
}

// Window resize handler
window.addEventListener('resize', function() {
    enhanceTables();
    initTestimonialRotator(); // Reinitialize for responsive changes
});

// Initial table enhancement
enhanceTables();

// Add loading state to forms
document.addEventListener('submit', function(e) {
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
        submitBtn.disabled = true;
        
        // Reset after 3 seconds 
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }
});