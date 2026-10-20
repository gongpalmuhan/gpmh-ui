import type { Preview } from '@storybook/react-vite';
import '@gpmh/tokens/tokens.css';
import '@gpmh/ui/styles.css';
import './preview.css';

const preview: Preview = {
  decorators: [
    (Story) => <main className="gpmh-story-frame"><Story /></main>
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: {
      options: {
        white: { name: 'White', value: '#ffffff' },
        neutral: { name: 'Neutral', value: '#f8f8f8' }
      }
    },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Actions', 'Forms', 'Feedback', 'Navigation', 'Layout', 'Data Display']
      }
    }
  },
  initialGlobals: { backgrounds: { value: 'white' } }
};

export default preview;
