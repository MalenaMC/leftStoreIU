import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { SalesComponent } from "./sales/sales.component";
import { DirectComponent } from "./sales/direct/direct.component";
import { OnlineComponent } from "./sales/online/online.component";
import { PurchasesComponent } from "./purchases/purchases.component";
import { SalesHistoryComponent } from "./sales/sales-history/sales-history.component";

export const dashboardRoutes: Routes = [
    {
        path: 'pages',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: HomeComponent
            },
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'sales',
                component: SalesComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'direct',
                        pathMatch: 'full'
                    },
                    {
                        path: 'direct',
                        component: DirectComponent
                    },
                    {
                        path: 'online',
                        component: OnlineComponent
                    },
                    {
                        path: 'history',
                        component: SalesHistoryComponent
                    }
                ]
            },
            {
                path: 'purchases',
                component: PurchasesComponent
            },
        ]
    }
]