import React from 'react';
import PropTypes from 'prop-types';

function Loader({
    id,
    className,
    style,
    ...props
}) {
    const customClassName = className ? ' ' + className : '';
    return (
        <div
            { ...props }
            id={id}
            className={`loader${customClassName}`}
            style={style}
        >
            <div />
        </div>
    );
}

Loader.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

Loader.defaultProps = {};

export default Loader;
