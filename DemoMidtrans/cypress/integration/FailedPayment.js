describe('FAILED PAYMENT', function() {
    const getIframeDocument = () => {
        return cy
        .get('iframe[id="snap-midtrans"]')
        .its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
        return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }
    it('Order Pillow use midtrans', function () {
        cy.visit('https://demo.midtrans.com')
        cy.get('.buy').click()
        // cy.get('[data-reactid=".0.0.1.0.1"] > .table > tbody > .table-content > .input').clear().type('30000')
        // cy.get('[data-reactid=".0.0.1.0.3.0.0.0"] > .input > input').clear().type('Ilham')
        // cy.get('[data-reactid=".0.0.1.0.3.0.0.1"] > .input > input').clear().type('imsyahputra53@gmail.com')
        // cy.get('[data-reactid=".0.0.1.0.3.0.0.2"] > .input > input').clear().type('085265545599')
        // cy.get('[data-reactid=".0.0.1.0.3.0.0.3"] > .input > input').clear().type('Jakarta')
        // cy.get('textarea').clear().type('Jakarta')
        // cy.get('[data-reactid=".0.0.1.0.3.0.0.5"] > .input > input').clear().type('12345')
        cy.get('.cart-checkout').click()
        getIframeBody().find('a.button-main-content').should('have.text', 'Continue').click()
        getIframeBody().find('a.list.with-promo').should('have.text', 'Credit/Debit CardPay with Visa, MasterCard, JCB, or Amexpromo').click()
        getIframeBody().find('div.input-group.col-xs-12').should('contain', 'Card number').eq(0).type('4911 1111 1111 1113')
        getIframeBody().find('div.input-group.col-xs-7').should('contain', 'Expiry date').eq(0).type('02/25')
        getIframeBody().find('div.input-group.col-xs-5').should('contain', 'CVV').eq(0).type('123')
        getIframeBody().find('div.input-group.col-xs-12').should('contain', 'Potongan 10 Rupiah').eq(1).click()
        getIframeBody().find('div.input-group.col-xs-12').should('contain', 'Email').eq(3).clear()
        getIframeBody().find('div.input-group.col-xs-12').should('contain', 'Email').eq(3).type('imsyahputra53@gmail.com')
        getIframeBody().find('div.input-group.col-xs-12').should('contain', 'Phone number').eq(4).clear()
        getIframeBody().find('div.input-group.col-xs-12').should('contain', 'Phone number').eq(4).type('+6285265545599')
        getIframeBody().find('a.button-main-content').should('have.text', 'Pay Now').click()
        cy.wait(5000)
        getIframeBody().then(($firstIframe) => {
            const $secondIframeReference = $firstIframe.contents().find('iframe')
            cy.wrap($secondIframeReference).as('secondIframeReference');
            cy.get('@secondIframeReference').then(($secondIframe) => {
                const $password = $secondIframe.contents().find('input#PaRes.form-control.input-xs')
                const $buttonOk = $secondIframe.contents().find('button.btn.btn-sm.btn-success')
                // const $buttonDone = $secondIframe.contents().find('div.text-button-main')
                cy.wrap($password).type('112233')
                cy.wrap($buttonOk).click({force: true})
                // cy.wrap($buttonDone).click({force: true})
            })            
        })
        // getIframeBody().find('div.text-button-main').click({force:true})
        getIframeBody().find('div.text-button-main').should('have.text', 'Use Another Payment Options').click({force:true})
        cy.wait(1000)
        getIframeBody().find('a.list').eq(1).click()
        cy.wait(1000)
        getIframeBody().find('a.list').eq(0).click()
        cy.wait(1000)
        getIframeBody().find('div.text-button-main').should('have.text', 'See Account Number').click({force:true})
        getIframeBody().find('div.text-button-main').should('have.text', 'Please Complete Payment').click({force:true})
        cy.get('.trans-status').contains('Thank you for your purchase')
    })
    Cypress.on('uncaught:exception', (err, runnable)=>{
      return false
    })
})