document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll(
    "input[required], textarea[required]"
  );
  const minMaxCharElement = document.querySelector(".minmax-character");

  const validBgColor = "#8fb16925";
  const notValidBgColor = "#ff000050";

  const validBorderColor = "#8fb169";
  const notValidBorderColor = "#ff0000";

  // Function to check inputs
  function validateInput(input) {
    let valid = true;

    // Check if the element has a next sibling for error messages
    const errorElement = input.nextElementSibling;

    if (
      (input.tagName.toLowerCase() === "textarea" &&
        input.value.length > 1000) ||
      (input.tagName.toLowerCase() === "textarea" && input.value.length < 10)
    ) {
      
      valid = false;
      input.style.borderColor = notValidBorderColor;
      input.style.backgroundColor = notValidBgColor;
      if (errorElement) {
        if (input.value.length < 10) {
          errorElement.textContent = "Please enter at least 10 characters.";
        } else {
          errorElement.textContent =
            "Please enter no more than 1000 characters.";
        }
      }
    } else if (input.type === "email") {
      // Check for valid email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valid = emailPattern.test(input.value);
      if (!valid) {
        input.style.borderColor = notValidBorderColor;
        input.style.backgroundColor = notValidBgColor;
      } else {
        input.style.borderColor = validBorderColor;
        input.style.backgroundColor = validBgColor;
      }
    } else if (input.type === "tel") {
      // Check for valid number
      const minValue = parseFloat(input.getAttribute("min")) || -Infinity;
      const maxValue = parseFloat(input.getAttribute("max")) || Infinity;
      const value = parseFloat(input.value);
      valid = value >= minValue && value <= maxValue;
      if (!valid) {
        input.style.borderColor = notValidBorderColor;
        input.style.backgroundColor = notValidBgColor;
      } else {
        input.style.borderColor = validBorderColor;
        input.style.backgroundColor = validBgColor;
      }
    } else if (!input.value.trim()) {
      // Check for empty fields
      valid = false;
      input.style.borderColor = notValidBorderColor;
      input.style.backgroundColor = notValidBgColor;
    } else {
      input.style.borderColor = validBorderColor;
      input.style.backgroundColor = validBgColor;
    }

    return valid;
  }

// Function to update textarea character count and stop input at 1000 characters
  function updateTextareaCount(textarea) {
    const maxLength = 1000;
    const length = textarea.value.length;
    const remaining = maxLength - length;

    if (remaining <= 0) {
      textarea.value = textarea.value.substring(0, maxLength); // Trim to max length
    }

    minMaxCharElement.innerHTML = `(${Math.max(remaining,0)} - 1000)<span> Characters Left</span>`;
  }

  // Add event listeners for real-time validation
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateInput(input);
      if (input.tagName.toLowerCase() === "textarea") {
        updateTextareaCount(input);
      }
    });

    // Add blur event listener for when user leaves the input without writing
    input.addEventListener("blur", function () {
      validateInput(input);
    });
  });

  // Add event listener for submit
  const submitBtn = document.querySelector("input[type=submit]");
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let valid = true;
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        valid = false;
        return false;
      }
    });
    if (valid) {
      form.submit();
    }
  });
});
