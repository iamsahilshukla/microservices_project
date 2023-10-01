const fetch = require('axios');

const getContentDetails = async (contentId) => {
  try {
    const response = await axios.get(`http://user-interaction-service:3002/api/user-interaction/content/${contentId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching content details:', error.message);
    throw error;
  }
};

module.exports = getContentDetails;
