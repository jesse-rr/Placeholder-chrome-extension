document.addEventListener('DOMContentLoaded', loadTextareas);

const textareasContainer = document.getElementById('textareas');
const addTextareaButton = document.getElementById('addTextarea');

addTextareaButton.addEventListener('click', addTextarea);

function loadTextareas() {
    chrome.storage.local.get('textareas', (data) => {
        if (data.textareas && data.textareas.length > 0) {
            data.textareas.forEach(item => {
                createTextarea(item.name, item.value);
            });
        } else {
            createTextarea('', '');
        }
    });
}

function addTextarea() {
    createTextarea('', '');
}

function createTextarea(name, value) {
    const textareaWrapper = document.createElement('div');

    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Title';
    nameInput.value = name;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        textareasContainer.removeChild(textareaWrapper);
        saveTextareas();
    });

    const textarea = document.createElement('textarea');
    textarea.value = value;

    textareaWrapper.appendChild(nameInput);
    textareaWrapper.appendChild(removeButton);
    textareaWrapper.appendChild(textarea);
    textareasContainer.appendChild(textareaWrapper);

    nameInput.addEventListener('input', saveTextareas);
    textarea.addEventListener('input', saveTextareas);
    saveTextareas();
}

function saveTextareas() {
    const textareas = Array.from(textareasContainer.querySelectorAll('div')).map(wrapper => {
        const name = wrapper.querySelector('input').value;
        const value = wrapper.querySelector('textarea').value;
        return { name, value };
    });
    chrome.storage.local.set({ textareas });
}
