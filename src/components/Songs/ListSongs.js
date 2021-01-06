import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

export const ListSongs = ({ songs, albumImage, playerSong }) => {
  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Título</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {songs?.map((song) => (
          <ListItem
            key={song.id}
            song={song}
            albumImage={albumImage}
            playerSong={playerSong}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

function ListItem({ song, albumImage, playerSong }) {
  const onPlay = () => {
    playerSong(albumImage, song.name, song.fileName);
  };

  return (
    <Table.Row onClick={onPlay}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
}
