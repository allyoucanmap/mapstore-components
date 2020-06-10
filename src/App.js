import React, { useReducer, useState } from 'react';

import BorderLayout from './components/BorderLayout';
import Map from './components/Map';
import LayersTree from './components/LayersTree';
import Toolbar from './components/Toolbar';
import Button from './components/Button';
import Glyph from './components/Glyph';
import LayerSettings from './components/LayerSettings';
import {
    changeGroupProperties,
    updateNode,
    selectNode,
    layerLoading,
    layerLoad,
    layerError
} from './MapStore2/web/client/actions/layers';
import {
    changeMapView,
    changeZoomLevel
} from './MapStore2/web/client/actions/map';
import layersReducer from './MapStore2/web/client/reducers/layers';
import mapReducer from './MapStore2/web/client/reducers/map';
import { denormalizeGroups, splitMapAndLayers } from './MapStore2/web/client/utils/LayersUtils';
import geoJSON from './data/countries.geo.json';

import './App.css';
import './scss/theme.scss';

const normalizedMap = splitMapAndLayers({
    projection: 'EPSG:900913',
    units: 'm',
    center: {
        x: 0,
        y: 15,
        crs: 'EPSG:4326'
    },
    zoom: 3,
    maxExtent: [
        -20037508.34, -20037508.34,
        20037508.34, 20037508.34
    ],
    layers: [
        {
            id: 'countries',
            type: 'vector',
            title: 'Countries',
            visibility: true,
            features: [...geoJSON.features]
        },
        {
            id: 'states',
            name: 'topp:states',
            title: 'States',
            type: 'wms',
            visibility: true,
            url: 'http://localhost:8080/geoserver/ows'
        }
    ]
});

function getNodes(layers) {
    return layers?.flat && layers?.groups
        ? denormalizeGroups(layers.flat, layers.groups).groups
        : [];
}

function App() {

    const [layers, dispatchLayers] = useReducer(layersReducer, { ...normalizedMap?.layers }); // mapReducer
    const [map, dispatchMap] = useReducer(mapReducer, { zoom: normalizedMap.zoom, center: normalizedMap.center });
    const nodes = getNodes(layers);

    const [settings, setSetting] = useState(null);

    return (
        <>
            <BorderLayout
                columns={
                    <>
                        <Map
                            type="openlayers"
                            center={map.center}
                            zoom={map.zoom}
                            bbox={map.bbox}
                            layers={layers?.flat || []}
                            onLayerLoading={(...args) => {
                                dispatchLayers(layerLoading(...args));
                            }}
                            onLayerLoad={(...args) => {
                                dispatchLayers(layerLoad(...args));
                            }}
                            onLayerError={(...args) => {
                                dispatchLayers(layerError(...args));
                            }}
                            onMapViewChanges={(...args) => {
                                dispatchMap(changeMapView(...args));
                            }}
                            style={{
                                position: 'absolute'
                            }}
                        />
                        <div style={{ minWidth: 300, order: -1 }}>
                            <LayersTree
                                nodes={nodes}
                                buttons={[]}
                                nodeButtons={[
                                    {
                                        Component: ({ nodeType, node, ...props }) => {
                                            if (nodeType === 'group') {
                                                return null;
                                            }
                                            return (
                                                <Button
                                                    {...props}
                                                    active={node.id === settings?.id}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setSetting(node.id === settings?.id
                                                            ? null
                                                            : node);
                                                    }}
                                                >
                                                    <Glyph name="wrench" />
                                                </Button>
                                            );
                                        }
                                    }
                                ]}
                                setSelectedNode={node => (layers?.selected || []).indexOf(node?.id) !== -1}
                                onSelect={(node, nodeType, ctrlKey) => {
                                    dispatchLayers(selectNode(node?.id, nodeType, ctrlKey));
                                }}
                                onChange={(nodeId, nodeType, properties) => {
                                    if (nodeType === 'group' && properties.visibility !== undefined) {
                                        return dispatchLayers(changeGroupProperties(nodeId, properties));
                                    }
                                    return dispatchLayers(updateNode(nodeId, nodeType, properties));
                                }}
                            />
                        </div>
                        {settings && <div style={{ minWidth: 300, order: -1, borderLeft: '1px solid var(--border-color)' }}>
                            <LayerSettings
                                key={settings.id}
                                settings={settings}
                                onChange={(newOption) => {
                                    console.log(newOption);
                                }}
                            />
                        </div>}

                    </>
                }>
                <Toolbar
                    vertical
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        margin: 'var(--padding-md)',
                        zIndex: 1
                    }}
                    buttonProps={{
                        square: true,
                        size: 'lg',
                        theme: 'primary',
                        tooltipPlace: 'left'
                    }}
                    buttons={[
                        {
                            glyph: 'plus',
                            tooltip: 'Zoom in',
                            onClick: () => dispatchMap(changeZoomLevel(map.zoom + 1))
                        },
                        {
                            glyph: 'minus',
                            tooltip: 'Zoom out',
                            onClick: () => dispatchMap(changeZoomLevel(map.zoom - 1))
                        }
                    ]}
                />
            </BorderLayout>
        </>
    );
}

export default App;
