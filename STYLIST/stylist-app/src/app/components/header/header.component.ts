import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dropdown = false;

  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  hideDropdown(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }

  async logout() {
    await this.authService.logoutUser();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

}
