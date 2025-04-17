    window.addEventListener('DOMContentLoaded', () => {
        let selected = null;
        const lines = [];
    
        document.querySelectorAll('.item').forEach(el => {
        el.addEventListener('click', () => {
            if (!selected) {
            selected = el;
            el.style.backgroundColor = '#dff0d8';
            } else {
            if (
                selected.dataset.id !== el.dataset.id &&
                selected.parentElement !== el.parentElement
            ) {
                createLine(selected, el);
    
                selected.style.backgroundColor = 'white';
                el.style.backgroundColor = 'white';
                selected = null;
            } else {
                selected.style.backgroundColor = 'white';
                selected = null;
            }
            }
        });
        });
    
    function createLine(startEl, endEl) {
        const game = document.querySelector('.game');
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
    
        const offsetX = window.scrollX + game.getBoundingClientRect().left;
        const offsetY = window.scrollY + game.getBoundingClientRect().top;
    
        const startX = startRect.right - offsetX;
        const startY = startRect.top + startRect.height / 2 - offsetY;
        const endX = endRect.left - offsetX;
        const endY = endRect.top + endRect.height / 2 - offsetY;
    
        const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.height = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = 'top left';
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
    
        game.appendChild(line);
        lines.push({ line, start: startEl, end: endEl });
        }
    
        window.checkMatches = function () {
        let correct = 0;
    
        lines.forEach(({ start, end }) => {
            if (start.dataset.id === end.dataset.id) {
            correct++;
            }
        });
    
        const result = document.getElementById('result');
        if (correct === 3) {
            result.textContent = "Bravo ! Toutes les associations sont correctes.";
            result.style.color = "green";
        } else {
            result.textContent = `Tu as ${correct} bonne(s) réponse(s). Essaie encore !`;
            result.style.color = "red";
        }
        };
    });
    