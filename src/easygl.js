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

  translate_world(dx, dy) {
    this.ctx.translate(dx, dy);
  }

  translate_screen(dx, dy) {
    // I couldn't figure out an easy way to find the current scale.
    const [x, y] = this.screen_to_world(dx, dy);
    const [x0, y0] = this.screen_to_world(0, 0);
    this.ctx.translate(x - x0, y - y0);
  }

  zoom_in_to_screen(x, y) {
    [x, y] = this.screen_to_world(x, y);
    var mat = this.ctx.getTransform();
    this.ctx.setTransform(mat.scale(ZOOM_FACTOR, ZOOM_FACTOR, 1, x, y));
  }

  zoom_out_at_screen(x, y) {
    [x, y] = this.screen_to_world(x, y);
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
