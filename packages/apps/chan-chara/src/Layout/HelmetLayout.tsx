/*eslint-disable*/
import React from 'react';
import { MetaHeadEmbed } from '@phntms/react-share';
import { Helmet } from 'react-helmet';
import { HelmetContext } from 'src/contexts/HelmetContext';

const HelmetLayout: React.FC = ({ children }) => {
  const { title, description, image } = React.useContext(HelmetContext);
  const isAvailable = (input?: string): boolean => {
    if (input && input.length > 0) return true;
    return false;
  };

  const parseHTML = (s: string): string => {
    return s?.replaceAll(/<.+?>/g, '').replaceAll(/&.*;/g, ' ');
  };

  const renderMetaHeadEmbed = React.useMemo((): JSX.Element => {
    /* eslint-disable */
    if (isAvailable(title) && isAvailable(description)) {
      return (
        <MetaHeadEmbed
          render={(meta: React.ReactNode) => (
            <Helmet>
              <meta property="fb:app_id" content="3217486101805594" />
              {meta}
            </Helmet>
          )}
          siteTitle="ชาญชรา"
          pageTitle={parseHTML(title)}
          titleTemplate="[pageTitle] | [siteTitle]"
          description={parseHTML(description)}
          baseSiteUrl={window.location.href}
          imageUrl={
            image && image.length > 0
              ? image
              : 'https://ipfs.io/ipfs/QmUP6Ji58tmwGxKmW2DEn1Tie2KdvfBSRVqZS7hgefyAoq?filename=241366912_837375283639828_7798315557432795175_n.png'
          }
          imageAlt="ชาญชรา"
        />
      );
    } else if (isAvailable(title)) {
      return (
        <MetaHeadEmbed
          render={(meta: React.ReactNode) => (
            <Helmet>
              <meta property="fb:app_id" content="3217486101805594" />
              {meta}
            </Helmet>
          )}
          siteTitle="ชาญชรา"
          pageTitle={parseHTML(title)}
          titleTemplate="[pageTitle] | [siteTitle]"
          description=""
          baseSiteUrl={window.location.href}
          imageUrl={
            image && image.length > 0
              ? image
              : 'https://ipfs.io/ipfs/QmUP6Ji58tmwGxKmW2DEn1Tie2KdvfBSRVqZS7hgefyAoq?filename=241366912_837375283639828_7798315557432795175_n.png'
          }
          imageAlt="ชาญชรา"
        />
      );
    } else {
      return (
        <MetaHeadEmbed
          render={(meta: React.ReactNode) => (
            <Helmet>
              <meta property="fb:app_id" content="3217486101805594" />
              {meta}
            </Helmet>
          )}
          siteTitle="ชาญชรา"
          pageTitle="ชาญชรา"
          titleTemplate="[pageTitle] | [siteTitle]"
          description=""
          baseSiteUrl={window.location.href}
          imageUrl={
            image && image.length > 0
              ? image
              : 'https://ipfs.io/ipfs/QmUP6Ji58tmwGxKmW2DEn1Tie2KdvfBSRVqZS7hgefyAoq?filename=241366912_837375283639828_7798315557432795175_n.png'
          }
          imageAlt="ชาญชรา"
        />
      );
    }
    /* eslint-enable */
  }, [title, description, image]);

  return (
    <>
      {renderMetaHeadEmbed}
      {children}
    </>
  );
};

export default HelmetLayout;
