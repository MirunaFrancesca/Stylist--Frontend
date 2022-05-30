import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatform, MenuController, Platform } from "@ionic/angular";
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public iconHanger = "../../../assets/icon/hanger.svg";
  public iconHeart = "../../../assets/icon/fill-heart.svg";
  public iconList = "../../../assets/icon/list-outline.svg";

  menuItems = [
    {
      title: "Home",
      icon: "home",
      path: "/"
    },
    {
      title: "Your Wardrobe",
      icon: "",
      path: "/my-wardrobe"
    },
    {
      title: "New Apparel",
      icon: "",
      path: "/new-apparel"
    },
    {
      title: "Favourite Outfits",
      icon: "",
      path: "/saved-outfits"
    },
  ];

  title = "Home";

  constructor(
    private plt: Platform, 
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    const headerHeight = isPlatform("ios") ? 44 : 56;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  setTitle(title) {
    this.title = title;
  }

  @HostListener("window:resize", ["$event"])
  private onResize(event) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

  toggleMenu(width) {
    if (width > 768) this.menuCtrl.enable(false, "myMenu");
    else this.menuCtrl.enable(true, "myMenu");
  }

  async logout() {
    await this.authService.logoutUser();

    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

}
