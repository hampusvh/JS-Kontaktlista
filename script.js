document.getElementById('addcontact').addEventListener('submit', function (event) {
    event.preventDefault();

    const nameField = document.getElementById('name');
    const numberField = document.getElementById('number');
    const errorField = document.getElementById('errorfield');
    const contactList = document.getElementById('contactlist');

    let errorMessage = "";
    if (!nameField.value || !numberField.value) {
        errorMessage = "Både namn och telefonnummer måste fyllas i.";
    }

    if (errorMessage) {
        errorField.textContent = errorMessage;
    } else {
        errorField.textContent = "";

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="contact-text">
                <span class="contact-name">${nameField.value}</span>
                <span class="contact-number">${numberField.value}</span>
            </span>
            <button class="edit-save-btn">Edit</button>
            <button class="remove-btn">Remove</button>
        `;
        contactList.appendChild(listItem);

        nameField.value = "";
        numberField.value = "";

        listItem.querySelector('.edit-save-btn').addEventListener('click', function () {
            const editButton = listItem.querySelector('.edit-save-btn');
            const nameSpan = listItem.querySelector('.contact-name');
            const numberSpan = listItem.querySelector('.contact-number');

            if (editButton.textContent === "Edit") {
                nameSpan.innerHTML = `<input type="text" class="edit-name" value="${nameSpan.textContent.trim()}">`;
                numberSpan.innerHTML = `<input type="number" class="edit-number" value="${numberSpan.textContent.trim()}">`;
                editButton.textContent = "Save";
            } else {
                const newName = listItem.querySelector('.edit-name').value;
                const newNumber = listItem.querySelector('.edit-number').value;

                let hasError = false;

                if (!newName) {
                    nameSpan.innerHTML += `<div class="name-error">Namn saknas</div>`;
                    hasError = true;
                } else {
                    nameSpan.textContent = newName;
                }

                if (!newNumber) {
                    numberSpan.innerHTML += `<div class="number-error">Nummer saknas</div>`;
                    hasError = true;
                } else {
                    numberSpan.textContent = newNumber;
                }

                if (!hasError) {
                    editButton.textContent = "Edit";
                }
            }
        });

        listItem.querySelector('.remove-btn').addEventListener('click', function () {
            contactList.removeChild(listItem);
        });
    }
});

document.getElementById('clearAll').addEventListener('click', function () {
    const contactList = document.getElementById('contactlist');
    contactList.innerHTML = "";
});
