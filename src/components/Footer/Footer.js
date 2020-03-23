import React from 'react';
import './Footer.css'
import axios from 'axios'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
const demoLeonardFill = async () => {
  await axios.put('/api/client/comment/3', {comment: 'What color of Winter Boots does Leonard want?'})
  await axios.put(`/api/client/item/purchased/6`)
  await axios.put(`/api/client/item/purchased/7`)
  await axios.put(`/api/client/item/purchased/5`)


  
}

const Footer = () => (
  <footer onClick={demoLeonardFill}>
    &copy; Donation Day Hub
  </footer>
);

export default Footer;
