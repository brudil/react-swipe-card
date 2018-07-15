import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Card, CardDeck } from '../src/index'
import './style.css'

const data = ['Alexandre', 'Thomas', 'Lucien', 'Dwight', 'Mark', 'Jim', 'Pam', 'Jo', 'James', 'Angela', 'Harry']

storiesOf('Tinder card', module)
  .add('simple', () => (
    <div>
      <h1>react swipe card</h1>
      <CardDeck onEnd={action('end')} className='master-root'>
        {data.map((item, key) =>
          <Card
            key={key}
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </CardDeck>
    </div>
  ))
  .add('custom alert', () => (
    <div>
      <h1>react swipe card</h1>
      <CardDeck
        onEnd={action('end')}
        className='master-root'>
        {data.map((item, key) =>
          <Card
              key={key}
              onSwipeLeft={action('swipe left')}
              onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
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
            onSwipeTop={action('swipe top')}
            onSwipeBottom={action('swipe bottom')}
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </CardDeck>
    </div>
  ))