const studentForm = document.querySelector('form#student-form');
// 1. Selektinti paieškos forma javascript'e ir priskirti ją kintamąjam.
const searchForm = document.querySelector('form#search-form');
let editedStudent = null;

const INITIAL_STUDENT_DATA = [
  {
    name: 'Vardas 1',
    surname: 'Pavarde 1',
    age: 25,
    phone: '+37045646464',
    email: 'vardas1@gmail.com',
    itKnowledge: 4,
    group: 'type 10',
    interests: ['JavaScript', 'C++']
  },
  {
    name: 'Vardas 2',
    surname: 'Pavarde 2',
    age: 40,
    phone: '+37045646464',
    email: 'vardas2@gmail.com',
    itKnowledge: 8,
    group: 'type 10',
    interests: ['JavaScript', 'Python']
  },
  {
    name: 'Vardas 3',
    surname: 'Pavarde 3',
    age: 18,
    phone: '+3704565555',
    email: 'vardas3@gmail.com',
    itKnowledge: 7,
    group: 'type 10',
    interests: ['JavaScript', 'Python']
  },
]

function renderStudent(studentData) {
  let studentName = studentData.name;
  let studentSurname = studentData.surname;
  let studentAge = studentData.age;
  let studentPhone = studentData.phone;
  let studentEmail = studentData.email;
  let studentItKnowledge = studentData.itKnowledge;
  let studentGroup = studentData.group;
  let interests = studentData.interests;

  let studentsList = document.querySelector('#students-list');
  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');

  let nameElement = document.createElement('p');
  nameElement.innerHTML = `<strong>Name:</strong> <span class="student-name">${studentName}</span>`;

  let surnameElement = document.createElement('p');
  surnameElement.innerHTML = `<strong>Surname:</strong> <span class="student-surname">${studentSurname}</span>`;

  let ageElement = document.createElement('p');
  ageElement.innerHTML = `<strong>Age:</strong> <span class="student-age">${studentAge}</span>`;

  let phoneElement = document.createElement('p');
  phoneElement.innerHTML = `<strong>Phone:</strong> ****`;

  let emailElement = document.createElement('p');
  emailElement.innerHTML = `<strong>Email:</strong> ****`;

  let itKnowledgeElement = document.createElement('p');
  itKnowledgeElement.innerHTML = `<strong>IT Knowledge:</strong> <span class="student-it-knowledge">${studentItKnowledge}</span>`;

  let groupElement = document.createElement('p');
  groupElement.innerHTML = `<strong>Group:</strong> <span class="student-group">${studentGroup}</span>`;

  let interestWrapperElement = document.createElement('div');
  interestWrapperElement.classList.add('interest-wrapper');

  let interestTitleElement = document.createElement('h4');
  interestTitleElement.classList.add('interest-title');
  interestTitleElement.textContent = 'Interests:';

  let interestListElement = document.createElement('ul');
  interestListElement.classList.add('interest-list');

  interests.forEach(interest => {
    let interestItemElement = document.createElement('li');
    interestItemElement.textContent = interest;
    
    interestListElement.append(interestItemElement);
  });

  interestWrapperElement.append(interestTitleElement, interestListElement);

  let privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = 'Rodyti asmens duomenis';

  privateInfoButton.addEventListener('click', () => {
    if (!privateInfoButton.classList.contains('hide')) {
      phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
      emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
      privateInfoButton.textContent = 'Slėpti asmens duomenis';
    } else {      
      phoneElement.innerHTML = `<strong>Phone:</strong> ****`;
      emailElement.innerHTML = `<strong>Email:</strong> ****`;
      privateInfoButton.textContent = 'Rodyti asmens duomenis';
    }

    privateInfoButton.classList.toggle('hide');
  });

  let deleteStudentButton = document.createElement('button');
  deleteStudentButton.textContent = 'Remove student';

  deleteStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let messageText = `Student deleted (${studentName} ${studentSurname})`;
    alertMessage(messageText);
  })

  let editStudentButton = document.createElement('button');
  editStudentButton.textContent = 'Edit';

  editStudentButton.addEventListener('click', () => {
    studentForm.elements.name.value = studentName;
    studentForm.elements.surname.value = studentSurname;
    studentForm.elements.age.value = studentAge;
    studentForm.elements.phone.value = studentPhone;
    studentForm.elements.email.value = studentEmail;
    studentForm.elements.group.value = studentGroup;
    document.querySelector('#student-it-knowledge').value = studentItKnowledge;
    studentForm.elements['it-knowledge'].value = studentItKnowledge;

    studentForm.elements.interest.forEach(formInterest => {
      formInterest.checked = false;
      interests.forEach(studentInterest => {
        if (studentInterest.value === formInterest.value) {
          formInterest.checked = true;
        }
      });
    });

    studentForm.querySelector('[type="submit"]').value = 'Save Changes';
    editedStudent = studentItem;
    itKnowledgeOutputReset();
  });

  studentItem.append(nameElement, surnameElement, ageElement, phoneElement, emailElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, deleteStudentButton, editStudentButton);

  if (editedStudent) {
    editedStudent.replaceWith(studentItem);
    editedStudent = null;

    let alertText = `Student edited (${studentName} ${studentSurname})`;
    alertMessage(alertText);
    studentForm.querySelector('[type="submit"]').value = 'Submit';
  } else {
    studentsList.prepend(studentItem);
    let alertText = `Student created (${studentName} ${studentSurname})`;
    alertMessage(alertText);
  }
}

