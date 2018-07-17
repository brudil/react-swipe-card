import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Card, CardDeck } from '../src/index'
import './style.css'

const data = ['Poppy', 'James', 'Jo', 'Frida', 'Jamie', 'Jess', 'Anndrea']

storiesOf('Tinder card', module)
  .add('simple', () => (
    <div>
      <h1>react swipe card</h1>
      <CardDeck onEnd={action('end')} className='master-root'>
        {data.map((item, key) =>
          <Card
            key={key}
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}
            render={({ style, isPristine, shouldTransition }) => (
              <div style={style} className={`card ${shouldTransition ? 'animate' : isPristine ? 'inactive' : ''}`}>
                <h2>{item}</h2>
              </div>
            )}
            />
          )}
      </CardDeck>
    </div>
  ))
  .add('all swipe directions', () => (
    <div>
      <h1>react swipe card</h1>
      <CardDeck onEnd={action('end')} className='master-root'>
        {data.map((item, key) =>
          <Card
            key={key}
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}
            onSwipeTop={action('swipe top')}
            onSwipeBottom={action('swipe bottom')}
            render={({ style, isPristine, shouldTransition }) => (
              <div style={style} className={`card ${shouldTransition ? 'animate' : isPristine ? 'inactive' : ''}`}>
                <h2>{item}</h2>
              </div>
            )}
          />
        )}
      </CardDeck>
    </div>
  ))