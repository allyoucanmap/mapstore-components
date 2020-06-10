import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

const Card = forwardRef(function Card({
    id,
    className,
    style,
    onClick,
    children,
    ...props
}, ref) {
    const customClassName = className ? ' ' + className : '';
    return (
        <div
            {...props}
            id={id}
            ref={ref}
            className={`card${customClassName}`}
            onClick={onClick}
            style={style}
            role="button"
            aria-pressed={false}
            tabIndex={0}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    onClick(event);
                }
            }}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

Card.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
};

Card.defaultProps = {
    onClick: () => {}
};

export default Card;
