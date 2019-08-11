require('cypress-plugin-snapshots/commands');
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand();
import { INLINE_TOOLBAR_BUTTONS } from '../dataHooks';

const resizeForDesktop = () => cy.viewport('macbook-15');
const resizeForMobile = () => cy.viewport('iphone-5');

const getUrl = (componentId, fixtureName = '') =>
  `/${componentId}/${fixtureName}${isMobile ? '?mobile' : ''}`;

// Viewport size commands

const run = (app, fixtureName) => {
  cy.visit(getUrl(app, fixtureName));
};

let isMobile = false;

Cypress.Commands.add('switchToMobile', () => {
  isMobile = true;
  resizeForMobile();
});

Cypress.Commands.add('switchToDesktop', () => {
  isMobile = false;
  resizeForDesktop();
});

Cypress.Commands.add('loadEditorAndViewer', fixtureName => {
  run('combined', fixtureName);
});

Cypress.Commands.add('loadEditor', fixtureName => {
  run('rce', fixtureName);
});

Cypress.Commands.add('matchContentSnapshot', () => {
  cy.window()
    .its('__CONTENT_SNAPSHOT__')
    .toMatchSnapshot();
});

Cypress.Commands.add('matchSnapshots', () => {
  cy.matchImageSnapshot().matchContentSnapshot();
});

// Editor commands
const getEditor = () => cy.get('[contenteditable="true"]');

Cypress.Commands.add('enterText', text => {
  getEditor().type(text);
});

Cypress.Commands.add('enterParagraphs', paragraphs => {
  cy.enterText(paragraphs.join('{enter}'));
});

Cypress.Commands.add('newLine', () => {
  cy.enterText('{enter}');
});

Cypress.Commands.add('blurEditor', () => {
  getEditor().blur();
});

Cypress.Commands.add('focusEditor', () => {
  getEditor().focus();
});

function getTextElments(rootElement) {
  let textElement,
    offset = 0;
  const textElements = [],
    textOffsets = [];
  const walk = rootElement.ownerDocument.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  while ((textElement = walk.nextNode())) {
    textElements.push(textElement);
    offset += textElement.length;
    textOffsets.push(offset);
  }
  return offset => {
    const i = textOffsets.findIndex(v => v > offset);
    return { element: textElements[i], offset: i === 0 ? offset : offset - textOffsets[i - 1] };
  };
}

Cypress.Commands.add('setSelection', (start, offset) => {
  cy.focusEditor().then(args => {
    const getTextElmentAndLocalOffset = getTextElments(args[0]);
    const document = args.context;
    const range = document.createRange();
    const startObj = getTextElmentAndLocalOffset(start);
    range.setStart(startObj.element, startObj.offset);
    const endObj = getTextElmentAndLocalOffset(start + offset);
    range.setEnd(endObj.element, endObj.offset);
    document.getSelection().removeAllRanges(range);
    document.getSelection().addRange(range);
  });
});

Cypress.Commands.add('moveCursorToStart', () => {
  cy.focusEditor().type('{selectall}{uparrow}');
});

Cypress.Commands.add('moveCursorToEnd', () => {
  cy.focusEditor().type('{selectall}{downarrow}');
});

Cypress.Commands.add('setTextStyle', (buttonSelector, selection) => {
  if (selection) {
    cy.setSelection(selection[0], selection[1]);
  }
  cy.get(`[data-hook=${buttonSelector}]`).click();
});

function setInlineToolbarMenueItem(item, selection, butttonIndex) {
  cy.setTextStyle(item, selection)
    .get('.ReactModalPortal')
    .find('button')
    .eq(butttonIndex)
    .click();
}

Cypress.Commands.add('setColor', (butttonIndex = 3, selection) => {
  setInlineToolbarMenueItem(INLINE_TOOLBAR_BUTTONS.COLOR, selection, butttonIndex);
});

Cypress.Commands.add('setLineSpacing', (butttonIndex = 3, selection) => {
  setInlineToolbarMenueItem(INLINE_TOOLBAR_BUTTONS.LINE_SPACING, selection, butttonIndex);
});

// disable screenshots in debug mode. So there is no diffrence to ci.
if (Cypress.browser.isHeaded) {
  const noop = () => {};
  Cypress.Commands.overwrite('matchImageSnapshot', noop);
}
