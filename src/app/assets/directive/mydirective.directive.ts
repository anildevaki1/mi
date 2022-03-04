import { HostListener, ElementRef, Input, Output, EventEmitter, Directive, OnInit, Inject, LOCALE_ID, Renderer2 } from '@angular/core';

import {
  CurrencyPipe, DecimalPipe, formatDate,

  TitleCasePipe,
  UpperCasePipe,
  PercentPipe,
  formatNumber
} from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MyProvider } from '../../assets/services/provider';
import { Sort } from '../sort';

@Directive({
  selector: '[nospecialChar]'
})
export class InputRestrictionDirective {
  inputElement: ElementRef;

  indRegex = '[\u0600-\u06FF]';

  constructor(public el: ElementRef) {
    this.inputElement = el;
  }

  @HostListener('keypress', ['$event']) onInput(value: string) {
    this.noSpecialChars(event);
  }

  noSpecialChars(event) {

    const e = <KeyboardEvent>event;

    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;

    k = event.keyCode;  // k = event.charCode;  (Both can be used)

    if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {
      return;
    }

    const ch = String.fromCharCode(e.keyCode);

    const regEx = new RegExp(this.indRegex);

    if (regEx.test(ch)) {
      return;
    }

    e.preventDefault();
  }
}

@Directive({ selector: '[combiOnly]' })
export class combiOnlyDirective {
  inputElement: ElementRef;

  indRegex = '[\u0600-\u06FF]';

  constructor(public el: ElementRef, public uppercase: UpperCasePipe) {
    this.inputElement = el;

  }

  @HostListener('keypress', ['$event']) onInput(value: any) {

    // this.el.nativeElement.value= this.capitalize.transform(this.el.nativeElement.value)

    this.combiChars(value);
  }

  combiChars(event) {

    const e = <KeyboardEvent>event;

    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;

    k = event.keyCode;  // k = event.charCode;  (Both can be used)

    if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {

      return;

    }

    const ch = String.fromCharCode(e.keyCode);

    const regEx = new RegExp(this.indRegex);

    if (regEx.test(ch)) {

      return;
    }

    e.preventDefault();
  }
}

@Directive({ selector: '[dateformat]' })
export class dateformatDirective {

  constructor(public el: ElementRef) {

  }


}


@Directive({ selector: '[minmaxvalidater]' })
export class minmaxDirective {
  mindate: Date;


  constructor(public el: ElementRef, public provider: MyProvider) { }
  @HostListener('focusout', ['$event']) onLoad(value) {
    this.mindate = this.el.nativeElement.value;

    var sdt = this.el.nativeElement.min;
    var edt = this.el.nativeElement.max;

    if (this.mindate >= sdt && this.mindate <= edt) {

      this.el.nativeElement.classList.remove('is-invalid');
      this.el.nativeElement.classList.remove('ng-invalid');

      this.el.nativeElement.classList.add('is-valid');
      this.el.nativeElement.classList.add('ng-valid');

    } else {
      this.el.nativeElement.classList.remove('is-valid');
      this.el.nativeElement.classList.remove('ng-valid');

      this.el.nativeElement.classList.add('is-invalid');
      this.el.nativeElement.classList.add('ng-invalid');
    }
  }
}

//intigerOnly
@Directive({ selector: '[intigerOnly]' })
export class intigerOnlyDirective {
  arabicRegex = '[\u0600-\u06FF]';

  constructor(public el: ElementRef) {

  }

  @Input('intigerOnlyInput') intigerOnlyInput: string;

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if (this.intigerOnlyInput === 'integer') {
      this.integerOnly(event);
    }
  }

  integerOnly(event) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true)) {
      // let it happen, don't do anything
      return;
    }
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }
}

@Directive({ selector: '[dataFraction]' })
export class decimalDirective {
  @Input() fraction: number;

  constructor(private el: ElementRef, public decimalpipe: DecimalPipe, @Inject(LOCALE_ID) private locale: string) { }

  @HostListener('focus', ['$event']) focus(event: any) {
    event.srcElement.value = event.srcElement.value.toString().replace(0, "");
  }


  @HostListener('focusout', ['$event']) focusOut(event: any) {

    var k = event.srcElement.value.toString().replace(/,/g, "");

    var b = formatNumber(event.srcElement.value, this.locale, '0.' + this.fraction + '-' + this.fraction);

    event.target.value = b.replace(/,/g, '');

    if (event.srcElement.value == 'NaN') {
      event.srcElement.value = '';
    }
  }


}


@Directive({ selector: '[numdot]' })
export class SpecialwithnumDirective {

  constructor() { }

  @HostListener('focus', ['$event']) focus(event: any) {
    event.srcElement.value = event.srcElement.value.toString().replace(0, "");
  }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const pattern = /^[0-9]*\.?[0-9]*$/;
    return new RegExp(pattern).test(event.key);
  }

}


