/// <reference types="Cypress" />
import locators from '../Pages./Locators'
import Confirmation from '../Pages./ConfirmationModal'
let CustomerCardential
let InvalidCardential
let Data
var bookingID
let confirmationData
let bookingcreation
var eztz = require('eztz')


//Note:-
//I know each test case should be individul but in this i am running 
//Test cases and keeping previous state store. 


//Some Veriable Might Confuse you. But i am aware about this fact. We need to write 
//Proper names for each fiedl or veriable. 

//Time geting of Swedan and adding 7 hours in it.
var timeInSweden = eztz.get(2)

var currentSwedenTime = parseInt(timeInSweden.toLocaleString('en-US', {

  hour: 'numeric',

  hour12: false
}))

var requiredTime = (currentSwedenTime + 7)

//Date getting of Swedan and adding 14 days in it. 
var currentSwedenDate = parseInt(timeInSweden.toLocaleString('en-US', {

  day: 'numeric',
}))

var requiredDate = new Date()

var numberOfDaysToAdd = 14

var epoch = requiredDate.setDate(currentSwedenDate + numberOfDaysToAdd);

function convertEpochToSpecificDate(timeEpoch, offset) {

  var d = new Date(timeEpoch)

  var utc = d.getTime() + (d.getTimezoneOffset() * 60000) //This converts to UTC 00:00

  var nd = new Date(utc + (3600000 * offset))

  return nd.toLocaleString().split('/')[1]

}

var hello = convertEpochToSpecificDate(epoch, +2)

before(() => {

  //We can load data in a single fixture but i am loading from multiple fixtures.
  cy.fixture('LoginCardential.json').then((abc) => {

    Data = abc

  })

  cy.fixture('Confirmation.json').then((confirmation) => {

    confirmationData = confirmation
  })

  cy.fixture('bookingCreationData.json').then((booking) => {

    bookingcreation = booking
  })

  cy.visit(Cypress.env('Base'))
})


describe('Test Cases Suite', function () {

  const locator = new locators()

  const confirmation = new Confirmation()

  it('TS_01', function () {

    //I dont know why page is auto reloading thats why i am using explicit wait. 
    //If on specific event page is reloading we can wait for that API or event. 
    cy.wait(4000)

    cy.url().should('eq', Cypress.env('Base'))
  })

  it('TS_02', function () {

    locator.languageDropDown().click()

    locator.eNlanguage().invoke('text').then((englishText) => {

      expect(englishText).contains('EN')
    })

    locator.eNlanguage().click()

    //Checking Booking is english word so if that text is visible its mean English langauge is loaded. 
    //Further can do assertion on other elementes as well. But i check only for booking element.
    locator.bookingTab().should('contain', 'Booking')
  })

  it('TS_03', function () {

    locator.signInButton().should('be.visible').click()

    //URl are set in Enviroment. So if we need to Run test cases on different enviromrnt like Local Staging QA etc. 
    //Then simple we just create same json file under config folder with same keys and required URL's. 
    cy.url().should('eq', Cypress.env('Login'))

  })

  it('TS_04', function () {

    InvalidCardential = Data.InavlidCardential

    locator.emailInput().type(InvalidCardential.email)

    locator.passwordInput().type(InvalidCardential.password)

    locator.login().click()

    //Checking a notifiction is visible. 
    locator.notification().should('be.visible')

  })

  it('TS_05', function () {

    CustomerCardential = Data.Customer

    locator.emailInput().clear().type(CustomerCardential.email)

    locator.passwordInput().clear().type(CustomerCardential.password)

    locator.login().click()

    cy.url().should('eq', Cypress.env('Base'))

  })

  it('TS_06', function () {

    locator.bookingInputField().click().type(bookingcreation.language, "{enter}", { force: true })

    locator.bookingInputAfterTextEnter().should('contain', bookingcreation.language).click()

    locator.dayField().click()

    //Logic for the Date start here. 
    locator.datePicketToday().invoke('text').then((text) => {

      if (parseInt(text) <= parseInt(hello)) {

        locator.openDateToday().contains(hello).click()
      }
      else {

        locator.nextMonth().click()

        locator.openDateToday().contains(hello).click()
      }
    })

    locator.startTime().click().type(`${requiredTime}{downarrow}{enter}`)

    locator.endTime().click()

    locator.other().click()

    locator.otherDropdown().click()

    locator.femaleCheckBox().click()

    locator.bookingButton().click()

    // Here a Message windw is getting open.
    // It was not written in test case but its showing so i am clicking on yes button. Sometimes
    //its not appear and sometimes its appear so last time it appear that's why i am keeping
    //its locator here and not commenting it. 
    cy.get('.el-message-box__btns > .el-button--primary').click()

  })

  it('TS_07', function () {

    confirmation.bookerName().type(`${confirmationData.bookerName}`)

    confirmation.bookerName().type('{downArrow}{enter}')

    confirmation.staffName().type(`${confirmationData.staffName}`)

    confirmation.staffName().type('{downArrow}{enter}')

    confirmation.bookingReference(confirmationData.reference)

    confirmation.bookingReference().type('{downArrow}{enter}')

    confirmation.bookingNotes().type(confirmationData.bookingNotes)

    confirmation.faxRadioButton().click()

    confirmation.fax().clear().type(confirmationData.fax)

    //In Test case its mentioned to click on change. On confirmation window i cant see any change button or etc. 
    // So simply moving forward. 
    confirmation.preferGenderRadioButton().click()

    confirmation.createBookingButoon().click()

    //There is not any option to upload a document. So simply create booking. 
  })

  it('TS_08', function () {

    confirmation.sucessID().should('be.visible')

    confirmation.sucessID().invoke('text').then((text) => {

      bookingID = text
    })

    confirmation.sucessOk().click()

    // In Cypress Running browser its not moving to the My Booking tab.So this test case is failing. 
    //Its moving again into the Login screen. 
    // I am matching URL with MBooking Tab. 
    cy.url().should('contain', Cypress.env('MyBooking'))

  })

})

