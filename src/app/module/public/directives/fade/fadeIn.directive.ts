import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[vpFadeIn]'
})
export class FadeInDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.getBoundingClientRect().top;
    const scrollPosition = window.innerHeight;

    if (componentPosition < scrollPosition) {
      this.renderer.addClass(this.el.nativeElement, 'fade-in');
    }
  }

}
