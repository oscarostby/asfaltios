// pages/search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 80%;
  max-width: 600px;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 5px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h2`
  margin-top: 0;
`;

const ItemType = styled.p`
  font-style: italic;
`;

const DownloadButton = styled.a`
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Search() {
  const [items, setItems] = useState([]);
  const [pluginTypeFilter, setPluginTypeFilter] = useState('');
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchTerm && pluginTypeFilter) {
          response = await axios.get(`https://api.asfaltios.com/list/${searchTerm}?pluginType=${pluginTypeFilter}`);
        } else if (searchTerm) {
          response = await axios.get(`https://api.asfaltios.com/list/${searchTerm}`);
        } else {
          response = await axios.get(`https://api.asfaltios.com/list`);
        }
        setItems(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm, pluginTypeFilter]);

  const handlePluginTypeFilterChange = (e) => {
    setPluginTypeFilter(e.target.value);
  };

  return (
    <SearchResultContainer>
      <h1>Search Results for "{searchTerm || 'All Plugins'}"</h1>
      <div>
        <label htmlFor="pluginTypeFilter">Filter by Type:</label>
        <select
          id="pluginTypeFilter"
          value={pluginTypeFilter}
          onChange={handlePluginTypeFilterChange}
        >
          <option value="">All</option>
          <option value="survival">Survival</option>
          <option value="creative">Creative</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {items.map((item) => (
        <SearchResultItem key={item._id}>
          <ItemImage src={item.iconImageUrl} alt="Item" />
          <ItemInfo>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemType>Type: {item.pluginType}</ItemType> {/* Display pluginType */}
            <p>{item.mainText}</p>
          </ItemInfo>
          <DownloadButton href={item.fileUrl} download>
            Download
          </DownloadButton>
        </SearchResultItem>
      ))}
    </SearchResultContainer>
  );
}

export default Search;
