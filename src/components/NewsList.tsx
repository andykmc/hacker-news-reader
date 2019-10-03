import React from 'react';
import { NewsStory } from '../lib/apiClient';

type Props = {
  items: NewsStory[];
  onClick: Function;
};

const NewsList: React.FunctionComponent<Props> = ({ items, onClick }) => (
  <div>
    <ul
      style={{
        listStyle: 'none',
        paddingLeft: '0',
        width: '250px',
      }}
    >
      {items.length > 0 &&
        items.map(item => (
          <li
            style={{
              padding: '5px 0 5px',
              borderBottom: '1px solid grey',
            }}
            key={item.id}
          >
            <a
              href={item.url}
              onClick={e => {
                e.preventDefault();
                onClick(item.url);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
    </ul>
  </div>
);

export default NewsList;
