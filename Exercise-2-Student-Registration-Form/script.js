
// Get the form element
const form = document.getElementById("registrationForm");

// Get the success message
const successMessage = document.getElementById("successMessage");

// Function to display an error message
function showError(input, message) {

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    input.nextElementSibling.textContent = message;
}

// Function to mark a field as valid
function showSuccess(input) {

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    input.nextElementSibling.textContent = "";
}

// Form submission event
form.addEventListener("submit", function(event) {

    // Prevent default form submission
    event.preventDefault();

    let isValid = true;

    // Get input values
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
    const gender = document.getElementById("gender");
    const course = document.getElementById("course");
    const address = document.getElementById("address");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Hide previous success message
    successMessage.classList.add("d-none");

    // 1. Validate Name
    const namePattern = /^[A-Za-z ]+$/;

    if (fullName.value.trim() === "") {

        showError(fullName, "Please enter your name.");
        isValid = false;

    } else if (!namePattern.test(fullName.value.trim())) {

        showError(fullName, "Name should contain only letters.");
        isValid = false;

    } else {

        showSuccess(fullName);
    }

    // 2. Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError(email, "Please enter your email.");
        isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        showError(email, "Please enter a valid email address.");
        isValid = false;

    } else {

        showSuccess(email);
    }

    // 3. Validate Phone
    const phonePattern = /^[0-9]{10}$/;

    if (phone.value.trim() === "") {

        showError(phone, "Please enter your phone number.");
        isValid = false;

    } else if (!phonePattern.test(phone.value.trim())) {

        showError(phone, "Phone number must contain 10 digits.");
        isValid = false;

    } else {

        showSuccess(phone);
    }

    // 4. Validate Date of Birth
    const today = new Date();
    const selectedDate = new Date(dob.value + "T00:00:00");

    today.setHours(0, 0, 0, 0);

    if (dob.value === "") {

        showError(dob, "Please select your date of birth.");
        isValid = false;

    } else if (selectedDate > today) {

        showError(dob, "Date of birth cannot be in the future.");
        isValid = false;

    } else {

        showSuccess(dob);
    }

    // 5. Validate Gender
    if (gender.value === "") {

        showError(gender, "Please select your gender.");
        isValid = false;

    } else {

        showSuccess(gender);
    }

    // 6. Validate Course
    if (course.value === "") {

        showError(course, "Please select a course.");
        isValid = false;

    } else {

        showSuccess(course);
    }

    // 7. Validate Address
    if (address.value.trim().length < 5) {

        showError(address, "Please enter a valid address (at least 5 characters).");
        isValid = false;

    } else {

        showSuccess(address);
    }

    // 8. Validate Password
    if (password.value.length < 8) {

        showError(password, "Password must contain at least 8 characters.");
        isValid = false;

    } else {

        showSuccess(password);
    }

    // 9. Validate Confirm Password
    if (confirmPassword.value === "") {

        showError(confirmPassword, "Please confirm your password.");
        isValid = false;

    } else if (confirmPassword.value !== password.value) {

        showError(confirmPassword, "Passwords do not match.");
        isValid = false;

    } else {

        showSuccess(confirmPassword);
    }

    // Final Result
    if (isValid) {

        form.reset();
        
        successMessage.classList.remove("d-none");

        // Remove validation styling after reset
        const inputs = form.querySelectorAll(".form-control, .form-select");

        inputs.forEach(function(input) {
            input.classList.remove("is-valid");
            input.classList.remove("is-invalid");
            input.nextElementSibling.textContent = "";
        });
    }

});


// Reset event
form.addEventListener("reset", function() {

    successMessage.classList.add("d-none");

    const inputs = form.querySelectorAll(".form-control, .form-select");

    inputs.forEach(function(input) {

        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");

        input.nextElementSibling.textContent = "";

    });

});
