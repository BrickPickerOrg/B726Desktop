/** @format */

import Loading from '@/components/loading.vue';
import { h, defineComponent } from 'vue';

const insertDom = (parent: HTMLElement, el: any) => {
  // parent.appendChild(el);
  // el.instance.visible = true;
};

const toggleLoading = (el: HTMLElement, mask: any, binding: any) => {
  if (binding.value) {
    insertDom(el, mask);
  } else {
    // el.instance.visible = false;
  }
};

export const LoadingDirective = {
  beforeMount(el: HTMLElement, binding: any) {
    const mask = h(Loading, document.createElement('div'));
    console.log(mask);
    binding.value && toggleLoading(el, mask, binding);
  },
  updated(el: HTMLElement, binding: any) {
    // if (binding.oldValue !== binding.value) toggleLoading(el, binding);
  }
};
