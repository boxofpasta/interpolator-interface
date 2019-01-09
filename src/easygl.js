const ZOOM_FACTOR = 1.1;

export default class EasyGL {
  constructor(ctx) {
    this.ctx = ctx;
  }

  reset(ctx) {
    this.ctx = ctx;
  }

  screen_to_world(screenx, screeny) {
    var mat = this.ctx.getTransform();
    mat.invertSelf();
    const x = screenx * mat.a + screeny * mat.c + mat.e;
    const y = screenx * mat.b + screeny * mat.d + mat.f;
    return [x, y];
  }

  translate(dx, dy) {
    this.ctx.translate(dx, dy);
  }

  zoom_in_to(x, y) {
    console.log("Zooming to: ", x, y);
    var mat = this.ctx.getTransform();
    this.ctx.setTransform(mat.scale(ZOOM_FACTOR, ZOOM_FACTOR, 1, x, y));
  }

  zoom_out_at(x, y) {
    console.log("Zooming out: ", x, y);
    var mat = this.ctx.getTransform();
    this.ctx.setTransform(mat.scale(1/ZOOM_FACTOR, 1/ZOOM_FACTOR, 1, x, y));
  }

  drawline(startx, starty, endx, endy) {
    this.ctx.beginPath();
    this.ctx.moveTo(startx, starty);
    this.ctx.lineTo(endx, endy);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  fillcircle(centerx, centery, radius) {
    this.ctx.beginPath();
    this.ctx.arc(centerx, centery, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawcircle(centerx, centery, radius) {
    this.ctx.beginPath();
    this.ctx.arc(centerx, centery, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}