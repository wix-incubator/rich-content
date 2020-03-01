/*global cy Cypress*/
import { fixtures, fixturesToTestOnSeo } from './constants';
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from '../tests/constants';

const testFixture = (fixture, isMobile) =>
  it(`render ${fixture}`, function() {
    isMobile && cy.switchToMobile();
    cy.loadEditorAndViewer(fixture);
    if (fixture.includes('video')) {
      cy.waitForVideoToLoad();
    } else if (fixture.includes('html')) {
      cy.waitForHtmlToLoad();
    }
    cy.eyesCheckWindow(this.test.title);
  });

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('desktop', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    fixtures.forEach(fixture => testFixture(fixture));
  });

  context('mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: DEFAULT_MOBILE_BROWSERS,
      });
    });

    after(() => {
      cy.eyesClose();
    });

    const isMobile = true;
    fixtures.forEach(fixture => testFixture(fixture, isMobile));
  });

  context('seo', () => {
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

    fixturesToTestOnSeo.forEach(fixture => testFixture(fixture));
  });
});
