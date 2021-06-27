export class Confirmation {

    bookerName() {
        return cy.get('.booking-confirm-form__booker-name')
    }

    staffName() {
        return cy.get('.booking-confirm-form__staff-name')
    }

    bookingReference() {
        return cy.get('.booking-confirm-form__reference')
    }

    bookingNotes() {
        return cy.get('.booking-confirm-form__message')
    }

    fax() {
        return cy.get('.booking-notification-via-field__fax-field input')
    }

    faxRadioButton() {
        return cy.get('.booking-notification-via-field__fax-radio')
    }

    createBookingButoon() {
        return cy.get('.booking-confirm-form__submit-button')
    }

    preferGenderRadioButton() {
        return cy.get('.booking-confirm-form__booking-specific-preference-gender-container > .el-form-item__content > .el-radio-group > [tabindex="0"] > .el-radio__input > .el-radio__inner')
    }

    sucessID() {
        return cy.get('.el-dialog .booking-submit-success-modal__booking-id')
    }

    sucessOk() {
        return cy.get('.booking-submit-success-modal__ok-button')
    }
}

export default Confirmation