function renderInitialData(students) {
  students.map(student => {
    renderStudent(student);
  })
}

renderInitialData(INITIAL_STUDENT_DATA);

function itKnowledgeOutputReset() {
  const itKnowledgeInputElement = document.querySelector('#student-it-knowledge');
  const itKnowledgeOutputElement = document.querySelector('#it-knowledge-output');

  itKnowledgeOutputElement.textContent = itKnowledgeInputElement.value;
  
  itKnowledgeInputElement.addEventListener('input', (event) => {
    // console.log(itKnowledgeInputElement.value)
    // console.log(event.target.value);
    itKnowledgeOutputElement.textContent = event.target.value;
  });
}

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // let studentName = document.querySelector('#student-name').value;
  // let studentSurname = document.getElementById('student-surname').value;
  // let studentAge = event.target.querySelector('#student-age').value;
  // let studentPhone = studentForm.querySelector('[name="phone"]').value;
  // let studentEmail = event.target.elements.email.value;
  // let studentItKnowledge = event.target.elements['it-knowledge'].value;
  // let studentGroup = event.target.elements.group.value;
  // let interests = document.querySelectorAll('input[name="interest"]:checked');

  // if (!formErrorHandler()) {
  //   return;
  // }

  let formIsValid = formErrorHandler(event.target);

  if (!formIsValid) {
    return;
  }

  let formInterests = document.querySelectorAll('input[name="interest"]:checked');
  let interestValues = [...formInterests].map(interest => {
    return interest.value;
  })

  let studentFormData = {
    name: document.querySelector('#student-name').value,
    surname: document.getElementById('student-surname').value,
    age: event.target.querySelector('#student-age').value,
    phone: studentForm.querySelector('[name="phone"]').value,
    email: event.target.elements.email.value,
    itKnowledge: event.target.elements['it-knowledge'].value,
    group: event.target.elements.group.value,
    interests: interestValues,
  };

  renderStudent(studentFormData);

//   let studentsList = document.querySelector('#students-list');
//   let studentItem = document.createElement('div');
//   studentItem.classList.add('student-item');

//   let nameElement = document.createElement('p');
//   nameElement.innerHTML = `<strong>Name:</strong> <span class="student-name">${studentName}</span>`;

//   let surnameElement = document.createElement('p');
//   surnameElement.innerHTML = `<strong>Surname:</strong> <span class="student-surname">${studentSurname}</span>`;

//   let ageElement = document.createElement('p');
//   ageElement.innerHTML = `<strong>Age:</strong> <span class="student-age">${studentAge}</span>`;

//   let phoneElement = document.createElement('p');
//   // phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
//   phoneElement.innerHTML = `<strong>Phone:</strong> ****`;

//   let emailElement = document.createElement('p');
//   // emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
//   emailElement.innerHTML = `<strong>Email:</strong> ****`;

//   let itKnowledgeElement = document.createElement('p');
//   itKnowledgeElement.innerHTML = `<strong>IT Knowledge:</strong> <span class="student-it-knowledge">${studentItKnowledge}</span>`;

//   let groupElement = document.createElement('p');
//   groupElement.innerHTML = `<strong>Group:</strong> <span class="student-group">${studentGroup}</span>`;

//   let interestWrapperElement = document.createElement('div');
//   interestWrapperElement.classList.add('interest-wrapper');

//   let interestTitleElement = document.createElement('h4');
//   interestTitleElement.classList.add('interest-title');
//   interestTitleElement.textContent = 'Interests:';

//   let interestListElement = document.createElement('ul');
//   interestListElement.classList.add('interest-list');

//   interests.forEach(interest => {
//     let interestItemElement = document.createElement('li');
//     interestItemElement.textContent = interest.value;
    
