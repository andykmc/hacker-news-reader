import React from 'react';
import { NewsStory } from '../lib/apiClient';

type Props = {
  items: NewsStory[];
};

const NewsList: React.FunctionComponent<Props> = ({ items }) => (
  <ul>
    {items.length > 0 &&
      items.map(item => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
  </ul>
);

export default NewsList;
