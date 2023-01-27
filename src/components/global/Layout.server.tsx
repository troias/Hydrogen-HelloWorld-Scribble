import { Suspense } from 'react'
import { Header } from '~/components'

import { useShopQuery, gql } from '@shopify/hydrogen'
import { Menu, Shop } from '@shopify/hydrogen'



const SHOP_NAME_FALLBACK = 'Hydrogen'

export function Layout({ children }: { children: React.ReactNode }) {



    return (
        <>
            <Suspense>
                <HeaderWithMenu />
            </Suspense>

            {children}

        </>

    )
}


function HeaderWithMenu() {
    const { shopName, headerMenu } = useLayoutQuery()
    console.log("data", shopName)
    return (
        <Header title={shopName} menu={headerMenu} />
    )

}



const useLayoutQuery = () => {

    const HEADER_MENU_HANDLE = "main-menu"

    const { data } = useShopQuery<{
        shop: Shop
        headerMenu: Menu
    }>
        ({
            query: SHOP_QUERY,
            variables: {
                headerMenuHandle: HEADER_MENU_HANDLE
            }



        })



    const shopName = data ? data.shop.name : SHOP_NAME_FALLBACK

    console.log("shopName", shopName)

    const headerMenu = data?.headerMenu
        ? (data.headerMenu)
        : undefined

    return { shopName, headerMenu }
}

const SHOP_QUERY = gql`

    fragment MenuItem on MenuItem {
        id
        resourceId
        tags
        title
        type
        url
    }

    query layoutMenus($headerMenuHandle: String!) {
        shop {
            name
        }
        headerMenu: menu(handle: $headerMenuHandle) {
            id
            items {
                ...MenuItem
                items {
                    ...MenuItem
                }
            }
        }
    }



   
 



    

`