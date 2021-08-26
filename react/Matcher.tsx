import React, { FC } from "react";
import { FormattedMessage } from 'react-intl';
import { Layout, PageBlock, Button } from 'vtex.styleguide';
import SelectMain from "./Matcher/SelectMain";
import SelectOffers from "./Matcher/SelectOffers";

const Matcher: FC = () => {

  return (
    <Layout>
      <div>
        <h1><FormattedMessage id="products-list.navigation.label" /></h1>
        <p className="mt0">Manual de ayuda</p>
      </div>
      <SelectMain />
      <SelectOffers />
      <PageBlock>
        <div className="flex justify-end">
          <Button variation="tertiary">Cancelar</Button>
          <div className="ml2">
            <Button variation="primary" href="/admin/app/matcher-summary">Ver Resumen</Button>
          </div>
        </div>
      </PageBlock>
    </Layout >
  )
}

export default Matcher;