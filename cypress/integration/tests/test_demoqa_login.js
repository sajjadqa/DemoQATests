import DemoQaLogin from '../pages/demoqa_login_page'
import DemoQaBookstore from '../pages/demoqa_bookstore_page'
let login_page
let home_page

  describe('DemoQA Login tests <bookstore>', () => {
    beforeEach(() => {
      // runs once before all tests in the block
      cy.visit(`${Cypress.config('baseUrl')}/login`)
     })

    it('Verify that user should be login successfully.', () => {
      home_page = new DemoQaBookstore()
      login_page = new DemoQaLogin()
      login_page.fillLoginForm()
      login_page.clickLoginButton()
      login_page.verifyLoginSuccess()
  })

    it('Verify that user should not be login with invalid credentials.', () => {
      login_page.errorValidationWithInvalidCredentials()
  })

    it('Verify that error should be shown when user tries to login without giving credentials.', () => {
      login_page.errorValidationWithoutCredentials()
    })

    it('Verify that user should be logout successfully.', () => {
      login_page.logoutSuccessfully()
  })

 })
