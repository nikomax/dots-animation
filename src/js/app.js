import Thing from './thing';
let svg = document.getElementById('svg');
let paths = svg.querySelectorAll('path');
let coords = [];
for (var z=0; z<paths.length;z++) {
  let path = paths[z].outerHTML.split('');
  let pathDel = path.splice(path.indexOf('M')+1);
  let coord = pathDel.splice(0, pathDel.indexOf(' ')).join('').split(',');
  coords.push(coord);
}


class Cloud {
  constructor() {
    // create canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = 500;
    this.height = 500;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);
    this.time = 0;
    this.dotsArray = coords;
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
    for (var i = 0; i < this.dotsArray.length; i++) {
      let x = +this.dotsArray[i][0]+100;
      let y = +this.dotsArray[i][1]+100;
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

let cloud = new Cloud();
