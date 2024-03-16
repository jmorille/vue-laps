import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';



import HelloWorld from '../../vuejs/components/HelloWorld.vue';


import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { i18n} from '../../vuejs/plugins/vueI18n';

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')


test('displays message', () => {
  const wrapper = mount({
    template: '<v-layout><HelloWorld /></v-layout>'
  }, {
    props: {},
    global: {
      components: {
        HelloWorld,
      },
      plugins: [vuetify, i18n],
    }
  })

  // Assert the rendered text of the component
  // Doc https://v1.test-utils.vuejs.org/api/wrapper/#trigger
  expect(wrapper.find('h1').exists()).toBe(true);
  expect(wrapper.find('img').exists()).toBe(true);
  expect(wrapper.text()).toContain('Welcome to');
  expect(wrapper.text()).toContain('LAPS');
})