import React from 'react';
import VerticalLayout from '../components/VerticalLayout';

export default {
    title: 'VerticalLayout',
    component: VerticalLayout,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const Sections = () => (
    <div style={{ position: 'relative', width: 720, height: 360 }}>
        <VerticalLayout
            header={<div style={{ backgroundColor: '#c9c8fb', width: '100%', height: 32, padding: 'var(--padding-md)' }}>Header</div>}
            footer={<div style={{ backgroundColor: '#ffdeaf', width: '100%', height: 32, padding: 'var(--padding-md)' }}>Footer</div>}
        >
        <div style={{ backgroundColor: '#e3fbc0', position: 'relative', width: '100%', height: '100%', padding: 'var(--padding-md)' }}>Body</div>
        </VerticalLayout>
    </div>
);

export const ScrollableBody = () => (
    <div style={{ position: 'relative', width: 720, height: 360 }}>
        <VerticalLayout
            header={<div style={{ backgroundColor: '#c9c8fb', width: '100%', height: 32, padding: 'var(--padding-md)' }}>Header</div>}
        >
        <div style={{ backgroundColor: '#e3fbc0', position: 'absolute', width: '100%', height: 800, padding: 'var(--padding-md)' }}>Body</div>
        </VerticalLayout>
    </div>
);
