import React from 'react';
import PropTypes from 'prop-types';

function VerticalLayout({
    id,
    className,
    style,
    header,
    footer,
    children
}) {
    return (
        <div
            id={id}
            className={`vertical-layout${className ? ` ${className}` : ''}`}
            style={style}
            >
            {header}
            <div className="vertical-layout-body">
                {children}
            </div>
            {footer}
        </div>
    );
}

VerticalLayout.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    header: PropTypes.node,
    footer: PropTypes.node
};

VerticalLayout.defaultProps = {
    style: {}
};

export default VerticalLayout;
