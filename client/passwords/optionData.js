iconOptions = [
    'mdi-action-account-balance',
    'mdi-action-android',
    'mdi-action-grade',
    'mdi-action-lock',
    'mdi-action-shopping-cart',
    'mdi-av-videocam',
    'mdi-av-my-library-music',
    'mdi-av-radio',
    'mdi-communication-chat',
    'mdi-communication-vpn-key',
    'mdi-communication-call',
    'mdi-content-mail',
    'mdi-device-bluetooth',
    'mdi-device-network-wifi',
    'mdi-editor-attach-money',
    'mdi-editor-insert-photo',
    'mdi-file-cloud',
    'mdi-social-school',
    'mdi-social-location-city',
    'mdi-maps-local-cafe',
    'mdi-communication-business',
    'mdi-action-home'
];

Template.registerHelper('iconOptions', function() {
    return iconOptions;
});

iconColorOptions = [
    {
        label: 'Red',
        value: 'icon-material-red'
    },
    {
        label: 'Pink',
        value: 'icon-material-pink'
    },
    {
        label: 'Purple',
        value: 'icon-material-purple'
    },
    {
        label: 'Deep Purple',
        value: 'icon-material-deeppurple'
    },
    {
        label: 'Indigo',
        value: 'icon-material-indigo'
    },
    {
        label: 'Light Blue',
        value: 'icon-material-lightblue'
    },
    {
        label: 'Cyan',
        value: 'icon-material-cyan'
    },
    {
        label: 'Teal',
        value: 'icon-material-teal'
    },
    {
        label: 'Light Green',
        value: 'icon-material-lightgreen'
    },
    {
        label: 'Lime',
        value: 'icon-material-lime'
    },
    {
        label: 'Light Yellow',
        value: 'icon-material-lightyellow'
    },
    {
        label: 'Orange',
        value: 'icon-material-orange'
    },
    {
        label: 'Deep Orange',
        value: 'icon-material-deeporange'
    },
    {
        label: 'Grey',
        value: 'icon-material-grey'
    },
    {
        label: 'Blue-Grey',
        value: 'icon-material-bluegrey'
    },
    {
        label: 'Brown',
        value: 'icon-material-brown'
    },
    {
        label: 'Light Grey',
        value: 'icon-material-lightgrey'
    }
];

Template.registerHelper('iconColorOptions', function() {
    return iconColorOptions;
});
