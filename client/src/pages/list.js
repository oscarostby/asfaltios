// pages/search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for improved styling
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
  const [sortBy, setSortBy] = useState('');
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axios.get(`https://api.asfaltios.com/list/${searchTerm}?sortBy=${sortBy}`);
        } else {
          response = await axios.get(`https://api.asfaltios.com/list?sortBy=${sortBy}`);
        }
        setItems(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm, sortBy]);

  return (
    <SearchResultContainer>
      <h1>Search Results for "{searchTerm || 'All Plugins'}"</h1>
      <div>
        <label htmlFor="sortBy">Sort by:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="mostDownloaded">Most Downloaded</option>
          <option value="type">Type</option>
        </select>
      </div>
      {items.map((item) => (
        <SearchResultItem key={item._id}>
          <ItemImage src={item.iconImageUrl} alt="Item" />
          <ItemInfo>
            <ItemTitle>{item.title}</ItemTitle>
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