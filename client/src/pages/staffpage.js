import React, { useState } from 'react';
import '../styles/pluginlist.css'; // Make sure the path to the CSS file is correct
import Header from '../components/header';
import Footer from "../components/footer";

const PluginsList = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const plugins = [
    { 
      title: "Bakteria Staff Plugin", 
      description: "Moderation plugin for Minecraft.", 
      image: 'https://www.spigotmc.org/data/resource_icons/117/117394.jpg', 
      url: 'https://www.spigotmc.org/resources/bakteria-staff-moderation-plugin-1-8-1-21.117394/', 
      downloads: '277', 
      rating: '5.0', 
      category: 'Moderation' 
    },
    { 
      title: "Simple Gold Plugin", 
      description: "Economy plugin for Minecraft.", 
      image: 'https://www.spigotmc.org/data/resource_icons/115/115987.jpg', 
      url: 'https://www.spigotmc.org/resources/simple-gold-1-20-1-21-vault-towny.115987/', 
      downloads: '368', 
      rating: '5.0', 
      category: 'Economy' 
    },
    { 
      title: "Grief Prevention Plugin", 
      description: "Prevent griefing.", 
      image: 'https://example.com/plugin-image.png', 
      downloads: '1.5K', 
      rating: '5.0', 
      category: 'Protection' 
    },
    { 
      title: "DDoS Protection Plugin", 
      description: "Protect from DDoS attacks.", 
      image: 'https://example.com/plugin-image.png', 
      downloads: '2K', 
      rating: '4.9', 
      category: 'Protection' 
    }
  ];

  const filters = ['All', 'Moderation', 'Economy', 'Protection'];

  const filteredPlugins = activeFilter === 'All' ? plugins : plugins.filter(plugin => plugin.category === activeFilter);

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrapper">

        <section className="section-wrapper">
          <h1 className="section-title">Our Plugins</h1>

          {/* Filter Buttons */}
          <div className="filter-container">
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`filter-button ${filter === activeFilter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Plugin Grid */}
          <div className="plugin-grid">
            {filteredPlugins.map((plugin, index) => (
              <div
                key={index}
                className="plugin-card"
              >
                <a href={plugin.url} target="_blank" rel="noopener noreferrer">
                  <img src={plugin.image} alt={plugin.title} className="plugin-image" />
                </a>
                <h3 className="plugin-title">{plugin.title}</h3>
                <p className="plugin-description">{plugin.description}</p>

                <div className="plugin-stats">
                  <span>Downloads: {plugin.downloads}</span>
                  <span>Rating: {plugin.rating}</span>
                </div>

                <span className={`badge ${plugin.category.toLowerCase()}`}>
                  {plugin.category}
                </span>
              </div>
            ))}
          </div>

        </section>

      </div>
      <Footer />
    </div>
  );
};

export default PluginsList;
