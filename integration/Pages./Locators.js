export class Locators {

  emailInput() {
    return cy.get('.login-form__username-field input')
  }

  passwordInput() {
    return cy.get('.login-form__password-field input')
  }

  signInButton() {
    return cy.get('.app-button-primary-o')
  }

  eNlanguage() {
    return cy.get('[class*=el-select-dropdown][style*=position] li:nth-child(1)')
  }

  bookingTab() {
    return cy.get('.dynamic-nav__menu-item__booking')
  }

  login() {
    return cy.get('.login-form__login-button')
  }

  languageSelect() {

    return cy.get('.el-input__inner')
  }

  notification() {

    return cy.get('.el-notification__content > p')
  }

  languageDropDown() {
    return cy.get('.el-icon-arrow-up').first()
  }

  bookingInputField() {
    return cy.get('.booking-language-field .el-input__inner').first()
  }

  bookingInputAfterTextEnter() {
    return cy.get('.hover > span')
  }

  dayField() {
    return cy.get('.el-form-item .booking-date-field').first()
  }

  datePicketToday() {
    return cy.get('[class="flatpickr-day today"]').first()
  }

  openDateToday() {
    return cy.get('[class*="open"] .flatpickr-day')
  }

  nextMonth() {
    return cy.get('[class*="open"] .flatpickr-next-month')
  }

  startTime() {
    return cy.get('div[class*="start-time"] [class="el-input__inner"]').first()
  }


  endTime() {
    return cy.get('div[class*="end-time"] [class="el-input__inner"]').first()
  }

  other() {
    return cy.get('.normal-booking-form__other-options-title').first()
  }

  otherDropdown() {
    return cy.get('.booking-gender-and-translator-level-field .el-dropdown-link').first()
  }

  femaleCheckBox() {
    return cy.get('[class*="dropdown"][style*="position"] span[class="el-checkbox__label"]').eq(1)
  }

  bookingButton() {
    return cy.get('.normal-booking-form__book-button').first()
  }
}

export default Locators