@Directive({ selector: '[currency]' })
export class currencyDirective implements OnInit {

  constructor(private el: ElementRef, public decimalpipe: DecimalPipe) { }


  ngOnInit(): void {

  }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const pattern = /^[0-9]*\.?[0-9]*$/;
    return new RegExp(pattern).test(event.key);
  }

  @HostListener('focus', ['$event']) focus(event: any) {

    if (event.srcElement.value == '₹0.00' || event.srcElement.value == '0') {
      event.srcElement.value = null;
    }
    else {
      event.srcElement.value = event.srcElement.value.toString().replace('₹', "");
    }
  }


  @HostListener('focusout', ['$event']) focusOut(event: any) {

    var k = event.srcElement.value.toString().replace(/,/g, "");

    event.srcElement.value = new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(Number(k));

    if (event.srcElement.value == 'NaN') {
      event.srcElement.value = '';
    }
  }

}




@Directive({ selector: '[percentage]' })
export class persantageDirective {


  constructor(private el: ElementRef, public percentPipe: PercentPipe) { }

  @HostListener('focus', ['$event']) focus(event: any) {
    event.srcElement.value = event.srcElement.value.toString().replace(/,/g, "");
  }


  @HostListener('focusout', ['$event']) focusOut(event: any) {

    var k = event.srcElement.value.toString().replace(/,/g, "");

    event.srcElement.value = this.percentPipe.transform(this.el.nativeElement.value, '1.2');

    if (event.srcElement.value == 'NaN') {
      event.srcElement.value = '';
    }
  }

}


@Directive({ selector: '[capitalize]' })
export class capitalizeDirective {
  constructor(private el: ElementRef, public capitalize: TitleCasePipe, public CurrencyPipe: CurrencyPipe) { }
  @HostListener('input', ['$event']) onKeyDown(event: KeyboardEvent) {
    this.el.nativeElement.value = this.capitalize.transform(this.el.nativeElement.value);
  }
}

@Directive({ selector: '[uppercase]' })
export class UppercaseDirective {
  constructor(private el: ElementRef, public Uppercase: UpperCasePipe) { }
  @HostListener('input', ['$event']) onKeyDown(event: KeyboardEvent) {
    this.el.nativeElement.value = this.Uppercase.transform(this.el.nativeElement.value);
  }
}

@Directive({ selector: '[imgupload]' })

export class imguploadDirective {

  @Output() base64image: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef,
    private imageCompress: NgxImageCompressService) { }

  @HostListener('change', ['$event']) change(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageCompress.compressFile(reader.result, null, 50, 50).then(
      result => {

        this.base64image.emit(result);

      }
    );
  }
}

@Directive({ selector: '[numberOnly]' })
export class NumberOnlyDirective {
  constructor(public el: ElementRef) { }
  @HostListener('input', ['$event']) onInput(value: string) {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
  }
}

@Directive({ selector: '[noWhiteSpace]' })
export class noWhiteSpaceDirective {
  constructor(public el: ElementRef) { }
  @HostListener('focusout', ['$event']) onfocusout(vaue) {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/\s/g, "");
  }
}
 


@Directive({ selector: '[finDate]' })
export class finDateDirective {

  customdate: any;
  sdt;
  edt;
  constructor(public el: ElementRef, public provider: MyProvider) {

    this.sdt = formatDate(this.provider.companyinfo.finyear.fdt, 'yyyy/MM/dd', 'en-US');
    this.edt = formatDate(this.provider.companyinfo.finyear.tdt, 'yyyy/MM/dd', 'en-US');
  }

  @HostListener('focusout', ['$event']) onLoad(value) {
    this.customdate = this.el.nativeElement.value;
    if (this.customdate >= this.sdt && this.customdate <= this.edt) {

      this.el.nativeElement.classList.remove('is-invalid');

    } else {
      this.el.nativeElement.classList.add('is-invalid');
      this.el.nativeElement.classList.add('ng-invalid');
    }
  }
}



@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;

  @Input() dataName:string;
  constructor(private renderer: Renderer2, private targetElement: ElementRef) { }

  @HostListener("click")
  sortData() {
     
    var sort = new Sort();
    
    var elem = this.targetElement.nativeElement;

         var b:any =document.getElementsByClassName('bi bi-arrow-up');
            
         if(b.length > 0){
         
         b[0].className='bi bi-arrow-down';
         
         }
         
    var order = elem.getAttribute("data-order");

    var type = elem.getAttribute("data-type");
   
   
    elem.firstElementChild.className= order=='asc' ? "bi bi-arrow-up" :"bi bi-arrow-down";

    var property =  this.dataName;

    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }

  }

}

