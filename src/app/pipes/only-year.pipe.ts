import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyYear'
})
export class YearOnlyPipe implements PipeTransform {
  transform(value: Date | string | null | undefined): string {
    if (!value) return ''; // Manejo de valores nulos o indefinidos

    const date = typeof value === 'string' ? new Date(value) : value; // Convertir si es string
    return date.getFullYear().toString(); // Extraer el año
  }
}