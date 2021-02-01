
describe('Form', () => {

    it('when user visit homepage, the form is visible', () => {
        cy.visit('http://localhost:9000/')
        cy.get('[data-hook="mainForm"]').should('be.visible')
    })

    it('when user typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
        cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
        cy.get('@autocompleteOrigin').should('be.visible')
        cy.get('@autocompleteOrigin').type('Краснодар')
        cy.get('@autocompleteOrigin').should('have.value', 'Краснодар')
    })

    it('when user typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
        cy.get('@autocompleteDestination').should('be.visible')
        cy.get('@autocompleteDestination').type('Санкт-Петербург')
        cy.get('@autocompleteDestination').should('have.value', 'Санкт-Петербург')
    })

    it('when user click on depart datepicker the datepicker modal should open', () => {
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-container').as('modalWindow')

        cy.get('@datepickerDepartInput').click()
        cy.get('@modalWindow').should('be.visible')
    })

    it('after user selecting departing date, it should be displayed into the input field in the correct format', () => {
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-container .is-today').as('today')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons')
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')

        cy.get('@today').click()
        cy.get('@today').should('have.class', 'is-selected')
        cy.get('@modalButtons').contains('Ok').click()

        cy.get('@datepickerDepartInput').then(($input) => {
            const value = $input.val()
            // check format: YYYY-MM
            expect(value).to.match(/^\d{4}-\d{2}$/)
        })
    })

    it('when user click on return datepicker the datepicker modal should open', () => {
        cy.get('[data-hook=datepickerReturnInput]').as('datepickerReturnInput')
        cy.get('[data-hook=datepickerReturnWrap] .datepicker-container').as('modalWindow')

        cy.get('@datepickerReturnInput').click()
        cy.get('@modalWindow').should('be.visible')
    })

    it('after user selecting returning date, it should be displayed into the input field in the correct format', () => {
        cy.get('[data-hook=datepickerReturnWrap] .datepicker-container .is-today').as('today')
        cy.get('[data-hook=datepickerReturnWrap] .datepicker-container .btn-flat').as('modalButtons')
        cy.get('[data-hook=datepickerReturnInput]').as('datepickerReturnInput')

        cy.get('@today').click()
        cy.get('@today').should('have.class', 'is-selected')
        cy.get('@modalButtons').contains('Ok').click()

        cy.get('@datepickerReturnInput').then(($input) => {
            const value = $input.val()
            // check format: YYYY-MM
            expect(value).to.match(/^\d{4}-\d{2}$/)
        })
    })

    it('when user selecting the currency from the header dropdown it should be changed and visible in the header', () => {
        cy.get('[data-hook=currencySelect] .dropdown-trigger').as('currencyTrigger')
        cy.get('[data-hook=currencySelect] .dropdown-content li span').as('currencyItems')

        cy.get('@currencyTrigger').click()
        cy.get('@currencyItems').contains('€ Euro').click()
        cy.get('@currencyTrigger').should('have.value', '€ Euro')
    })
})