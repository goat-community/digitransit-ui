import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Link from 'found/Link';
import { FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

const ImpressumPage = ({ currentLanguage }, { config }) => {
  const impressum = config.impressum[currentLanguage];
  return (
    <div className="about-page fullscreen">
      <div className="page-frame fullscreen momentum-scroll">
        {impressum.map((section, i) =>
          (section.paragraphs && section.paragraphs.length) || section.link ? (
            <div key={`impressum-section-${i}`}>
              {i === 0 ? (
                <h1 className="about-header">{section.header}</h1>
              ) : (
                <h2 className="about-header">{section.header}</h2>
              )}
              {section.paragraphs &&
                section.paragraphs.map((p, j) => (
                  // eslint-disable-next-line react/no-danger
                  <p
                    dangerouslySetInnerHTML={{ __html: p }}
                    key={`impressum-section-${i}-p-${j}`}
                  />
                ))}
              {section.link && (
                <a href={section.link} className="link">
                  <FormattedMessage
                    id="extra-info"
                    defaultMessage="More information"
                  />
                </a>
              )}
            </div>
          ) : (
            false
          ),
        )}
        <Link to="/">
          <div className="call-to-action-button">
            <FormattedMessage
              id="back-to-front-page"
              defaultMessage="Back to front page"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

ImpressumPage.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
};

ImpressumPage.contextTypes = {
  config: PropTypes.object.isRequired,
};

const connectedComponent = connectToStores(
  ImpressumPage,
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage(),
  }),
);

export { connectedComponent as default, ImpressumPage as Component };
