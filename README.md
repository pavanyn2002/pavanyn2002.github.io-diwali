# 🪔 Light of My Heart - Diwali Love Story

A beautiful, romantic, and interactive web experience celebrating Diwali and love. This website takes users through an emotional journey of light, love, and festive celebration, culminating in a heartfelt confession.

## ✨ Features

### 🎮 Interactive Games & Experiences
- **Welcome Journey**: Personalized entry with floating diyas and ambient effects
- **Light the Diyas**: Interactive diya lighting game with love messages
- **Fireworks Celebration**: Canvas-based firework system with realistic physics
- **Dance of Lights**: Animated diya characters with synchronized dance sequences
- **Wish Writing**: Floating wish system with magical animations
- **Final Confession**: Emotional revelation scene with multiple response options
- **Gift Corner**: Interactive gift opening with surprise messages

### 🎨 Design & Aesthetics
- **Authentic Diwali Colors**: Deep maroon, gold, warm amber, midnight purple
- **Smooth Animations**: CSS keyframes and JavaScript-powered effects
- **Responsive Design**: Mobile-optimized with touch-friendly interactions
- **Particle Systems**: Dynamic sparkles, floating elements, and light effects
- **Typography**: Beautiful Poppins and Great Vibes font combinations

### 🎵 Audio & Interaction
- **Background Music**: Optional Diwali-themed ambient music
- **Sound Controls**: User-friendly music toggle with visual feedback
- **Touch Support**: Optimized for both desktop and mobile experiences
- **Accessibility**: Screen reader friendly with proper contrast ratios

### 💖 Romantic Elements
- Personalized love messages throughout the journey
- Emotional progression building to confession moment
- Multiple response options for different comfort levels
- Heart animations and romantic particle effects
- Sweet gift messages and surprises

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pavanyn2002/light-of-my-heart.git
   cd light-of-my-heart
   ```

2. Open in browser:
   ```bash
   # Simply open index.html in your web browser
   # Or serve with a local server for best experience
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000` in your browser

## 📱 Usage

1. **Enter Your Name**: Start by entering your name on the welcome page
2. **Light the Diyas**: Click on each diya to light them and reveal love messages
3. **Create Fireworks**: Tap anywhere on the fireworks page to launch colorful explosions
4. **Make Diyas Dance**: Click the dance button to see animated diya characters
5. **Write Wishes**: Share your Diwali wishes and watch them float to the stars
6. **Experience Confession**: Click the special diya for the emotional revelation
7. **Choose Response**: Select how you want to respond to the confession
8. **Explore Gifts**: Open virtual gifts for surprise messages
9. **Share Love**: Share the experience with others

## 🔧 Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure and canvas for graphics
- **CSS3**: Advanced animations, gradients, and responsive design
- **Vanilla JavaScript**: Interactive functionality and game logic
- **Canvas API**: Fireworks particle system and effects
- **TailwindCSS**: Utility-first CSS framework for rapid styling

### Key Features
- **Particle System**: Custom JavaScript particle engine for ambient effects
- **Canvas Fireworks**: Real-time firework simulation with physics
- **State Management**: Progressive journey tracking through multiple scenes
- **Animation System**: Coordinated CSS and JS animations for smooth transitions
- **Responsive Layout**: Mobile-first design with touch optimization

### File Structure
```
light-of-my-heart/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styles and animations
├── script.js           # Interactive JavaScript functionality
├── README.md           # Project documentation
└── assets/            # Media assets (music, images)
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:

```css
:root {
    --primary-maroon: #5a2a27;
    --gold: #facc15;
    --warm-amber: #f59e0b;
    --midnight-purple: #1a102b;
    --warm-orange: #fb923c;
    --cream: #fef7cd;
    --soft-pink: #ffc0cb;
}
```

### Messages
Love messages and gift messages can be customized in the JavaScript:

```javascript
this.loveMessages = [
    "Your custom message here ✨",
    // Add more messages...
];
```

### Animations
Animation timing and effects can be adjusted in the CSS:

```css
@keyframes glow {
    0%, 100% { text-shadow: 0 0 20px #facc15; }
    50% { text-shadow: 0 0 10px #facc15; }
}
```

## 📱 Mobile Optimization

- **Touch Gestures**: Optimized for touch interactions
- **Responsive Breakpoints**: Adapts to various screen sizes
- **Performance**: Reduced particle counts on mobile devices
- **Accessibility**: Large touch targets (minimum 44px)

## 🎯 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ Internet Explorer: Not supported

## 🤝 Contributing

Contributions are welcome! Here are ways you can help:

1. **Bug Reports**: Submit issues for any bugs you find
2. **Feature Requests**: Suggest new interactive elements or animations
3. **Code Improvements**: Optimize performance or add new features
4. **Design Enhancements**: Improve visual aesthetics or user experience

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit: `git commit -m 'Add feature description'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💝 Acknowledgments

- **Diwali Inspiration**: Traditional Indian festival of lights
- **Design Elements**: Inspired by authentic Diwali decorations and colors
- **Animation Techniques**: Modern web animation best practices
- **Romantic Themes**: Celebrating love during the festival of lights

## 🌟 Features Roadmap

- [ ] **Audio Integration**: Multiple background music options
- [ ] **Language Support**: Multi-language confession messages
- [ ] **Social Sharing**: Enhanced social media integration
- [ ] **Custom Themes**: Additional color scheme options
- [ ] **Photo Upload**: Personal photo integration
- [ ] **Video Messages**: Record and playback video messages
- [ ] **Calendar Integration**: Schedule confession delivery

## 📞 Support

For support, questions, or suggestions:
- Create an issue in this repository
- Contact: [Your contact information]

## 🎊 Special Thanks

Created with ❤️ for celebrating love during the beautiful festival of Diwali. May this bring joy, light, and love to everyone who experiences it.

---

**Made with 💖 during Diwali 2025**

*"Light of My Heart" - Where technology meets tradition in celebration of love*