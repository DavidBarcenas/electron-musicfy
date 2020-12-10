import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export const MenuLeft = ({ user }) => {
  return (
    <Menu className="menu-left" vertical>
      <div className="top">
        <Menu.Item name="home">
          <Icon name="home" /> Inicio
        </Menu.Item>
        <Menu.Item name="artists">
          <Icon name="music" /> Artistas
        </Menu.Item>
      </div>
      <div className="footer">
        <Menu.Item>
          <Icon name="plus square outline" /> Nuevo artista
        </Menu.Item>
        <Menu.Item>
          <Icon name="plus square outline" /> Nueva canción
        </Menu.Item>
      </div>
    </Menu>
  );
};
