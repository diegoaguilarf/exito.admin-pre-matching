import React from "react"
import { Button } from "vtex.styleguide";
import { FormattedMessage } from 'react-intl';

const Actions = (props) => {
    return (<div className="flex justify-end">
        <Button variation="tertiary" href="/admin/app/matcher"><FormattedMessage id="matcher.summary.back-action" /></Button>
        <div className="ml2">
        <Button variation="primary" onClick={props.onClick}><FormattedMessage id="matcher.summary.join-action" /></Button>
        </div>
    </div>)
}

export default Actions;