// Function to toggle the dropdown menu
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}

// Function to set the mode and save it in a cookie
function setMode(mode) {
    var message = "";
    switch (mode) {
        case 'system':
            var systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.body.classList.remove('dark-mode');
            if (systemMode === 'dark') {
                document.body.classList.add('dark-mode');
                message = "Dark mode has been activated based on your system preference.";
                document.cookie = "mode=dark";
            } else {
                message = "Light mode has been activated based on your system preference.";
                document.cookie = "mode=light";
            }
            break;
        case 'light':
            document.body.classList.remove('dark-mode');
            message = "Light mode has been activated.";
            document.cookie = "mode=light";
            break;
        case 'dark':
            document.body.classList.add('dark-mode');
            message = "Dark mode has been activated.";
            document.cookie = "mode=dark";
            break;
        default:
            break;
    }

    // Show popup message for all mode changes
    showPopup(message);

    // Close the dropdown
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.remove("show");
}

// Function to show a popup message
function showPopup(message) {
    var popup = document.getElementById("popup");
    popup.textContent = message;
    popup.classList.add("show");

    // Hide popup after 3 seconds
    setTimeout(function() {
        popup.classList.remove("show");
    }, 3000);
}

// Function to read the mode from cookies and apply it when the page loads
window.onload = function() {
    var mode = getCookie("mode");
    if (mode) {
        setMode(mode);
    }
}

// Function to read a cookie value by name
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Listen for changes in system color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    var newMode = e.matches ? 'dark' : 'light';
    setMode(newMode);
});