//     interestListElement.append(interestItemElement);
//   });

//   interestWrapperElement.append(interestTitleElement, interestListElement);

//   let privateInfoButton = document.createElement('button');
//   privateInfoButton.textContent = 'Rodyti asmens duomenis';

//   // let hiddenData = true;
//   // privateInfoButton.addEventListener('click', () => {
//   //   if (hiddenData) {
//   //     phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
//   //     emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
//   //     privateInfoButton.textContent = 'Slėpti asmens duomenis';
//   //   } else {      
//   //     phoneElement.innerHTML = `<strong>Phone:</strong> ****`;
//   //     emailElement.innerHTML = `<strong>Email:</strong> ****`;
//   //     privateInfoButton.textContent = 'Rodyti asmens duomenis';
//   //   }

//   //   hiddenData = !hiddenData;
//   // });

//   privateInfoButton.addEventListener('click', () => {
//     if (!privateInfoButton.classList.contains('hide')) {
//       phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
//       emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
//       privateInfoButton.textContent = 'Slėpti asmens duomenis';
//     } else {      
//       phoneElement.innerHTML = `<strong>Phone:</strong> ****`;
//       emailElement.innerHTML = `<strong>Email:</strong> ****`;
//       privateInfoButton.textContent = 'Rodyti asmens duomenis';
//     }

//     privateInfoButton.classList.toggle('hide');
//   });

//   let deleteStudentButton = document.createElement('button');
//   deleteStudentButton.textContent = 'Remove student';

//   deleteStudentButton.addEventListener('click', () => {
//     studentItem.remove();
//     let messageText = `Student deleted (${studentName} ${studentSurname})`;
//     alertMessage(messageText);
//   });

// //   SEPTINTA UŽDUOTIS:
// // 1. Prie kiekvieno studento pridėti mygtuką, kurį paspaudus leistų redaguoti studento duomenis.
// // 2. Redaguojant studentą, submit mygtuko tekstas turėtų pasikeisti į „Save Changes".
// // 3. Pakeitus studento duomenis, turi iššokti <span> elementas, kuris informuoja apie studento duomenų redagavimą: „Studento (Vardas Pavardė) duomenys sėkmingai pakeisti". Šis span elementas dingsta po 5 sekundžių.

//   // 1. Sukurti Edit mygtuką.
//   let editStudentButton = document.createElement('button');
//   editStudentButton.textContent = 'Edit';

//   // 2. Prie mygtuko pridėti event listener'į.
//   editStudentButton.addEventListener('click', () => {

//     // 3. Surinkti studento duomenis ir jais užpildyti formos laukelius.

//     // document.querySelector('#student-name').value = studentName;
//     studentForm.elements.name.value = studentName;
//     // document.querySelector('#student-surname').value = studentSurname;
//     studentForm.elements.surname.value = studentSurname;
//     // document.querySelector('#student-age').value = studentAge;
//     studentForm.elements.age.value = studentAge;
//     // document.querySelector('#student-phone').value = studentPhone;
//     studentForm.elements.phone.value = studentPhone;
//     // document.querySelector('#student-email').value = studentEmail;
//     studentForm.elements.email.value = studentEmail;
//     studentForm.elements.group.value = studentGroup;
//     // document.querySelector('#student-it-knowledge').value = studentItKnowledge;
//     studentForm.elements['it-knowledge'].value = studentItKnowledge;

//     studentForm.elements.interest.forEach(formInterest => {
//       formInterest.checked = false;
//       interests.forEach(studentInterest => {
//         if (studentInterest.value === formInterest.value) {
//           formInterest.checked = true;
//         }
//       });
//     });

//     // 4. Pakeisti formos submit mygtuko tekstą.
//     studentForm.querySelector('[type="submit"]').value = 'Save Changes';

//     // 5. Išsaugoti studento HTML elementą kintamąjame.
//     editedStudent = studentItem;

//     itKnowledgeOutputReset();
//   });

//   studentItem.append(nameElement, surnameElement, ageElement, phoneElement, emailElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, deleteStudentButton, editStudentButton);

//   // 6. Submit event'o metu patikrinti ar kuriame naują studentą, ar redaguojame jau sukurtą.
//   if (editedStudent) {
//     // 7. Jeigu studentas redaguojamas, šį naują (redaguotą) HTML elementą panaudoti perrašant seną studento HTML elementą (kuris išsaugotas 5 žingsnyje).

//     // editedStudent kintamasis saugo originalaus studentItem reikšmę
//     console.log(editedStudent);

//     // studentItem kintamasis saugo dabartinę formos studento reikšmę
//     console.log(studentItem);

