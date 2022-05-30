import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: "",
        loadChildren: () =>
        import("../home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "my-wardrobe",
        loadChildren: () =>
        import("../my-wardrobe/my-wardrobe.module").then((m) => m.MyWardrobePageModule),
      },
      {
        path: "saved-outfits",
        loadChildren: () =>
        import("../saved-outfits/saved-outfits.module").then((m) => m.SavedOutfitsPageModule)
      },
      {
        path: "new-apparel/:id",
        loadChildren: () =>
        import("../new-apparel/new-apparel.module").then((m) => m.NewApparelPageModule)
      },
      {
        path: "new-apparel",
        loadChildren: () =>
        import("../new-apparel/new-apparel.module").then((m) => m.NewApparelPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
