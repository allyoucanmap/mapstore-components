import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Glyph from './Glyph';
import Loader from './Loader';

import withTooltip from '../hoc/withTooltip';

const ButtonTooltip = withTooltip(Button);

function Toolbar({
    id,
    className,
    style,
    buttons,
    vertical,
    buttonProps
}) {
    const customClassName = className ? ' ' + className : '';
    const verticalClassName = vertical ? ' vertical' : '';

    const filteredButtons = buttons
        .filter(({ visible }) => visible || visible === undefined);

    if (filteredButtons?.length === 0) {
        return null;
    }

    return (
        <div
            id={id}
            className={`toolbar${customClassName}${verticalClassName}`}
            style={style}
        >
            {filteredButtons.map(({ Component, ...props}, idx) => {
                    const id = props?.id || idx;
                    if (Component) {
                        return <Component { ...buttonProps } { ...props } key={id} />;
                    }const { text, glyph, loading, visible, ...button } = props;
                    return (
                        <ButtonTooltip
                            { ...buttonProps }
                            { ...button }
                            key={id}
                        >
                            {loading && <Loader key={id} />}
                            {!loading && glyph && <Glyph name={glyph}/>}
                            {!loading && text}
                        </ButtonTooltip>
                    );
                })}
        </div>
    );
}

Toolbar.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    buttons: PropTypes.array,
    vertical: PropTypes.bool,
    buttonProps: PropTypes.object
};

Toolbar.defaultProps = {
    buttons: [],
    vertical: false,
    buttonProps: {}
};

export default Toolbar;
