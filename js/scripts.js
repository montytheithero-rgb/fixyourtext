// ============================================
// Load Header & Footer Templates
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Load header from template
    fetch('/header.html')
        .then(response => response.text())
        .then(html => {
            // Insert header at the beginning of body
            const headerPlaceholder = document.querySelector('header');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = html;
            }
            initMobileMenu();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer from template
    fetch('/footer.html')
        .then(response => response.text())
        .then(html => {
            // Insert footer at the end of body
            const footerPlaceholder = document.querySelector('footer');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = html;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});

// ============================================
// Mobile Menu Toggle
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const headerContent = document.querySelector('.header-content');
            if (headerContent && !e.target.closest('.header-content')) {
                navMenu.classList.remove('active');
            }
        });
    }
}
// ============================================
// Load Share Buttons
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if share section already exists (avoid duplicates)
    const existingShare = document.querySelector('.share-this-tool');
    if (existingShare) {
        return; // Share section already exists, don't load again
    }
    
    // Load share buttons from template
    fetch('/share-buttons.html')
        .then(response => response.text())
        .then(html => {
            // Find the tool-info section to insert share buttons before it
            const toolInfo = document.querySelector('.tool-info');
            const statusMessage = document.getElementById('statusMessage');
            
            if (toolInfo && statusMessage) {
                // Create a temporary container to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Insert all elements (div, style, script) before tool-info
                const fragment = document.createDocumentFragment();
                while (tempDiv.firstChild) {
                    fragment.appendChild(tempDiv.firstChild);
                }
                
                // Insert the fragment before tool-info section
                toolInfo.parentNode.insertBefore(fragment, toolInfo);
                
                // Initialize share buttons after insertion
                if (typeof initShareButtons === 'function') {
                    initShareButtons();
                }
            }
        })
        .catch(error => console.error('Error loading share buttons:', error));
});