import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';

const Empty = () => <span/>;

const mapTypes = {
    openlayers: () => import('./map/openlayers/index')
};

function getMapComponents(mapType) {
    if (!mapTypes[mapType]) {
        return new Promise((resolve) => resolve(null));
    }
    return mapTypes[mapType]()
        .then((mod) => {
            const components = mod.default;
            const Map = components.Map;
            const Layer = components.Layer || Empty;
            const Feature = components.Feature || Empty;
            const tools = components.tools || {};
            return {
                Map,
                Layer,
                Feature,
                tools
            };
        });
}

function Map({
    id,
    style,
    type,
    layers,
    tools,
    center,
    zoom,
    bbox,
    projection,
    projectionDefs,
    securityToken,
    zoomControl,
    toolsOptions,
    layerEnv,
    onMapViewChanges,
    onLayerLoading,
    onLayerLoad,
    onLayerError
}) {

    const [components, setComponents] = useState({ });

    useEffect(() => {
        getMapComponents(type)
            .then((newComponents) => {
                if (newComponents) {
                    setComponents(newComponents);
                }
            });
    }, [ type ]);

    if (components.Map
    && components.Layer
    && components.Feature) {
        return (
            <div
                className="map"
                style={style}>
                <components.Map
                    id={id}
                    center={center}
                    zoom={zoom}
                    bbox={bbox}
                    projection={projection}
                    projectionDefs={projectionDefs}
                    zoomControl={zoomControl}
                    onMapViewChanges={onMapViewChanges}
                    onLayerLoading={onLayerLoading}
                    onLayerLoad={onLayerLoad}
                    onLayerError={onLayerError}
                >
                    {layers.map((layer, index) => {
                        return (
                            <components.Layer
                                key={layer.id || layer.name}
                                type={layer.type}
                                srs={projection}
                                position={index}
                                options={layer}
                                securityToken={securityToken}
                                env={layerEnv}
                            >
                                {layer.features && layer.type === 'vector'
                                    ? layer.features.map( (feature) => {
                                        return (
                                            <components.Feature
                                                key={feature.id}
                                                msId={feature.id}
                                                type={feature.type}
                                                crs={projection}
                                                geometry={feature.geometry}
                                                features={feature.features}
                                                featuresCrs={ layer.featuresCrs || 'EPSG:4326' }
                                                layerStyle={layer.style}
                                                style={ feature.style || layer.style || null }
                                                properties={feature.properties}/>
                                            );
                                        })
                                    : null}
                            </components.Layer>
                        )
                    })}
                    {tools.map((tool) => {
                        const Tool = isString(tool)
                            ? {
                                name: tool,
                                impl: components.tools[tool]
                            }
                            : tool[type] || tool
                        const toolOptions = toolsOptions[Tool.name]
                            ? toolsOptions[Tool.name][type]
                            : toolsOptions[Tool.name] || {};
                        return <Tool.impl key={Tool.name} { ...toolOptions }/>;
                    })}
                </components.Map>
            </div>
        );
    }

    return null;
}

Map.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
    layers: PropTypes.array,
    tools: PropTypes.array,
    zoom: PropTypes.number,
    bbox: PropTypes.object,
    center: PropTypes.object,
    projection: PropTypes.string,
    zoomControl: PropTypes.bool,
    onMapViewChanges: PropTypes.func,
    projectionDefs: PropTypes.array,
    securityToken: PropTypes.string,
    toolsOptions: PropTypes.object,
    layerEnv: PropTypes.array,
    onLayerLoading: PropTypes.func,
    onLayerLoad: PropTypes.func,
    onLayerError: PropTypes.func
};

Map.defaultProps = {
    id: 'map',
    type: 'openlayers',
    layers: [],
    tools: [],
    zoom: 4,
    center: { x: 0, y: 0 },
    zoomControl: false,
    onMapViewChanges: () => {},
    onLayerLoading: () => {},
    onLayerLoad: () => {},
    onLayerError: () => {}
};

export default Map;
