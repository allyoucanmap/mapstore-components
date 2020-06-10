import React from 'react';
import PropTypes from 'prop-types';

function Button({
    id,
    className,
    square,
    theme,
    size,
    active,
    disabled,
    children,
    ...props
}) {
    const customClassName = className ? ' ' + className : '';
    const squareClassName = square ? ' square' : '';
    const themeClassName = theme ? ' ' + theme : '';
    const sizeClassName = size ? ' ' + size : '';
    const activeClassName = active ? ' active' : '';
    const disabledClassName = disabled ? ' disabled' : '';
    const buttonClassName = 'button' +
        customClassName +
        squareClassName +
        themeClassName +
        sizeClassName +
        activeClassName +
        disabledClassName;
    return (
        <button
            { ...props }
            id={id}
            className={buttonClassName}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    square: PropTypes.bool,
    theme: PropTypes.string,
    size: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    square: false,
    theme: 'default',
    size: 'md',
    active: false,
    disabled: false
};

export default Button;
