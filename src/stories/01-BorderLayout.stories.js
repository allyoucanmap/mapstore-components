import React from 'react';
import BorderLayout from '../components/BorderLayout';

export default {
    title: 'BorderLayout',
    component: BorderLayout,
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
        <BorderLayout
            header={<div style={{ backgroundColor: '#c9c8fb', width: '100%', height: 32, padding: 'var(--padding-md)' }}>Header</div>}
            columns={<>
                <div style={{ order: -1, backgroundColor: '#fbc9fe', width: 128, height: '100%', padding: 'var(--padding-md)'}}>Left</div>
                <div style={{ backgroundColor: '#b1e6ef', width: 128, height: '100%', padding: 'var(--padding-md)' }}>Right</div>
            </>}
            footer={<div style={{ backgroundColor: '#ffdeaf', width: '100%', height: 32, padding: 'var(--padding-md)' }}>Footer</div>}
        >
        <div style={{ backgroundColor: '#e3fbc0', position: 'relative', width: '100%', height: '100%', padding: 'var(--padding-md)' }}>Body</div>
        </BorderLayout>
    </div>
);

export const ScrollableBody = () => (
    <div style={{ position: 'relative', width: 720, height: 360 }}>
        <BorderLayout
            header={<div style={{ backgroundColor: '#c9c8fb', width: '100%', height: 32, padding: 'var(--padding-md)' }}>Header</div>}
            columns={<>
                <div style={{ order: -1, backgroundColor: '#fbc9fe', width: 128, height: '100%', padding: 'var(--padding-md)' }}>Left</div>
            </>}
        >
        <div style={{ backgroundColor: '#e3fbc0', position: 'absolute', width: '100%', height: 800, padding: 'var(--padding-md)' }}>Body</div>
        </BorderLayout>
    </div>
);
