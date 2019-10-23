import React, { Component } from 'react';

class CustomSidebarNav extends Component {
  render() {
    return (
      <div class='sidebar'>
        <nav class='sidebar-nav'>
          <ul class='nav'>
            <li class='nav-title'>Nav Title</li>
            <li class='nav-item'>
              <a class='nav-link' href='#'>
                <i class='nav-icon cui-speedometer' /> Nav item
              </a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='#'>
                <i class='nav-icon cui-speedometer' /> With badge
                <span class='badge badge-primary'>NEW</span>
              </a>
            </li>
            <li class='nav-item nav-dropdown'>
              <a class='nav-link nav-dropdown-toggle' href='#'>
                <i class='nav-icon cui-puzzle' /> Nav dropdown
              </a>
              <ul class='nav-dropdown-items'>
                <li class='nav-item'>
                  <a class='nav-link' href='#'>
                    <i class='nav-icon cui-puzzle' /> Nav dropdown item
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#'>
                    <i class='nav-icon cui-puzzle' /> Nav dropdown item
                  </a>
                </li>
              </ul>
            </li>
            <li class='nav-item mt-auto'>
              <a class='nav-link nav-link-success' href='https://coreui.io'>
                <i class='nav-icon cui-cloud-download' /> Download CoreUI
              </a>
            </li>
            <li class='nav-item'>
              <a class='nav-link nav-link-danger' href='https://coreui.io/pro/'>
                <i class='nav-icon cui-layers' /> Try CoreUI
                <strong>PRO</strong>
              </a>
            </li>
          </ul>
        </nav>
        <button class='sidebar-minimizer brand-minimizer' type='button' />
      </div>
    );
  }
}

export default CustomSidebarNav;
