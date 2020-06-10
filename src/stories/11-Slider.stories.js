import React, { useState } from 'react';
import Slider from '../components/Slider';

export default {
    title: 'Slider',
    component: Slider,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const Base = () => {
    const [value, setValue] = useState(1);
    return (
        <div style={{ width: 300, paddingTop: 'var(--padding-lg)' }}>
            <Slider
                min={0}
                max={1}
                step={1 / 100}
                showTooltip
                formatTooltip={value => `${Math.floor(value * 100)}%`}
                defaultValue={value}
                onAfterChange={(newValue) => {
                    setValue(newValue);
                }}
            />
        </div>
    );
};