//     // editedStudent.innerHTML = studentItem.innerHTML;
//     editedStudent.replaceWith(studentItem);
//     editedStudent = null;

//     let alertText = `Student edited (${studentName} ${studentSurname})`;
//     alertMessage(alertText);

//     // 8. Pakeisti formos submit mygtuko tekstą į pradinį ir pakeisti iššokančio pranešimo tekstą.
//     studentForm.querySelector('[type="submit"]').value = 'Submit';

//   } else {
//     studentsList.prepend(studentItem);

//     let alertText = `Student created (${studentName} ${studentSurname})`;
//     alertMessage(alertText);
//   }

  // studentForm.reset();
  event.target.reset();
  itKnowledgeOutputReset();

  // localStorage.setItem('name', '');
  // localStorage.setItem('surname', '');
  localStorage.removeItem('form-info');
});

function alertMessage(text, elementClass = '') {
  const alertElement = document.querySelector('#alert');
  alertElement.textContent = text;

  if (elementClass) {
    alertElement.classList.add(elementClass);
  }

  setTimeout(() => {
    alertElement.textContent = '';
    if (elementClass) {
      alertElement.classList.remove(elementClass);
    }
  }, 5000);
}

function formErrorHandler(form) {
  form.querySelectorAll('.input-error-message').forEach(input => input.remove());

  let requiredInputs = form.querySelectorAll('input.required');

  let validForm = true;

  requiredInputs.forEach(input => {
    input.classList.remove('input-error');

    if (!input.value) {
      inputErrorMessage(input, 'Šis laukelis yra privalomas.');
      validForm = false;
      return;
    }

    if (input.name === 'name' && input.value.length < 3) {
      inputErrorMessage(input, 'Vardas privalo būti bent 3 simbolių ilgumo.');
      validForm = false;
      return;
    }

    if (input.name === 'surname' && input.value.length < 3) {
      inputErrorMessage(input, 'Pavardė privalo būti bent 3 simbolių ilgumo.');
      validForm = false;
      return;
    }

    if (input.name === 'age') {
      if (input.value < 0) {
        inputErrorMessage(input, 'Amžius privalo būti teigiamas skaičius.');
        validForm = false;
        return;
      }

      if (input.value > 120) {
        inputErrorMessage(input, 'Įvestas amžius yra per didelis.');
        validForm = false;
        return;
      }
    }
    
    if (input.name === 'phone') {
      if (input.value.length < 9 || input.value.length > 12) {
        inputErrorMessage(input, 'Įvestas telefono numeris yra neteisingas.');
        validForm = false;
        return;
      }
    }
    
    if (input.name === 'email') {
      if (input.value.length < 5 || !input.value.includes('@')) {
        inputErrorMessage(input, 'Įvestas elektroninis paštas yra neteisingas.');
        validForm = false;
        return;
      }
    }
  })

  return validForm;
}

function inputErrorMessage(inputElement, errorMessage) {
  let alertText = 'Ne visi laukeliai užpildyti.';
  alertMessage(alertText, 'error-alert');

  inputElement.classList.add('input-error');

  let inputError = document.createElement('span');
  inputError.textContent = errorMessage;
  inputError.classList.add('input-error-message');

  inputElement.after(inputError);
}

// 2. Šiam kintamąjam pridėti event listener'į - jo tipas submit.
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // 3. Submit metu, išsaugoti duomenis, kurie įvesti paieškos formoje (text input'e).
  let searchInput = event.target.elements.search.value.toLowerCase().trim();

  let searchVariation = event.target.elements.variations.value;
  console.log(searchVariation);
  
  // 4. Selektinti visus studentų elementus, jis pridedam į kintamąjį.
  let allStudents = document.querySelectorAll('.student-item');
  
  // 5. Leisti ciklą per studentų masyvą ir kiekvieno ciklo metu:
  allStudents.forEach(student => {
    // 5.1. Paselektinti studento vardą.
    let studentName = student.querySelector('.student-name').textContent.toLowerCase();
    // 5.2. Paselektinti studento pavardę.
    let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();
    let studentAge = student.querySelector('.student-age').textContent;
    let studentItKnowledge = student.querySelector('.student-it-knowledge').textContent;
    let studentGroup = student.querySelector('.student-group').textContent.toLowerCase();

    console.log(searchInput);

    switch (searchVariation) {
      case 'name':

          // 5.3. Patikrinti ar varde arba pavardėje yra ieškoma frazė.
        if (studentName.includes(searchInput)) {
          // 5.3.2. Jeigu yra, tai reikia parodyti studento elementą (display: block).
          student.style.display = 'block';
        } else {
          // 5.3.1. Jeigu nėra, tai reikia paslėpti studento elementą (display: none).
          student.style.display = 'none';
        }

        break;
      case 'surname':
        
        if (studentSurname.includes(searchInput)) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }

        break;
      case 'age':

        if (studentAge === searchInput) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }

        break;
      case 'it-knowledge':

        if (studentItKnowledge === searchInput) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }

        break;
      case 'group':

        if (studentGroup.includes(searchInput)) {
          student.style.display = 'block';
        } else {
          student.style.display = 'none';
        }

        break;
      default:
        console.error('Netinkamas');
    }


  })
});

