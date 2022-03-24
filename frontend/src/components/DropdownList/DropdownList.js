import React, { useState, useEffect } from 'react';
import { DropdownList } from 'react-widgets';

import { listAuthors } from '../../services/authors';

function RegionDropdown({ value, onChange }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await listAuthors();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  return (
    <div className="RegionDropdown">
      <DropdownList
        value={value}
        data={authors}
        dataKey="id"
        textField={(item) =>
          item.firstName ? `${item.firstName} ${item.lastName}` : ''
        }
        defaultValue=""
        onChange={onChange}
        allowCreate={false}
      />
    </div>
  );
}

export default RegionDropdown;
