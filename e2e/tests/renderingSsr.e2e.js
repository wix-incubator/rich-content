/*global cy Cypress*/
import { fixturesToTestOnSeo, DEFAULT_DESKTOP_BROWSERS } from './settings';

const testFixtureOnSsr = fixture => {
  it(`render ${fixture} in ssr`, function() {
    cy.loadTestAppOnSsr(fixture, 'rce');
    cy.eyesCheckWindow(this.test.title);
  });
  it(`render ${fixture} in ssr [wrapper]`, function() {
    cy.loadTestAppOnSsr(fixture, 'wrapper');
    cy.eyesCheckWindow(this.test.title);
  });
};

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('seoSSR', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => {
      cy.switchToDesktop();
      cy.switchToSeoMode();
    });

    after(() => cy.eyesClose());

    fixturesToTestOnSeo.forEach(testFixtureOnSsr);
  });
});
