import { globalDefaultTheme } from '../../../leda/components/LedaProvider';

const theme = globalDefaultTheme.dropZone;

const rejectedFilesWrapperClassNames = theme.rejectedFilesWrapper
  .split(' ')
  .map((className) => `.${className}`)
  .join('');

describe('DropZone', () => {
  before(() => {
    cy.visit('http://localhost:9000/cypress/dropzone');
  });

  describe('Display', () => {
    it('DropZone should be displayed', () => {
      cy.get(`.${theme.wrapper}`)
        .should('have.length', 3)
        .each((wrapper) => {
          cy.wrap(wrapper).should('be.visible');
        });
    });
  });

  describe('Interaction', () => {
    it('Should attach files to dropZone', () => {
      cy.get(`.${theme.content}`)
        .first()
        .attachFile('example.json', { subjectType: 'drag-n-drop' })
        .attachFile('txtFile.txt', { subjectType: 'drag-n-drop' })
        .get(rejectedFilesWrapperClassNames)
        .first()
        .next()
        .contains('example.json')
        .get(rejectedFilesWrapperClassNames)
        .first()
        .next()
        .contains('txtFile.txt');
    });

    it('Should download attached files', () => {
      cy.get(rejectedFilesWrapperClassNames)
        .first()
        .next()
        .contains('txtFile.txt')
        .then((anchor) => (
          new Cypress.Promise((resolve) => {
            fetch(anchor.prop('href'))
              .then((response) => response.blob())
              .then((body) => body.text())
              .then((text) => resolve(text));
          })
        ))
        .should('equal', 'Lorem ipsum dolor sit amet.\n');
    });

    it('Should remove attached files', () => {
      cy.get(`.${theme.fileDeleteIcon}`)
        .first()
        .click()
        .get(rejectedFilesWrapperClassNames)
        .first()
        .next()
        .contains('txtFile.txt')
        .should('not.exist')
        .get(rejectedFilesWrapperClassNames)
        .first()
        .next()
        .contains('example.json')
        .get(`.${theme.fileDeleteIcon}`)
        .first()
        .click()
        .get(rejectedFilesWrapperClassNames)
        .first()
        .next()
        .contains('example.json')
        .should('not.exist');
    });
  });

  describe('Validation', () => {
    it('Should be invalid when isRequired and files are`t attached', () => {
      cy.get('button')
        .contains('Submit')
        .click()
        .get(`.${theme.wrapper}`)
        .eq(1)
        .should('have.class', theme.invalid)
        .get(`.${theme.wrapper}`)
        .eq(1)
        .next()
        .contains('Files are required!');
    });

    it('Should be valid when isRequired and files are attached', () => {
      cy.get(`.${theme.content}`)
        .eq(1)
        .attachFile('txtFile.txt', { subjectType: 'drag-n-drop' })
        .get('button')
        .contains('Submit')
        .click()
        .get(`.${theme.wrapper}`)
        .eq(1)
        .should('not.have.class', theme.invalid)
        .get(`.${theme.wrapper}`)
        .eq(1)
        .next()
        .contains('Files are required!')
        .should('not.exist');
    });
  });

  describe('Rest', () => {
    describe('Controlled mode', () => {
      it('Should attach and remove files', () => {
        cy.get(rejectedFilesWrapperClassNames)
          .eq(2)
          .next()
          .contains('external file')
          .get(`.${theme.content}`)
          .eq(2)
          .attachFile('example.json', { subjectType: 'drag-n-drop' })
          .get(rejectedFilesWrapperClassNames)
          .eq(2)
          .next()
          .contains('example.json')
          .get(`.${theme.fileDeleteIcon}`)
          .last()
          .click()
          .get(`.${theme.fileDeleteIcon}`)
          .last()
          .click()
          .get(rejectedFilesWrapperClassNames)
          .eq(2)
          .next('ul')
          .should('not.exist');
      });
    });
  });
});
