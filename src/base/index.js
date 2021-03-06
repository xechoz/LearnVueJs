'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

const Start = {
    init() {
        console.log('base init');
        Vue.use(Vuex);
        Vue.use(VueRouter);
        Vue.use(VueResource);
    }
};

Start.init();

const Config = {
    isDebug: process.env.NODE_ENV == 'development',
    Default: {
        PAGE_SIZE: 50
    }
};

export {Config};