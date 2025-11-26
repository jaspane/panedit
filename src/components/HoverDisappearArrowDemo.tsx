import React from 'react';
import HoverDisappearArrow from './HoverDisappearArrow';

interface HoverDisappearArrowDemoProps {
  isDarkMode: boolean;
}

const HoverDisappearArrowDemo: React.FC<HoverDisappearArrowDemoProps> = ({ isDarkMode }) => {
  return (
    <section
      className={`py-20 px-4 sm:px-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Hover-to-Disappear{' '}
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Arrow Icons
            </span>
          </h2>
          <p
            className={`text-lg sm:text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Interactive arrow icons that fade away on hover, perfect for scroll indicators and
            navigation cues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Scroll Down Indicator
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Classic arrow-down icon for page scrolling cues
            </p>
            <div className="flex justify-center py-8">
              <HoverDisappearArrow
                variant="arrow-down"
                size={56}
                color={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                ariaLabel="Scroll down to see more content"
              />
            </div>
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Hover over the arrow to see it disappear
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Navigation Chevron
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Subtle chevron for menu and dropdown interactions
            </p>
            <div className="flex justify-center py-8">
              <HoverDisappearArrow
                variant="chevron-down"
                size={56}
                color={isDarkMode ? 'text-pink-400' : 'text-pink-600'}
                ariaLabel="Expand menu options"
              />
            </div>
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Hover over the chevron to see it disappear
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Move Down Action
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Animated move icon for drag-and-drop interfaces
            </p>
            <div className="flex justify-center py-8">
              <HoverDisappearArrow
                variant="move-down"
                size={56}
                color={isDarkMode ? 'text-green-400' : 'text-green-600'}
                ariaLabel="Move item down"
              />
            </div>
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Hover over the icon to see it disappear
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Small Size
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Compact 32px arrow for tight spaces
            </p>
            <div className="flex justify-center py-8">
              <HoverDisappearArrow
                variant="arrow-down"
                size={32}
                color={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                ariaLabel="Small scroll indicator"
              />
            </div>
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Perfect for inline elements
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Large Size
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Bold 72px arrow for hero sections
            </p>
            <div className="flex justify-center py-8">
              <HoverDisappearArrow
                variant="arrow-down"
                size={72}
                color={isDarkMode ? 'text-orange-400' : 'text-orange-600'}
                ariaLabel="Large scroll indicator"
              />
            </div>
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Eye-catching and prominent
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Custom Color
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Gradient color with cyan theme
            </p>
            <div className="flex justify-center py-8">
              <HoverDisappearArrow
                variant="chevron-down"
                size={56}
                color={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}
                ariaLabel="Custom colored indicator"
              />
            </div>
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Matches your brand colors
            </p>
          </div>
        </div>

        <div
          className={`mt-16 p-8 rounded-2xl border ${
            isDarkMode
              ? 'bg-gradient-to-br from-blue-900/20 to-pink-900/20 border-blue-500/30'
              : 'bg-gradient-to-br from-blue-50 to-pink-50 border-blue-200'
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Features & Accessibility
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}
              >
                Smooth Animations
              </h4>
              <ul
                className={`space-y-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <li>• 500ms transition duration for smooth fade-out</li>
                <li>• Combined opacity, scale, and translateY transforms</li>
                <li>• Blur effect during disappearance for depth</li>
                <li>• Ease-in-out timing for natural motion</li>
              </ul>
            </div>
            <div>
              <h4
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-pink-300' : 'text-pink-700'
                }`}
              >
                Accessibility Support
              </h4>
              <ul
                className={`space-y-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <li>• Keyboard navigation with Tab and Enter/Space</li>
                <li>• ARIA labels for screen reader support</li>
                <li>• Respects prefers-reduced-motion setting</li>
                <li>• Focus states trigger same effect as hover</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div
            className={`inline-block p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <p
              className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Use arrow keys or Tab to navigate, then press Enter or Space
            </p>
            <div className="flex justify-center gap-8">
              <HoverDisappearArrow
                variant="arrow-down"
                size={48}
                color="text-blue-500"
                ariaLabel="First keyboard-accessible arrow"
              />
              <HoverDisappearArrow
                variant="chevron-down"
                size={48}
                color="text-pink-500"
                ariaLabel="Second keyboard-accessible arrow"
              />
              <HoverDisappearArrow
                variant="move-down"
                size={48}
                color="text-green-500"
                ariaLabel="Third keyboard-accessible arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoverDisappearArrowDemo;
