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
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axios.get(`https://198.244.148.54:5000/list/${searchTerm}`);
        } else {
          response = await axios.get(`https://198.244.148.54:5000/list`);
        }
        setItems(response.data.items);
        console.log(response.data.items); // Log the items to check image URLs
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  return (
    <SearchResultContainer>
      <h1>Search Results for "{searchTerm || 'All Plugins'}"</h1>
      {items.map(item => (
        <SearchResultItem key={item._id}>
          <ItemImage src={item.imageUrl} alt="Item" />
          <ItemInfo>
            <ItemTitle>{item.title}</ItemTitle>
            <p>{item.mainText}</p>
          </ItemInfo>
          <DownloadButton href={item.downloadLink} download>Download</DownloadButton>
        </SearchResultItem>
      ))}
    </SearchResultContainer>
  );
}

export default Search;
