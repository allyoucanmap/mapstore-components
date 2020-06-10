import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Glyph from './Glyph';

function Filter({
    id,
    className,
    style,
    value,
    placeholder,
    onChange
}) {
    const customClassName = className ? ' ' + className : '';
    return (
        <div
            id={id}
            className={`filter${customClassName}`}
            style={style}
        >
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event?.target?.value, event)}
                placeholder={placeholder}
            />
            {value
                ? <Button
                    square
                    size="md"
                    onClick={() => onChange('')}
                >
                    <Glyph name="1-close"/>
                </Button>
                : <Glyph name="filter"/>}
        </div>
    );
}

Filter.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

Filter.defaultProps = {
    value: '',
    onChange: () => {}
};

export default Filter;
