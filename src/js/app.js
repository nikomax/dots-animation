import Thing from './thing';

// let svg = document.getElementById('svg');



let images = [...document.querySelectorAll('.js-canvas')];

class Cloud {
  constructor(selector) {
    // create canvas
    this.container = selector;
    this.svg = selector.querySelector('svg');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.paths = this.svg.querySelectorAll('circle');
    this.width = 200;
    this.height = 200;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.container.appendChild(this.canvas);
    this.time = 0;
    this.dotsArray = [];
    this.ctx.strokeStyle = 'rgba(2,255,255,1)';
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
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
      let coord = [cx.join('')*2, cy.join('')*2];
      self.dotsArray.push(coord);
    }
    for (let i = 0; i < this.dotsArray.length; i++) {
      let x = +this.dotsArray[i][0];
      let y = +this.dotsArray[i][1];
      this.particles.push(
        new Thing(self.ctx,x,y)
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
    this.canvas.addEventListener('mousemove',function(e) {
      console.log(e.clientX,e.clientY);
      self.mouseX = e.clientX;
      self.mouseY = e.clientY;
    });
  }
};

// let cloud = new Cloud();

for(let x = 0; x < images.length; x++) {
  new Cloud(images[x]);
}
