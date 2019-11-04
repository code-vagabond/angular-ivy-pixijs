import { Component, ElementRef, NgZone } from '@angular/core';
import { Application, Container, Texture, Sprite } from 'pixi.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public app: Application;
  public container: Container;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.app = new Application({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1
      });
      this.container = new Container();
    });
    this.elementRef.nativeElement.appendChild(this.app.view);
    this.app.stage.addChild(this.container);

    // Create a new texture
    const texture = Texture.from('/assets/img/bunny.png');

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
      const bunny = new Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.x = (i % 5) * 40;
      bunny.y = Math.floor(i / 5) * 40;
      this.container.addChild(bunny);
    }

    // Move container to the center
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;

    // Center bunny sprite in local container coordinates
    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;

    // Listen for animate update
    this.app.ticker.add(delta => {
      // rotate the container!
      // use delta to create frame-independent transform
      this.container.rotation -= 0.01 * delta;
    });
  }
}
