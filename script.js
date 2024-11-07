document.getElementById('addcontact').addEventListener('submit', function (event) {
    event.preventDefault();

    const nameField = document.getElementById('name');
    const numberField = document.getElementById('number');
    const errorField = document.getElementById('errorfield');
    const contactList = document.getElementById('contactlist');

    let errorMessage = "";
    errorMessage += isInputRequired(nameField, "Namn");
    errorMessage += isInputRequired(numberField, "Telefonnummer");

    if (errorMessage) {
        displayErrorMessage(errorField, errorMessage);
    } else {
        clearErrorMessage(errorField);
        addContactToList(nameField, numberField, contactList);
    }
});

function isInputRequired(input, fieldName) {
    return input.value.trim() === "" ? `${fieldName} måste fyllas i.<br>` : "";
}

function displayErrorMessage(errorField, message) {
    errorField.innerHTML = `<div class="display-error">${message}</div>`;
}

function clearErrorMessage(errorField) {
    errorField.innerHTML = "";
}

function addContactToList(nameField, numberField, contactList) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="text" class="contact-name" value="${nameField.value}" disabled>
        <input type="text" class="contact-number" value="${numberField.value}" disabled>
        <button class="edit-save-btn">Ändra</button>
        <button class="remove-btn">Ta bort</button>
        <div class="error-messages"></div>
    `;

    contactList.appendChild(listItem);

    nameField.value = "";
    numberField.value = "";

    setUpContactActions(listItem);
}

function setUpContactActions(listItem) {
    const editButton = listItem.querySelector('.edit-save-btn');
    const removeButton = listItem.querySelector('.remove-btn');

    editButton.addEventListener('click', function () {
        handleEditSave(listItem, editButton);
    });

    removeButton.addEventListener('click', function () {
        listItem.remove();
    });
}

function handleEditSave(listItem, editButton) {
    const nameInput = listItem.querySelector('.contact-name');
    const numberInput = listItem.querySelector('.contact-number');
    const errorContainer = listItem.querySelector('.error-messages');

    if (editButton.textContent === "Ändra") {
        nameInput.disabled = false;
        numberInput.disabled = false;
        editButton.textContent = "Spara";
    } else {
        const newName = nameInput.value.trim();
        const newNumber = numberInput.value.trim();

        let errorMessage = "";
        errorMessage += isInputRequired({ value: newName }, "Namn");
        errorMessage += isInputRequired({ value: newNumber }, "Telefonnummer");

        if (errorMessage) {
            displayErrorMessage(errorContainer, errorMessage);
        } else {
            clearErrorMessage(errorContainer);
            nameInput.value = newName;
            numberInput.value = newNumber;
            nameInput.disabled = true;
            numberInput.disabled = true;
            editButton.textContent = "Ändra";
        }
    }
}

document.getElementById('clearAll').addEventListener('click', function () {
    document.getElementById('contactlist').innerHTML = "";
});
