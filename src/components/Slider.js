import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import RCSlider, { Handle } from 'rc-slider';

function Slider({
    id,
    className,
    style,
    showTooltip,
    formatTooltip,
    ...props
}) {
    const containerRef = useRef(null);
    const handleRef = useRef(null);
    const tooltipRef = useRef(null);
    const customClassName = className ? ' ' + className : '';

    function getTooltipStyle() {
        const containerBoundingClientRect = containerRef?.current?.getBoundingClientRect?.();
        const handleBoundingClientRect = handleRef?.current?.handle?.getBoundingClientRect?.();
        const { width: tooltipWidth = 40 } = tooltipRef?.current?.getBoundingClientRect?.() || {};
        if (!handleBoundingClientRect || !containerBoundingClientRect) {
            return { };
        }
        if (handleBoundingClientRect.left < containerBoundingClientRect.left + tooltipWidth / 2) {
            return { transform: 'translate(0%, calc(-100% - 4px))' };
        }
        if (handleBoundingClientRect.right > containerBoundingClientRect.right - tooltipWidth / 2) {
            return { transform: 'translate(-100%, calc(-100% - 4px))' };
        }
        return { transform: 'translate(-50%, calc(-100% - 4px))' };
    }

    return (
        <div
            id={id}
            className={`slider${customClassName}`}
            style={style}
            ref={containerRef}>
            <RCSlider
                handle={({
                    value,
                    dragging,
                    index,
                    ...handleProps
                }) => {
                    return (
                        <Handle
                            { ...handleProps }
                            key={index}
                            ref={handleRef}
                        >
                            {showTooltip && dragging && <div
                                className="slider-tooltip"
                                ref={tooltipRef}
                                style={getTooltipStyle()}
                            >
                                {formatTooltip(value)}
                            </div>}
                        </Handle>
                    );
                }}
                {...props}
            />
        </div>
    );
}

Slider.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    showTooltip: PropTypes.bool,
    formatTooltip: PropTypes.func
};

Slider.defaultProps = {
    showTooltip: false,
    formatTooltip: value => value
};

export default Slider;
