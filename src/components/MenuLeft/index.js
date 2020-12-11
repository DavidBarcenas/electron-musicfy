import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { isUserAdmnin } from '../../utils/api';
import { BasicModal } from '../Modal';

export const MenuLeft = ({ user }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);

  useEffect(() => {
    isUserAdmnin(user.uid).then((resp) => setUserAdmin(resp));
  }, [user.uid]);

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            active={activeMenu === '/'}
            onClick={handleMenu}
          >
            <Icon name="home" /> Inicio
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            active={activeMenu === '/artists'}
            onClick={handleMenu}
          >
            <Icon name="music" /> Artistas
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item>
              <Icon name="plus square outline" /> Nuevo artista
            </Menu.Item>
            <Menu.Item>
              <Icon name="plus square outline" /> Nueva canción
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={true} setShow={null} title="test title">
        <h1>Contenido Modal</h1>
      </BasicModal>
    </>
  );
};
