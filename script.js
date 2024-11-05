document.getElementById('addcontact').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();

    if (!name || !number) return;

    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;

    const numberSpan = document.createElement('span');
    numberSpan.textContent = number;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    let nameInput, numberInput;

    editButton.addEventListener('click', function () {

        if (editButton.textContent === 'Edit') {

            nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = nameSpan.textContent.trim();
            nameInput.required = true;

            numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.value = numberSpan.textContent.trim();
            numberInput.required = true;

            contactDiv.replaceChild(nameInput, nameSpan);
            contactDiv.replaceChild(numberInput, numberSpan);
            editButton.textContent = 'Save';

        } else {

            if (!nameInput.checkValidity() || !numberInput.checkValidity()) {
                nameInput.reportValidity();
                numberInput.reportValidity();
                return;
            }

            nameSpan.textContent = nameInput.value;
            numberSpan.textContent = numberInput.value;

            contactDiv.replaceChild(nameSpan, nameInput);
            contactDiv.replaceChild(numberSpan, numberInput);

            editButton.textContent = 'Edit';
        }
    });

    removeButton.addEventListener('click', function () {
        contactDiv.remove();
    });
    contactDiv.appendChild(nameSpan);
    contactDiv.appendChild(numberSpan);
    contactDiv.appendChild(editButton);
    contactDiv.appendChild(removeButton);

    document.getElementById('contactlist').appendChild(contactDiv);

    document.getElementById('name').value = '';
    document.getElementById('number').value = '';

});