// PIRMAS BŪDAS
function storeFormDataInLocalStorage1() {
  // Selektinami input elementai
  let nameInput = document.querySelector('#student-name');
  let surnameInput = document.querySelector('#student-surname');
  let ageInput = document.querySelector('#student-age');
  let phoneInput = document.querySelector('#student-phone');
  let emailInput = document.querySelector('#student-email');
  let itKnowledgeInput = document.querySelector('#student-it-knowledge');
  let groupInput = document.querySelector('[name="group"]:checked');

  // Pridedamas event listener prie input elementu
  nameInput.addEventListener('input', () => {
    localStorage.setItem('name', nameInput.value);
  });

  surnameInput.addEventListener('input', () => {
    localStorage.setItem('surname', surnameInput.value);
  })

  // Užpildome input elementus su localStorage reikšmėmis
  nameInput.value = localStorage.getItem('name');
  surnameInput.value = localStorage.getItem('surname');
}

// storeFormDataInLocalStorage1();

// ANTRAS BŪDAS
function storeFormDataInLocalStorage2() {
  let interests = [];

  studentForm.addEventListener('input', (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    
    if (inputName === 'interest') {

      if (interests.includes(inputValue)) {
        // let filteredInterests = interests.filter(interest => {
        //   return interest !== inputValue;
        // });
        let filteredInterests = interests.filter(interest => interest !== inputValue);
        interests = filteredInterests;
      } else {
        interests.push(inputValue);
      }

      let jsonInterests = JSON.stringify(interests);
      localStorage.setItem(inputName, jsonInterests);
    } else {
      localStorage.setItem(inputName, inputValue);
    }
  });

  studentForm.elements.name.value = localStorage.getItem('name');
  studentForm.elements.surname.value = localStorage.getItem('surname');
  studentForm.elements.age.value = localStorage.getItem('age');
  studentForm.elements.phone.value = localStorage.getItem('phone');
  studentForm.elements.email.value = localStorage.getItem('email');
  studentForm.elements['it-knowledge'].value = localStorage.getItem('it-knowledge');
  studentForm.elements.group.value = localStorage.getItem('group');

  let parsedInterests = JSON.parse(localStorage.getItem('interest'));

  parsedInterests.map(interest => {
    studentForm.querySelector(`input[value="${interest}"]`).checked = true;
  });
}

// storeFormDataInLocalStorage2();

function storeFormDataInLocalStorage3() {
  studentForm.addEventListener('input', () => {
    let formInterests = document.querySelectorAll('input[name="interest"]:checked');
    let interestValues = [...formInterests].map(interest => {
      return interest.value;
    })
  
    let formInfo = {
      name: studentForm.querySelector('#student-name').value,
      surname: studentForm.querySelector('#student-surname').value,
      age: studentForm.querySelector('#student-age').value,
      phone: studentForm.querySelector('#student-phone').value,
      email: studentForm.querySelector('#student-email').value,
      itKnowledge: studentForm.querySelector('#student-it-knowledge').value,
      group: studentForm.elements.group.value,
      interests: interestValues,
    }

    localStorage.setItem('form-info', JSON.stringify(formInfo))
  })

  let parsedFormInfo = JSON.parse(localStorage.getItem('form-info'));

  if (parsedFormInfo) {
    studentForm.querySelector('#student-name').value = parsedFormInfo.name;
    studentForm.querySelector('#student-surname').value = parsedFormInfo.surname;
    studentForm.querySelector('#student-age').value = parsedFormInfo.age;
    studentForm.querySelector('#student-phone').value = parsedFormInfo.phone;
    studentForm.querySelector('#student-email').value = parsedFormInfo.email;
    studentForm.querySelector('#student-it-knowledge').value = parsedFormInfo.itKnowledge;
    studentForm.elements.group.value = parsedFormInfo.group;

    parsedFormInfo.interests.map(interest => {
      studentForm.querySelector(`input[value="${interest}"]`).checked = true;
    })
  }
}

storeFormDataInLocalStorage3();


itKnowledgeOutputReset();