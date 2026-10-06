import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type Lang = 'es' | 'en' | 'fr' | 'pt';

const LANGS: { code: Lang; label: string; country: string }[] = [
  { code: 'es', label: 'ES', country: 'ES' },
  { code: 'en', label: 'EN', country: 'GB' },
  { code: 'fr', label: 'FR', country: 'FR' },
  { code: 'pt', label: 'PT', country: 'PT' },
];

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls:   ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  langs = LANGS;
  lang: Lang = (localStorage.getItem('lang') as Lang) || 'es';
  t: any = {};
  showLang  = false;
  openFaq: number | null = null;

  readonly featureIcons = [
    { bg: '#e6f1fb', stroke: '#185fa5' },
    { bg: '#eaf3de', stroke: '#3b6d11' },
    { bg: '#faeeda', stroke: '#854f0b' },
    { bg: '#eeedfe', stroke: '#534ab7' },
    { bg: '#e1f5ee', stroke: '#0f6e56' },
    { bg: '#fbeaf0', stroke: '#993556' },
  ];

  readonly benefitIcons = [
    { bg: '#e6f1fb', stroke: '#185fa5' },
    { bg: '#eaf3de', stroke: '#3b6d11' },
    { bg: '#faeeda', stroke: '#854f0b' },
    { bg: '#eeedfe', stroke: '#534ab7' },
  ];

  dark = false;

constructor(private http: HttpClient) {
  let guardado: string | null = null;
  try { guardado = localStorage.getItem('tema'); } catch {}
  this.aplicarTema(guardado === 'dark');
}

toggleTheme(): void {
  this.aplicarTema(!this.dark);
  try { localStorage.setItem('tema', this.dark ? 'dark' : 'light'); } catch {}
}

 private aplicarTema(oscuro: boolean): void {
  this.dark = oscuro;
  document.documentElement.setAttribute('data-theme', oscuro ? 'dark' : 'light');
}

  ngOnInit(): void { this.loadLang(this.lang); }

  loadLang(lang: Lang): void {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    this.http.get<any>(`assets/i18n/landing-${lang}.json`).subscribe(data => {
      this.t = data;
    });
  }

  goTo(path: string): void {
  window.location.href = `${environment.appUrl}${path}`;
  }

  setLang(code: string): void {
    this.loadLang(code as Lang);
    this.showLang = false;
  }

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? null : i;
  }

  get currentLang(): { code: Lang; label: string; country: string } {
    return this.langs.find(l => l.code === this.lang) ?? this.langs[0];
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!(e.target as HTMLElement).closest('.lang-selector')) {
      this.showLang = false;
    }
  }
}