// Effet interactif sur les facteurs de risque (hover)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.risk-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = "#ffeded";
            item.style.transform = "scale(1.05)";
        });

        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = "";
            item.style.transform = "scale(1)";
        });
    });
});
