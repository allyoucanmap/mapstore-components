import React from 'react';
import PropTypes from 'prop-types';

function Input({
    className,
    style,
    onChange,
    ...props
}) {

    const customClassName = className ? ' ' + className : '';
    return (
        <div
            className={`input${customClassName}`}
            style={style}>
            <input
                {...props}
                onChange={(event) => onChange(event.target.value, event)}
            />
        </div>
    );
}

Input.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

Input.defaultProps = {};

export default Input;
