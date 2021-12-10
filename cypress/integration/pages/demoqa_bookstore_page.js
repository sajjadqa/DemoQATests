class DemoQaBookstore {
  constructor() {
    this.BOOK_NAME = null
  }

  goToBookStorePage() {
    cy.get('.element-group #item-2').contains('Book Store').click()
    cy.url().should('include', '/books')
  }

  getBooksList() {
    cy.get('.mr-2 a').then(($books_list) => {
      let books_array = []
      for (let i = 0; i < $books_list.length; i++) {
        books_array.push($books_list[i].innerText)
      }
      console.log(books_array);
      let index = Math.floor(Math.random() * books_array.length)
      console.log(index);
	    this.BOOK_NAME = books_array[index]
      console.log(this.BOOK_NAME);
    })
  }

  searchForBook(book_name) {
    console.log(book_name);
    cy.get('#searchBox').type(book_name).then(() => {
      cy.get('.mr-2 a').invoke('text').should('be.equal', book_name)
    })
  }

  openBookDetails() {
    cy.get('.mr-2 a').click().then(() => {
      cy.get('#ISBN-wrapper .form-label#userName-value').invoke('text').then((isbn) => {
        cy.url().should('include', isbn)
      })
    })
  }

  addBookToYourCollection() {
    cy.contains('Add To Your Collection').click()
    // cy.on('window:confirm', (text) => {
    //   expect(text).to.contains('Book added to your collection.');
    // })
    cy.contains('Back To Book Store').click()
  }

  navigateToProfile() {
    cy.get('ul.menu-list #item-3').contains('Profile').click()
    cy.url().should('include', '/profile')
  }

  verifyAddedBook(book_name) {
    cy.get('.mr-2 a').each(($lis) => {
      console.log($lis);
    }).then(($lis) => {
        expect($lis).to.contain(book_name)
    })
  }

  deleteAllAddedBooks() {
    cy.get('.mt-2').contains('Delete All Books').click()
    cy.get('.modal-content').within(() => {
      cy.get('#closeSmallModal-ok').click()
    })
    cy.get('.modal-content').should('not.exist')

  }
}

export default DemoQaBookstore
