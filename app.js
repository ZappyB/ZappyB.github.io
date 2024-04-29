document.addEventListener("DOMContentLoaded", function() {
    const backgroundSelect = document.getElementById("background-select");

    // Add event listener to the background select
    backgroundSelect.addEventListener("change", function() {
        // Get the selected value
        const selectedValue = backgroundSelect.value;

        // Remove existing background classes
        document.body.classList.remove("lightblue", "lightgold");

        // Add the appropriate background class based on the selected value
        document.body.classList.add(selectedValue);
    });
});
