import { INLINE_TOOLBAR_BUTTONS } from '../cypress/dataHooks';

describe('editor', () => {
  beforeEach(() => cy.switchToDesktop());

  it('should allow to enter text', () => {
    cy.loadEditor()
      .enterParagraphs([
        'Leverage agile frameworks',
        'to provide a robust synopsis for high level overviews.',
      ])
      .blurEditor()
      .matchSnapshots();
  });

  it('should allow to apply inline styles', () => {
    cy.loadEditor('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [0, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ALIGNMENT)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [30, 170])
      .setColor(3, [20, 30])
      .setLineSpacing(3, [30, 100])
      .setSelection(0, 0)
      .blurEditor()
      .matchSnapshots();
  });

  it('should allow to create lists', () => {
    cy.loadEditor('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST, [300, 100])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST, [550, 1])
      .matchSnapshots();
  });
});
