import React from 'react';
import PropTypes from 'prop-types';

function Label({
    className,
    style,
    children,
    htmlFor,
    ...props
}) {

    const customClassName = className ? ' ' + className : '';
    return (
        <label
            {...props}
            htmlFor={htmlFor}
            className={`label${customClassName}`}
            style={style}>
            {children}
        </label>
    );
}

Label.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    htmlFor: PropTypes.string
};

Label.defaultProps = {};

export default Label;