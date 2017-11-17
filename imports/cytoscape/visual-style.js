export const DEF_VISUAL_STYLE = [
    {
        selector: 'node',
        style: {
            'label' : 'data(label)',
            'text-valign': 'center',
            'text-outline-width': 2,
            'background-color': '#999',
            'text-outline-color': 'white',
            'width' : '50px',
            'height' : '50px'
        }
    },

    {
        selector: 'edge',
        style: {
            'width': 8,
            'line-color': '#ccc',
            'curve-style': 'bezier',
            'target-arrow-color': 'orange',
            'target-arrow-shape': 'triangle'
        }
    },

    {
        selector: 'edge[group="domain"]',
        style: {
            'target-arrow-color': 'blue',
        }
    },

    {
        selector: 'edge[group="range"]',
        style: {
            'target-arrow-color': 'red',
        }
    }


];