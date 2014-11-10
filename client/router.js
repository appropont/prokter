Router.configure({
    //layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');
