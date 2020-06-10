import React, { useState } from 'react';
import LayerSettings from '../components/LayerSettings';

export default {
    title: 'LayerSettings',
    component: LayerSettings,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const WMS = () => {
    const [settings, setSettings] = useState({
        id: 'states',
        name: 'topp:states',
        title: 'States',
        type: 'wms',
        visibility: true,
        url: 'http://localhost:8080/geoserver/ows'
    });
    return (
        <div style={{ width: 300 }}>
            <LayerSettings
                settings={settings}
                onChange={setSettings}
            />
        </div>
    );
};

export const Vector = () => {
    const [settings, setSettings] = useState({
        id: 'countries',
        type: 'vector',
        title: 'Countries',
        visibility: true,
        features: []
    });
    return (
        <div style={{ width: 300 }}>
            <LayerSettings
                settings={settings}
                onChange={setSettings}
            />
        </div>
    );
};
