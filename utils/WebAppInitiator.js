import startReactApp from '../index';

/**
 * @class AppInitiator
 * @desc This module responsible for loading resources
 */

class WebAppInitiator {
  constructor(resources) {
    this.resources = resources;
    this.audioSupported = true;
    const { images } = this.resources;
    this.totalFiles = images.length;
    this.count = 0;
    this.preloadedFiles = [];
  }

  init() {
    startReactApp();
  }

  compatible() {}
}

export default WebAppInitiator;
