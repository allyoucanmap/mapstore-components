import React from 'react';
import Loader from '../components/Loader';

export default {
    title: 'Loader',
    component: Loader,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const Base = () => {
    return (
        <>
        <Loader/>
        <Loader style={{ fontSize: 64 }}/>
        <div style={{ fontSize: 128}}>
            <Loader/>
        </div>
        </>
    );
};
