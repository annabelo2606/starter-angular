# Change detection triggered by events

```typescript
  ngDoCheck(): void {
    console.log('%c Change detection triggered', 'color: red; font-weight: bold; font-size: 18px');
  }
```

# Bind noop to click

```html
<button (click)="noop()">NOOP</button>
```

# Bind with ViewChild

```typescript
  @ViewChild('button') button: ElementRef;

  ngAfterViewInit(): void {
    this.button.nativeElement.addEventListener( 'click', () => {} )
  }
```

# Bind with dom

```typescript
  document.querySelector('button').addEventListener('click', () => {})
```

# Bind outside of the zone

```typescript
  @ViewChild('buttonElement') buttonElement: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.buttonElement.nativeElement.addEventListener('click', () => {
      })
    })
  }
```

# The "Angular" way

```typescript
@Directive({
  selector: '[safeClick]'
})
export class SafeClickDirective implements OnInit {
  @Output()
  safeClick = new EventEmitter();

  constructor(private hostElement: ElementRef,
              private renderer: Renderer2,
              private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.listen(this.hostElement.nativeElement, 'click', () => {
        this.safeClick.emit();
      })
    })
  }
}

```

# If you don't need to update the view - dont run CD on this event

# Sometimes you are not aware

```typescript
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {
  private _element: HTMLElement;

  @Input('tooltip') contentToShow: string;
  
  constructor(hostElement: ElementRef) {
    this._element = hostElement.nativeElement
  }

  ngOnInit(): void {
    tippy(this._element, {content: this.contentToShow})
  }
}
```

```
items = new Array(800);
```

```html
      <ul>
          <li *ngFor="let item of items; index as i"
              tooltip="tip for {{ i }}">
              Item #{{i}}
          </li>
      </ul>
```

# Not all elements needs CD to work

```typescript
    this.ngZone.runOutsideAngular(() => {
      tippy(this._element, {content: this.contentToShow})
    })
```

# Summary:

## All events trigger CD
## CD runs to keep the view updated
## Events that don't directly update the view - can run outside
## 3rd party libraries that register events should run outside  
