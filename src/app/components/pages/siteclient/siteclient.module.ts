import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "../about/about.component";
import {ContactComponent} from "../contact/contact.component";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";
import {NavcategorieComponent} from "../navcategorie/navcategorie.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterdoctorComponent} from "../registerdoctor/registerdoctor.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DetailComponent} from "../product-detail/detail.component";
import {AuthGuard} from "../../_guards/auth.guard";
import {Role} from "../../enum/Role";
//import {BrowserModule} from "@angular/platform-browser";
import {MenuProviderComponent} from "../menu-provider/menu-provider.component";
import {MenuDashComponent} from "../menu-dash/menu-dash.component";
import {ProductListComponent} from "../product-list/product.list.component";
import {FooterDashComponent} from "../footer-dash/footer-dash.component";
import {TopbarComponent} from "../topbar/topbar.component";
import {FileUploadModule} from "ng2-file-upload";
import {DetailProdComponent} from "../prod-detail-dash/detail-prod.component";
import {SpecialityListComponent} from "../speciality-list/speciality.list.component";
import {DetailSpecialityComponent} from "../speciality-detail-dash/detail-speciality.component";
import {ProdUpdateComponent} from "../prod-update-dash/prod-update.component";
import {ProviderListComponent} from "../provider-list-dash/provider.list.component";
import {DoctorListComponent} from "../doctor-list-dash/doctor.list.component";
import {ProviderNoblocklistComponent} from "../provider-noblocklist-dash/provider.noblocklist.component";
import {ProviderBlocklistComponent} from "../provider-blocklist-dash/provider.blocklist.component";
import {DetailProviderComponent} from "../provider-detail-dash/detail-provider.component";
import {ProviderNewlistComponent} from "../provider-newlist-dash/provider.newlist.component";
import {ComplaintListComponent} from "../complaint-list-dash/complaint.list.component";
import {ContactListComponent} from "../contact-list-dash/contact.list.component";
import {CarteComponent} from "../carte/carte.component";
import {OrderComponent} from "../order-dash/order.component";
import {DetailOrderComponent} from "../order-detail/detail-order.component";
import {CheckoutComponent} from "../checkout/checkout.component";
import {ShopGridComponent} from "../shop-grid/shop-grid.component";
import {NewProductsComponent} from "../new-products/new-products.component";
import {SpecialityProductsComponent} from "../speciality-products/speciality-products.component";
import {WishlistComponent} from "../wishlist/wishlist.component";
import {PaginationComponent} from "../pagination/pagination.component";


const routes : Routes = [
  { path: '', component: HomeComponent },
  {path: 'product/:id', component: DetailComponent,  pathMatch: 'full'},
  {path: 'dashboard/edit-product/:id', component: DetailProdComponent,  pathMatch: 'full'},
  {path: 'dashboard/edit-provider/:id', component: DetailProviderComponent,  pathMatch: 'full',
    canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}},
  {path: 'dashboard/edit-speciality/:id', component: DetailSpecialityComponent,  pathMatch: 'full'},
  {path: 'dashboard/update-product/:id', component: ProdUpdateComponent,
    canActivate: [AuthGuard], data: {roles: [Role.PROVIDER]}
  ,pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-medcin', component: RegisterdoctorComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent  , canActivate: [AuthGuard], data: {roles: [Role.DOCTOR]} },
  { path: 'about', component: AboutComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'All-products', component: ShopGridComponent },
  //{ path: 'Speciality-products/:id', component: SpecialityProductsComponent },
  { path: 'Speciality-products/:id', component: NewProductsComponent },
  { path: 'All-new-products', component: NewProductsComponent },

  {
    path: 'liste-orders',
    component: OrderComponent,
    canActivate: [AuthGuard], data: {roles: [Role.PROVIDER]}
  },
  {
    path: 'order/:id',
    component: DetailOrderComponent,
    canActivate: [AuthGuard], data: {roles: [Role.PROVIDER]}
  },
 {
    path: 'liste-providers',
    component: ProviderListComponent,
    canActivate: [AuthGuard], data: {roles: [ Role.ADMIN]}
  },
  {
    path: 'liste-doctors',
    component: DoctorListComponent,
    canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}
  },
  {
    path: 'liste-speciality',
    component: SpecialityListComponent,
    canActivate: [AuthGuard], data: {roles: [Role.PROVIDER, Role.ADMIN]}
  },
  {
    path: 'liste-product',
    component: ProductListComponent,
    canActivate: [AuthGuard], data: {roles: [Role.PROVIDER, Role.ADMIN]}
  },
  {
    path: 'liste-complaint',
    component: ComplaintListComponent,
    canActivate: [AuthGuard], data: {roles: [Role.PROVIDER, Role.ADMIN]}
  },
  {
    path: 'liste-contact',
    component: ContactListComponent,
    canActivate: [AuthGuard], data: {roles: [ Role.ADMIN]}
  },
  {
    path: 'liste-blocked-providers',
    component: ProviderBlocklistComponent,
    canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}
  },
  {
    path: 'liste-notblocked-providers',
    component: ProviderNoblocklistComponent,
    canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}
  },
  {
    path: 'liste-new-providers',
    component: ProviderNewlistComponent,
    canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}
  },
 /* {
    path: 'product/:id/edit',
    component: DetailComponent,
  pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.PROVIDER]}
  },*/
]


@NgModule({
  declarations: [
    DetailComponent,
    ProviderNoblocklistComponent,
    HomeComponent,
    OrderComponent,
    NewProductsComponent,
    ShopGridComponent,
    DetailOrderComponent,
    DetailProviderComponent,
    CarteComponent,
    WishlistComponent,
    ProviderBlocklistComponent,
    ContactComponent,
    AboutComponent,
    ContactListComponent,
    NavcategorieComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProviderNewlistComponent,
    ComplaintListComponent,
    RegisterdoctorComponent,
    RegisterComponent,
    DoctorListComponent,
    DetailProdComponent,
    ProdUpdateComponent,
    MenuDashComponent,
    CheckoutComponent,
    SpecialityProductsComponent,
    ProductListComponent,
    ProviderListComponent,
    SpecialityListComponent,
    DetailSpecialityComponent,
    FooterDashComponent,
    TopbarComponent,
    PaginationComponent,
    MenuProviderComponent,
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
  ///  BrowserModule,
    RouterModule.forChild(routes),
    CommonModule,
    FileUploadModule
  ]

})
export class SiteclientModule {
}
