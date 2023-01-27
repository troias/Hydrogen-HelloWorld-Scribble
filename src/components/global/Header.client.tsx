import { Link, } from '@shopify/hydrogen'


export function Header({
    title,
    menu

}) {



    const TopMenu = () => {
        console.log("menu", menu.items)
        return (
            <nav>

                {
                    (menu?.items).map((item) => {
                        return (
                            <Link to={item.url} key={item.id}>
                                {item.title}
                            </Link>
                        )
                    })
                }
            </nav>


        )
    }








    return (
        <header>
            <div>


            </div>
        </header>
    )

}