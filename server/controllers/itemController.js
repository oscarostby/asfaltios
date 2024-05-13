const Item = require('./itemModel');

exports.uploadItem = async (req, res) => {
    try {
        const { title, mainText, fileUrl, iconImageUrl } = req.body; // Adjusted variable names to match the previous schema
        const newItem = new Item({ title, mainText, fileUrl, iconImageUrl }); // Adjusted property names to match the previous schema
        await newItem.save();
        res.status(200).json({ message: 'Item uploaded successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
      }
};

exports.searchItems = async (req, res) => {
    const { searchTerm } = req.params;
  try {
    const items = await Item.find({ title: { $regex: searchTerm, $options: 'i' } });
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the items' });
  }
};
