import {createPopper} from '@popperjs/core';

export function createPopperActions(initOptions) {
  let contentNode;
  let options = initOptions;
  let popperInstance = null;
  let referenceNode;

  const initPopper = () => {
    if (referenceNode && contentNode) {
      popperInstance = createPopper(referenceNode, contentNode, options);
    }
  };

  const deInitPopper = () => {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  };

  const referenceAction = (node) => {
    referenceNode = node;
    initPopper();
    return {
      destroy() {
        deInitPopper();
      },
    };
  };

  const contentAction = (node, contentOptions) => {
    contentNode = node;
    options = Object.assign(Object.assign({}, initOptions), contentOptions);
    initPopper();

    return {
      update(newContentOptions) {
        options = Object.assign(Object.assign({}, initOptions), newContentOptions);
        if (popperInstance && options) {
          popperInstance.setOptions(options);
        }
      },
      destroy() {
        deInitPopper();
      },
    };
  };

  return [referenceAction, contentAction, () => popperInstance];
}
