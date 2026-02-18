// Sidebar functions
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    const grid = document.querySelector(".grid-container");

    if (sidebar) {
        sidebar.classList.add("active");
    }
    if (grid && window.innerWidth > 600) {
        grid.classList.remove("sidebar-collapsed");
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const grid = document.querySelector(".grid-container");

    if (sidebar) {
        sidebar.classList.remove("active");
    }
    if (grid && window.innerWidth > 600) {
        grid.classList.add("sidebar-collapsed");
    }
}

// Toggle submenu expand/collapse
function toggleSubmenu(element) {
    const listItem = element.closest('.sidebar-list-item');
    const submenu = listItem.querySelector('.submenu');
    const expandIcon = element.querySelector('.expand-icon');
    
    // Toggle active class on list item
    listItem.classList.toggle('expanded');
    
    // Rotate chevron icon
    if (listItem.classList.contains('expanded')) {
        expandIcon.style.transform = 'rotate(90deg)';
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
    } else {
        expandIcon.style.transform = 'rotate(0deg)';
        submenu.style.maxHeight = '0px';
    }
}

// Tab switching function
function switchTab(tabName) {
    // Hide all tab contents
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Update sidebar active state
    const sidebarItems = document.querySelectorAll('.sidebar-list-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });

    // Map tab names to sidebar items
    const tabToSidebarMap = {
        'dashboard': 0,
        'products': 1,
        'categories': 2,
        'inventory': 3,
        'reports': 4,
        'settings': 5,
        'customers': 1 // Customers uses products sidebar item
    };

    const sidebarIndex = tabToSidebarMap[tabName];
    if (sidebarIndex !== undefined && sidebarItems[sidebarIndex]) {
        sidebarItems[sidebarIndex].classList.add('active');
    }

    // Close sidebar on mobile after selection
    if (window.innerWidth <= 600) {
        closeSidebar();
    }
}

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (window.innerWidth <= 600 && sidebar.classList.contains('active')) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            closeSidebar();
        }
    }
});

// Initialize - ensure dashboard is shown on load
document.addEventListener('DOMContentLoaded', function() {
    switchTab('dashboard');

    // Start with sidebar open on desktop, collapsed on mobile
    const grid = document.querySelector(".grid-container");
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth > 600) {
        if (grid) {
            grid.classList.remove("sidebar-collapsed");
        }
        if (sidebar) {
            sidebar.classList.add("active");
        }
    }
});
