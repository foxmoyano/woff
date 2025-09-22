import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_MAP } from '../utils/country-map';

@Pipe({
  name: 'countryName',
  standalone: true,
})
export class CountryNamePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return COUNTRY_MAP[value] ?? value;
  }
}