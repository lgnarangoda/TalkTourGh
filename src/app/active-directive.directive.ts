import {asNativeElements, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appActiveDirective]'
})
export class ActiveDirectiveDirective {

  private _isActive = false;
  private ep;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    e.preventDefault();
    this._isActive = !this._isActive;

    if (this._isActive) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.ep, 'active');
    }

    this.ep = this.el.nativeElement;
  }
}
