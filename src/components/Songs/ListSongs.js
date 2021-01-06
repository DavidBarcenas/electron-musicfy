import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

export const ListSongs = ({ songs, albumImage }) => {
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
          <ListItem key={song.id} song={song} albumImage={albumImage} />
        ))}
      </Table.Body>
    </Table>
  );
};

function ListItem({ song, albumImage }) {
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
}
