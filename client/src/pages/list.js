import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaDownload, FaStar, FaFilter } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); }
  to { transform: translateY(0); }
`;

// Styled Components
const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const SearchHeader = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
`;

const FilterGroup = styled.div`
  margin: 0 1rem 1rem 0;
`;

const FilterLabel = styled.label`
  font-weight: bold;
  margin-right: 0.5rem;
  color: #34495e;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #bdc3c7;
  background-color: #ecf0f1;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e6e9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.5);
  }
`;

const SearchResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const SearchResultItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.5s ease-in;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
`;

const ItemTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const ItemType = styled.p`
  font-style: italic;
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const ItemDescription = styled.p`
  color: #34495e;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StarIcon = styled(FaStar)`
  color: ${props => props.filled ? '#f1c40f' : '#bdc3c7'};
  margin-right: 0.25rem;
`;

const RatingText = styled.span`
  color: #7f8c8d;
  margin-left: 0.5rem;
`;

const NoResultsMessage = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin-top: 2rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: ${props => props.active ? '#3498db' : '#ecf0f1'};
  color: ${props => props.active ? '#ffffff' : '#2c3e50'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#bdc3c7'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Search() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [pluginTypeFilter, setPluginTypeFilter] = useState('');
  const [pluginTypes, setPluginTypes] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (searchTerm) {
          response = await axios.get(`https://api.asfaltios.com/list/${searchTerm}`);
        } else {
          response = await axios.get(`https://api.asfaltios.com/list`);
        }
        const fetchedItems = response.data.items;
        setItems(fetchedItems);
        setAllItems(fetchedItems);

        // Extract unique plugin types from the fetched items
        const types = [...new Set(fetchedItems.map(item => item.pluginType))];
        setPluginTypes(types);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...allItems];

    // Apply plugin type filter
    if (pluginTypeFilter) {
      result = result.filter(item => item.pluginType === pluginTypeFilter);
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.mainText.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [allItems, pluginTypeFilter, searchQuery, sortBy, sortOrder]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  const handlePluginTypeFilterChange = (e) => {
    setPluginTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderStars = (rating) => {
    if (typeof rating !== 'number') {
      return null; // or return a default star rating
    }
    return [...Array(5)].map((_, index) => (
      <StarIcon key={index} filled={index < Math.round(rating)} />
    ));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SearchResultContainer>
      <SearchHeader>Search Results for "{searchTerm || 'All Plugins'}"</SearchHeader>
      <FilterContainer>
        <FilterGroup>
          <FilterLabel htmlFor="pluginTypeFilter">Filter by Type:</FilterLabel>
          <FilterSelect
            id="pluginTypeFilter"
            value={pluginTypeFilter}
            onChange={handlePluginTypeFilterChange}
          >
            <option value="">All</option>
            {pluginTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="sortBy">Sort by:</FilterLabel>
          <FilterSelect id="sortBy" value={sortBy} onChange={handleSortChange}>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="downloads">Downloads</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="sortOrder">Order:</FilterLabel>
          <FilterSelect id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="search">Search:</FilterLabel>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search plugins..."
          />
        </FilterGroup>
      </FilterContainer>
      {currentItems.length > 0 ? (
        <SearchResultGrid>
          {currentItems.map((item) => (
            <SearchResultItem key={item._id}>
              <ItemImage src={item.iconImageUrl} alt={item.title} />
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemType>Type: {item.pluginType}</ItemType>
                <RatingContainer>
                  {renderStars(item.rating)}
                  <RatingText>
                    {typeof item.rating === 'number' 
                      ? `(${item.rating.toFixed(1)})`
                      : '(No rating)'}
                  </RatingText>
                </RatingContainer>
                <ItemDescription>{item.mainText}</ItemDescription>
              </ItemInfo>
              <DownloadButton href={item.fileUrl} download>
                <FaDownload /> Download
              </DownloadButton>
            </SearchResultItem>
          ))}
        </SearchResultGrid>
      ) : (
        <NoResultsMessage>No results found. Try adjusting your filters.</NoResultsMessage>
      )}
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    </SearchResultContainer>
  );
}

export default Search;