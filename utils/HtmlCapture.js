import html2canvas from 'html2canvas';
import scaleCanvas from '~/utils/scaleCanvas';

class HtmlCapture {
  constructor(element, width, height) {
    this.element = element || document.getElementById('app');
    this.canvas = null;
    this.config = {
      backgroundColor: null,
      allowTaint: true,
      useCORS: true,
      foreignObjectRendering: true,
      logging: true
    };
    this.init().updateConfig();
  }

  setElement(element) {
    this.element = element;
  }

  init() {
    let canvas = document.createElement('canvas');
    canvas.width = this.config.width;
    canvas.height = this.config.height;
    canvas.style.width = `${this.config.width}px`;
    canvas.style.height = `${this.config.height}px`;

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    scaleCanvas(this.canvas, this.context, this.config.width, this.config.height);

    return this;
  }

  updateConfig() {
    this.config = { ...this.config, canvas: this.canvas };
    return this;
  }

  getCanvas() {
    
    return new Promise((resolve, reject) => {
      const element = document.getElementById('custom-share__composer-result');
      html2canvas(element, {
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
        width: element.clientWidth,
        height: element.clientHeight,
        logging: true
      })
        .then(canvas => {
          const image = canvas.toDataURL('image/png', 1.0);
          resolve(image);
        })
        .catch(e => reject(e));
    });
  }

  getCapture() {
    return this.getCanvas();
  }
}

export default HtmlCapture;
