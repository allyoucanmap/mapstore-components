import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import uuidv4 from 'uuid/v4';

function withTooltip(Component) {
    function WithTooltip({
        tooltip,
        tooltipPlace,
        tooltipContainerNode,
        ...props
    }) {

        if (!tooltip) {
            return <Component {...props} />;
        }

        const id = uuidv4();

        return (
            <>
                <Component
                    {...props}
                    data-tip=''
                    data-for={id}
                />
                {createPortal(
                    <ReactTooltip
                        id={id}
                        type="dark"
                        effect="solid"
                        place={tooltipPlace}
                        className="tooltip"
                    >
                        {tooltip}
                    </ReactTooltip>,
                    tooltipContainerNode
                )}
                
            </>
        );
    }

    WithTooltip.propTypes = {
        tooltip: PropTypes.string,
        tooltipPlace: PropTypes.string,
        tooltipContainerNode: PropTypes.object
    };

    WithTooltip.defaultProps = {
        tooltipPlace: 'top',
        tooltipContainerNode: document.body
    };

    return WithTooltip;
}

export default withTooltip
