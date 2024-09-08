document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll(
    "input[required], textarea[required]"
  );

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
      // Check for textarea exceeding 1000 characters
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

  // Add event listeners for real-time validation
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateInput(input);
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
