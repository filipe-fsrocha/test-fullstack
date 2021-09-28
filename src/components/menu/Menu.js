import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom'

class Menu extends Component {

    render() {
        return <div>
            <ul className="menu-options">
                <li>
                    <NavLink
                        to="/search"
                        className="default-link"
                        activeClassName="active-link"><i class="fas fa-search-location"></i></NavLink>
                    <span className="menu-description">Pesquisar</span>
                </li>
                <li>
                    <NavLink
                        to="/history"
                        className="default-link"
                        activeClassName="active-link"><i class="fas fa-history"></i></NavLink>
                    <span className="menu-description">Histórico</span>
                </li>
                <li>
                    <NavLink
                        to="/config"
                        className="default-link"
                        activeClassName="active-link"> <i class="fas fa-tools"></i></NavLink>
                    <span className="menu-description">Configurações</span>
                </li>
            </ul>
        </div>
    }

}

export default Menu