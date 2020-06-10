import React from 'react';
import LayersTree from '../components/LayersTree';

export default {
    title: 'LayersTree',
    component: LayersTree,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const Nodes = () => {
    return (
        <div style={{ width: 300, height: 200 }}>
            <LayersTree
                nodes={[{
                    id: 'Default',
                    title: 'Default',
                    name: 'Default',
                    nodes: [
                        {
                            id: 'states',
                            name: 'topp:states',
                            title: 'States',
                            type: 'wms',
                            visibility: true,
                            url: 'http://localhost:8080/geoserver/ows',
                            expanded: false
                        },
                        {
                            id: 'countries',
                            type: 'vector',
                            title: 'Countries',
                            visibility: true,
                            features: [],
                            expanded: false
                        }
                    ],
                    expanded: true,
                    visibility: true
                }]}
            />
        </div>
    );
};
