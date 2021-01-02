import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { isUserAdmnin } from '../../utils/api';
import { AddAlbumForm } from '../albums/AddAlbumForm';
import { ArtistForm } from '../Artists/ArtistForm';
import { BasicModal } from '../Modal';

export const MenuLeft = ({ user }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    isUserAdmnin(user.uid).then((resp) => setUserAdmin(resp));
  }, [user.uid]);

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handlerModal = (type) => {
    switch (type) {
      case 'artist':
        setTitleModal('Nuevo artista');
        setContentModal(<ArtistForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      case 'song':
        setTitleModal('Nueva canción');
        setContentModal('Formulario nueva canción');
        setShowModal(true);
        break;

      case 'album':
        setTitleModal('Nueva canción');
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);
        break;
    }
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
            <Menu.Item onClick={() => handlerModal('artist')}>
              <Icon name="plus square outline" /> Nuevo artista
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal('album')}>
              <Icon name="plus square outline" /> Nuevo album
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal('song')}>
              <Icon name="plus square outline" /> Nueva canción
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
};
