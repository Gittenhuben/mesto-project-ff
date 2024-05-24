const customValidityMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
let formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass;

function setValidationSettings(validationSettings) {
  formSelector = validationSettings.formSelector;
  inputSelector = validationSettings.inputSelector;
  submitButtonSelector = validationSettings.submitButtonSelector;
  inactiveButtonClass = validationSettings.inactiveButtonClass;
  inputErrorClass = validationSettings.inputErrorClass;
  errorClass = validationSettings.errorClass;
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function isValid(formElement, inputElement, forceValid = false) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(customValidityMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (inputElement.validity.valid || forceValid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function preventDefault(evt) {
  evt.preventDefault();
}

function disableButton(buttonElement) {
  buttonElement.addEventListener('click', preventDefault)
  buttonElement.classList.add(inactiveButtonClass);
}

function enableButton(buttonElement) {
  buttonElement.removeEventListener('click', preventDefault)
  buttonElement.classList.remove(inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

export function refreshValidState(formElement, validationSettings, forceValid = false) {
  setValidationSettings(validationSettings);

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, forceValid);
  });
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  buttonElement.addEventListener('click', (evt) => {
    refreshValidState(formElement, validationSettings);
  })
}

export function enableValidation(validationSettings) {
  setValidationSettings(validationSettings);

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
}
