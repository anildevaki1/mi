import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrcrdr'
})
export class InrcrdrPipe implements PipeTransform {

  transform(value: number, fraction: number): number {

    var k: any = new Intl.NumberFormat('hi-IN', { minimumFractionDigits: fraction }).format(Number(value));

    if (k > 0) {

      k += ' CR';
    } else {

      var k = k.toString().replace('-', "");
      k += ' DR';
    }

    return k;
  }

}


@Pipe({
  name: 'myFilter'
})
export class TestFilterPipe implements PipeTransform {

  // transform(items: any[], field : string, value : string): any[] {  

  transform(items, object) {
    var field = Object.keys(object)[0];
    var value = object[field];

    if (!items) return [];
    if (!value || value.length == 0) return items;

    return items.filter(it => it[field].toString()
    .toLowerCase().indexOf(value.toLowerCase()) != -1);

  }
}

@Pipe({
  name: 'searchPipe',
})
export class searchpipesinple implements PipeTransform {
  public transform(value: any, key: any, searchTearm: any) {
    return value.filter(function (search) {
      return search.key.toLowarCase().indexOf(searchTearm.toLowarCase()) - 1;
    })
  }
}

@Pipe({
  name: 'dssDate'
})
export class dssDate implements PipeTransform {

  transform(date: Date): number {
    var k: any = formatDate(date, 'dd/MM/yyyy hh:mm:ss a', 'en-US');
    return k;
  }

}

@Pipe({
  name: 'trimWhiteSpace'
})
export class trimWhiteSpace implements PipeTransform {
  transform(value: any): string {
    return value.replace(/\s/g, "");
  }
}

@Pipe({
  name: "sort"
})
export class ArraySortPipe implements PipeTransform {

  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return array;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

