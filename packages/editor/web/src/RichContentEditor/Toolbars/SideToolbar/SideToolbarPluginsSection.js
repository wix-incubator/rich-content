import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import { getPluginsForTag } from '../../pluginsSearchTags';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getSortedSections } from './utils';
import classNames from 'classnames';

const shouldSplitByDefault = (structure, t) => {
  const numberOfBasicPlugins = structure.filter(
    ({ section }) => section === t('BlockToolbar_Section_Basic')
  ).length;
  return numberOfBasicPlugins > 1 && structure.length - numberOfBasicPlugins > 1;
};
const SideToolbarPluginsSection = ({
  theme,
  getEditorState,
  setEditorState,
  structure,
  searchTag,
  t,
  hidePopup,
  splitToSections = shouldSplitByDefault(structure, t),
}) => {
  const pluginsForTag = searchTag && getPluginsForTag(searchTag, t);
  const plugins = !searchTag
    ? structure
    : structure.filter(({ name }) => pluginsForTag.includes(name));

  if (plugins.length === 0) {
    return (
      <div className={Styles.pluginsSectionEmptyState}>
        {`No blocks found.\n Try another search term.`}
      </div>
    );
  }

  const pluginSectionRenderer = section => {
    const pluginsToRender = section
      ? plugins.filter(({ section: pluginSection }) => pluginSection === section)
      : plugins;
    return [
      section && (
        <div key={section} className={Styles.pluginsSection}>
          {section}
        </div>
      ),
      <div key="pluginsButtons" className={Styles.buttonsWrapper}>
        {pluginsToRender.map(({ component: Component }, index) => (
          <div
            key={index}
            className={classNames(Styles.buttonWrapper, splitToSections && Styles.withSections)}
          >
            <Component
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme}
              showName
              toolbarName={TOOLBARS.SIDE}
              hidePopup={hidePopup}
            />
          </div>
        ))}
      </div>,
    ];
  };

  const sections = [];
  splitToSections &&
    structure.forEach(({ section }) => !sections.includes(section) && sections.push(section));

  if (sections.length > 0) {
    return getSortedSections(sections).map(section => pluginSectionRenderer(section));
  } else {
    return pluginSectionRenderer();
  }
};

SideToolbarPluginsSection.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  searchTag: PropTypes.string,
  hidePopup: PropTypes.func,
  splitToSections: PropTypes.bool,
};

export default SideToolbarPluginsSection;
