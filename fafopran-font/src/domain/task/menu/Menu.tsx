import './menu.css';
import {JSX} from "react";

export class MenuItem {
    constructor(name: string, link: () => JSX.Element) {
        this.name = name
        this.link = link
    }

    name: string | undefined;
    link: () => JSX.Element | undefined;
}

interface MenuProps {
    items?: MenuItem[]
}

export default function Menu({items}: MenuProps) {
    return (<>
        <div className="div-menu">
            <nav className="menu">
                {
                    items?.map(i => (
                        <div className="menu__item" key={i.name}>
                            {i.link()}
                            <div className="marquee">
                                <div className="marquee__inner" aria-hidden="true">
                                    <span>{i.name}</span>
                                    <span>{i.name}</span>
                                    <span>{i.name}</span>
                                    <span>{i.name}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </nav>
        </div>
    </>)
}