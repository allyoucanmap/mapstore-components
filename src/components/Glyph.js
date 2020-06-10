import React from 'react';
import PropTypes from 'prop-types';

function Glyph({
    id,
    className,
    style,
    name,
    square,
    size,
    ...props
}) {
    const nameClassName = name ? ' glyph-' + name : '';
    const customClassName = className ? ' ' + className : '';
    const squareClassName = square ? ' square' : '';
    const sizeClassName = size ? ' ' + size : '';
    return (
        <span
            { ...props }
            id={id}
            className={`glyph${nameClassName}${customClassName}${squareClassName}${sizeClassName}`}
            style={style}
        >
        </span>
    );
}

Glyph.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    square: PropTypes.bool,
    size: PropTypes.string
};

Glyph.defaultProps = {};

export default Glyph;
