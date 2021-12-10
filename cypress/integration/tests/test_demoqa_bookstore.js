import DemoQaLogin from '../pages/demoqa_login_page'
import DemoQaBookstore from '../pages/demoqa_bookstore_page'
let login_page
let profile_page
let books_store

  describe('DemoQA Books Store E2E user journey.', () => {
    before(() => {
      // runs once before the tests in the block
      cy.visit(`${Cypress.config('baseUrl')}/login`)
      login_page = new DemoQaLogin()
      profile_page = new DemoQaBookstore()
      login_page.fillLoginForm()
      login_page.clickLoginButton()
      login_page.verifyLoginSuccess()
      profile_page.goToBookStorePage()
      profile_page.getBooksList()
     })

    it('Verify that the user searches for one of the available books. The user opens the details of the book. The user clicks ‘Add to Your Collection’. The user navigates to his/her profile. The user checks whether the book is now part of their collection. And at the end delete all added books for the user.', () => {
      books_store = new DemoQaBookstore()
      books_store.searchForBook(profile_page.BOOK_NAME)
      books_store.openBookDetails()
      books_store.addBookToYourCollection()
      books_store.navigateToProfile()
      books_store.verifyAddedBook(profile_page.BOOK_NAME)
      books_store.deleteAllAddedBooks()
    })

  })
