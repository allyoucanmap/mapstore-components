import React from 'react';
import PropTypes from 'prop-types';

function BorderLayout({
    id,
    className,
    style,
    header,
    footer,
    columns,
    children
}) {
    const customClassName = className ? ' ' + className : '';
    return (
        <div
            id={id}
            className={`border-layout${customClassName}`}
            style={style}
        >
            {header}
            <div className="border-layout-body" >
                <div className="border-layout-content" >
                    {children}
                </div>
                {columns}
            </div>
            {footer}
        </div>
    );
}

BorderLayout.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    header: PropTypes.node,
    footer: PropTypes.node,
    columns: PropTypes.node
};

BorderLayout.defaultProps = {
    style: {}
};

export default BorderLayout;