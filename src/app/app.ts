import { Component, signal } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import {ViewportScroller} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router, private scroller: ViewportScroller) {
    // Mets ici la hauteur de ta navbar
    this.scroller.setOffset([0, 70]);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (!fragment) return;

        // attend que le DOM soit prêt
        requestAnimationFrame(() => {
          this.scroller.scrollToAnchor(fragment);
        });
      });
  }}
