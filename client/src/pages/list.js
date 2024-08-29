import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { FaDownload, FaStar, FaFilter, FaRocket } from 'react-icons/fa';

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
  
  body {
    background: linear-gradient(135deg, #0b0c1f, #1e1e2f);
    color: #e0e0e0;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: #4a90e2;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3a7bd5;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); }
  to { transform: translateX(0); }
`;

// Styled Components
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const SideMenu = styled.div`
  width: 25%;
  background-color: #1a1a2e;
  padding: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.5s ease-out;
`;

const MenuTitle = styled.h2`
  color: #4a90e2;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #e0e0e0;
  display: block;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #4a90e2;
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a2a3e;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #4a90e2;
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
  }

  &::placeholder {
    color: #e0e0e0;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const SearchResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const SearchResultItem = styled.div`
  background-color: #1a1a2e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.5s ease-in;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(74, 144, 226, 0.3);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  padding: 1.5rem;
`;

const ItemTitle = styled.h2`
  font-size: 1.25rem;
  color: #4a90e2;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const ItemType = styled.p`
  font-style: italic;
  color: #e0e0e0;
  margin-bottom: 1rem;
`;

const ItemDescription = styled.p`
  color: #e0e0e0;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
    transform: scale(1.05);
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
  color: ${props => props.filled ? '#f6e05e' : '#4a5568'};
  margin-right: 0.25rem;
`;

const RatingText = styled.span`
  color: #e0e0e0;
  margin-left: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: ${props => props.active ? '#4a90e2' : '#1a1a2e'};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#3a7bd5' : '#2a2a3e'};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const NoResultsMessage = styled.p`
  font-size: 1.2rem;
  color: #e0e0e0;
  text-align: center;
  margin-top: 2rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #4a90e2;
  border-top: 4px solid #63b3ed;
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

const ErrorMessage = styled.div`
  background-color: rgba(245, 101, 101, 0.1);
  color: #fc8181;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1a1a2e;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #4a90e2;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ModalTitle = styled.h2`
  color: #4a90e2;
  margin-top: 0;
`;

const ModalDescription = styled.p`
  color: #e0e0e0;
  line-height: 1.6;
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #4a90e2;
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
  }
`;

const CommentSubmitButton = styled.button`
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: #4a90e2;
`;

const CommentDate = styled.span`
  color: #e0e0e0;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const CommentText = styled.p`
  color: #e0e0e0;
  margin-top: 0.5rem;
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
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const location = useLocation();
  const searchTerm = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;
        if (searchTerm) {
          response = await axios.get(`https://api.asfaltios.com/list/${searchTerm}`);
        } else {
          response = await axios.get(`https://api.asfaltios.com/list`);
        }
        const fetchedItems = response.data.items;
        setItems(fetchedItems);
        setAllItems(fetchedItems);

        const types = [...new Set(fetchedItems.map(item => item.pluginType))];
        setPluginTypes(types);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch plugins. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...allItems];

    if (pluginTypeFilter) {
      result = result.filter(item => item.pluginType === pluginTypeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.mainText.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [allItems, pluginTypeFilter, searchQuery, sortBy, sortOrder]);

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(`New comment for ${selectedItem.title}: ${newComment}`);
    setNewComment('');
  };

  const renderStars = (rating) => {
    if (typeof rating !== 'number') {
      return null;
    }
    return [...Array(5)].map((_, index) => (
      <StarIcon key={index} filled={index < Math.round(rating)} />
    ));
  };

  const saveDownloadInfo = (item) => {
    const downloads = JSON.parse(localStorage.getItem('latestDownloads')) || [];
    const newDownload = {
      id: item._id,
      title: item.title,
      pluginType: item.pluginType,
      downloadedFrom: window.location.href,
      downloadedAt: new Date().toISOString()
    };
    downloads.unshift(newDownload);
    if (downloads.length > 10) {
      downloads.pop();
    }
    localStorage.setItem('latestDownloads', JSON.stringify(downloads));
  };

  const handleDownload = (e, item) => {
    e.stopPropagation();
    saveDownloadInfo(item);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <SideMenu>
          <MenuTitle>Minecraft Plugins</MenuTitle>
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
              <SearchInput
                id="search"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search plugins..."
              />
            </FilterGroup>
          </FilterContainer>
        </SideMenu>
        <MainContent>
          {currentItems.length > 0 ? (
            <SearchResultGrid>
              {currentItems.map((item) => (
                <SearchResultItem key={item._id} onClick={() => handleItemClick(item)}>
                  <ItemImage src={item.iconImageUrl} alt={item.title} />
                  <ItemInfo>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemType>{item.pluginType}</ItemType>
                    <RatingContainer>
                      {renderStars(item.rating)}
                      <RatingText>
                        {typeof item.rating === 'number' 
                          ? `${item.rating.toFixed(1)}`
                          : 'No rating'}
                      </RatingText>
                    </RatingContainer>
                    <ItemDescription>{item.mainText.slice(0, 100)}...</ItemDescription>
                    <DownloadButton 
                      href={item.fileUrl} 
                      download 
                      onClick={(e) => handleDownload(e, item)}
                    >
                      <FaDownload /> Download
                    </DownloadButton>
                  </ItemInfo>
                </SearchResultItem>
              ))}
            </SearchResultGrid>
          ) : (
            <NoResultsMessage>No plugins found. Try adjusting your filters.</NoResultsMessage>
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
        </MainContent>
      </AppContainer>
      {showModal && selectedItem && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={handleCloseModal}>&times;</ModalCloseButton>
            <ModalTitle>{selectedItem.title}</ModalTitle>
            <RatingContainer>
              {renderStars(selectedItem.rating)}
              <RatingText>
                {typeof selectedItem.rating === 'number' 
                  ? `${selectedItem.rating.toFixed(1)}`
                  : 'No rating'}
              </RatingText>
            </RatingContainer>
            <ModalDescription>{selectedItem.mainText}</ModalDescription>
            <DownloadButton 
              href={selectedItem.fileUrl} 
              download 
              onClick={(e) => handleDownload(e, selectedItem)}
            >
              <FaDownload /> Download
            </DownloadButton>
            <CommentSection>
              <h3>Comments</h3>
              <form onSubmit={handleCommentSubmit}>
                <CommentInput
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <CommentSubmitButton type="submit">Submit Comment</CommentSubmitButton>
              </form>
              <CommentList>
                {selectedItem.comments && selectedItem.comments.map((comment, index) => (
                  <CommentItem key={index}>
                    <CommentAuthor>{comment.author}</CommentAuthor>
                    <CommentDate>{new Date(comment.date).toLocaleDateString()}</CommentDate>
                    <CommentText>{comment.text}</CommentText>
                  </CommentItem>
                ))}
              </CommentList>
            </CommentSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default Search;

