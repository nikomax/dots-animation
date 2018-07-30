import Thing from './thing';

let images = [...document.querySelectorAll('.js-canvas')];

class Cloud {
  constructor(selector) {
    // create canvas
    this.container = selector;
    this.svg = selector.querySelector('svg');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.paths = this.svg.querySelectorAll('circle');
    this.dotSize = this.container.dataset.dotSize;
    this.color = this.container.dataset.dotColor;
    if (this.container.dataset.size === 'large' ) {
      this.width = 200;
      this.height = 200;
    } else {
      this.width = 150;
      this.height = 150;
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.container.appendChild(this.canvas);
    this.time = 0;
    this.dotsArray = [];
    this.ctx.strokeStyle = 'rgba(2,255,255,1)';
    this.particles = [];
    this.mouseX = -100;
    this.mouseY = -100;
    this.createparticles();
    this.update();
    this.bindmouse();
  }

  createparticles() {
    let self = this;
    for (let z=0; z<self.paths.length;z++) {
      let path = self.paths[z].outerHTML.split(' ');
      let cx = path[2].split('');
      let cy = path[3].split('');
      cx.splice(-1, 1);
      cx.splice(0, 4);
      cy.splice(-1, 1);
      cy.splice(0, 4);
      let coord = [];
      if (this.container.dataset.size === 'large' ) {
        coord = [(this.width/2 - parseInt(this.svg.getAttribute('width')) / 2*1.5 + +cx.join('')*1.5), (this.height/2 - parseInt(this.svg.getAttribute('height')) / 2*1.5 + +cy.join('')*1.5)];
      } else {
        coord = [(this.width/2 - parseInt(this.svg.getAttribute('width')) / 2 + +cx.join('')), (this.height/2 - parseInt(this.svg.getAttribute('height')) / 2 + +cy.join(''))];
      }
      self.dotsArray.push(coord);
    }
    for (let i = 0; i < this.dotsArray.length; i++) {
      let x = +this.dotsArray[i][0];
      let y = +this.dotsArray[i][1];
      this.particles.push(
        new Thing(self.ctx,x,y,self.dotSize,self.color)
      );
    }
  }

  update() {
    let self = this;
    this.time++;
    this.ctx.clearRect(0,0,this.width,this.height);
    this.particles.forEach((p) => {
      p.calculateForces(self.mouseX,self.mouseY);
      p.update(self.time);
      p.draw();
    });
    window.requestAnimationFrame(this.update.bind(this));
  }

  bindmouse() {
    let self = this;
    console.log('dsfsds' + this.container.scrollTop);
    let canvasTop = this.canvas.scrollTop;
    this.canvas.addEventListener('mousemove',function(e) {
      console.log(e.offsetX, e.offsetY);
      self.mouseX = e.offsetX;
      self.mouseY = e.offsetY;
    });
  }
};

for(let x = 0; x < images.length; x++) {
  new Cloud(images[x]);
}
