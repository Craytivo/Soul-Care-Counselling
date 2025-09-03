// Soul Care Counselling Website - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Edit Mode Toggle
    const editToggle = document.getElementById('edit-toggle');
    const editables = document.querySelectorAll('.editable');
    let editMode = false;
    
    // Load saved content from localStorage
    loadSavedContent();
    
    if (editToggle) {
        editToggle.addEventListener('click', function() {
            editMode = !editMode;
            toggleEditMode();
        });
    }
    
    function toggleEditMode() {
        if (editMode) {
            // Enable edit mode
            editables.forEach(element => {
                element.contentEditable = true;
                element.classList.add('edit-active');
            });
            editToggle.innerHTML = '<i class="fas fa-save"></i><span>Save Changes</span>';
            editToggle.classList.add('save-mode');
            
            // Add save functionality
            addSaveListeners();
        } else {
            // Disable edit mode
            editables.forEach(element => {
                element.contentEditable = false;
                element.classList.remove('edit-active');
            });
            editToggle.innerHTML = '<i class="fas fa-edit"></i><span>Edit Mode</span>';
            editToggle.classList.remove('save-mode');
            
            // Save content to localStorage
            saveContent();
            showSaveNotification();
        }
    }
    
    function addSaveListeners() {
        editables.forEach(element => {
            element.addEventListener('blur', function() {
                // Auto-save on blur
                saveContent();
            });
            
            element.addEventListener('keydown', function(e) {
                // Save on Ctrl+S or Cmd+S
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    saveContent();
                    showSaveNotification();
                }
            });
        });
    }
    
    function saveContent() {
        const content = {};
        editables.forEach((element, index) => {
            const key = element.tagName.toLowerCase() + '_' + index;
            content[key] = element.innerHTML;
        });
        localStorage.setItem('soulcare_content', JSON.stringify(content));
    }
    
    function loadSavedContent() {
        const savedContent = localStorage.getItem('soulcare_content');
        if (savedContent) {
            try {
                const content = JSON.parse(savedContent);
                editables.forEach((element, index) => {
                    const key = element.tagName.toLowerCase() + '_' + index;
                    if (content[key]) {
                        element.innerHTML = content[key];
                    }
                });
            } catch (e) {
                console.log('No saved content found or error loading content');
            }
        }
    }
    
    function showSaveNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Changes saved successfully!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #8b7355;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: ${type === 'success' ? '#8b7355' : '#e74c3c'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Add focus styles for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add keyboard navigation styles
    const keyboardStyles = document.createElement('style');
    keyboardStyles.textContent = `
        .keyboard-navigation .editable:focus,
        .keyboard-navigation .btn:focus,
        .keyboard-navigation .nav-link:focus {
            outline: 2px solid #8b7355 !important;
            outline-offset: 2px !important;
        }
        
        .edit-active {
            background-color: rgba(139, 115, 85, 0.1) !important;
            outline: 1px dashed #8b7355 !important;
        }
        
        .save-mode {
            background-color: #27ae60 !important;
        }
        
        .save-mode:hover {
            background-color: #229954 !important;
        }
    `;
    document.head.appendChild(keyboardStyles);
    
    // Auto-save functionality
    let autoSaveTimeout;
    editables.forEach(element => {
        element.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                if (editMode) {
                    saveContent();
                }
            }, 2000); // Auto-save after 2 seconds of inactivity
        });
    });
    
    // Add tooltip for edit mode
    if (editToggle) {
        editToggle.title = 'Click to toggle edit mode. All text on the page will become editable.';
    }
    
    // Initialize tooltips for editable elements
    editables.forEach(element => {
        element.title = 'Click to edit this text';
    });
    
    // Add confirmation dialog for unsaved changes
    window.addEventListener('beforeunload', function(e) {
        if (editMode) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        }
    });
    
    // Export content functionality (for backup)
    window.exportContent = function() {
        const content = {};
        editables.forEach((element, index) => {
            const key = element.tagName.toLowerCase() + '_' + index;
            content[key] = element.innerHTML;
        });
        
        const dataStr = JSON.stringify(content, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'soulcare-content-backup.json';
        link.click();
        
        URL.revokeObjectURL(url);
    };
    
    // Import content functionality
    window.importContent = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const content = JSON.parse(e.target.result);
                        editables.forEach((element, index) => {
                            const key = element.tagName.toLowerCase() + '_' + index;
                            if (content[key]) {
                                element.innerHTML = content[key];
                            }
                        });
                        saveContent();
                        showSaveNotification();
                    } catch (error) {
                        alert('Error importing content. Please check the file format.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };
    
    console.log('Soul Care Counselling website loaded successfully!');
    console.log('Available functions: exportContent(), importContent()');
});
