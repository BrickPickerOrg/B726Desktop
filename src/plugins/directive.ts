import Loading from '@/components/loading/loading.vue';
import { h, defineComponent } from 'vue';

const insertDom = (parent: HTMLElement, el: any) => {
  parent.appendChild(el);
  el.visible = true;
};

const toggleLoading = (el: HTMLElement, mask: any, binding: any) => {
  if (binding.value) {
    insertDom(el, mask.props);
  } else {
    mask.visible = false;
  }
};

export const LoadingDirective = {
  beforeMount(el: HTMLElement, binding: any) {
    const mask = h(Loading, document.createElement('div'));
    binding.value && toggleLoading(el, mask, binding);
  },
  updated(el: HTMLElement, binding: any) {
    const mask = h(Loading, document.createElement('div'));
    if (binding.oldValue !== binding.value) toggleLoading(el, mask, binding);
  }
};

export const Occupy = {
  beforeMount(el: HTMLElement, binding: any) {
    const allNodes = el.getElementsByTagName('*');
    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      const occupy = node.getAttribute('data-occupy')
      if (occupy === 'occupy') {
        node.setAttribute('data-occupy-show', 'show')
      } else {
        node.setAttribute('data-occupy-show', 'hide')
      }
    }
  },

  updated(el: HTMLElement, binding: any) {
    const allNodes = el.getElementsByTagName('*');
    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      const occupy = node.getAttribute('data-occupy')
      if (occupy === 'occupy' && binding.value) {
        node.setAttribute('data-occupy-show', 'show')
      } else {
        node.setAttribute('data-occupy-show', 'hide')
      }
    }
  }
};
