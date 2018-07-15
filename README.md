# react-swipe-card
Tinder style swipe cards
*Initially based on react-swipe-card by alexandre-garrec: [alexandre-garrec/react-swipe-card](https://github.com/alexandre-garrec/react-swipe-card)*

## Changes
- Written in TypeScript
- Removes any features that can be implemented above this component for more flexibility (alert component props)
- Tries to surface an code as options where their implementation can have an effect on visuals


[![npm](https://img.shields.io/npm/v/@ussu/react-swipe-card.svg?style=flat-square)](https://www.npmjs.com/package/@ussu/react-swipe-card)

 - [Usage](#usage)
 - [Demo](#demo)
 - [Code](#code)
 - [Components](#components)
 - [License](#License)

## Usage

Install

```bash
 $ yarn add @ussu/react-swipe-card
```


## Demo

[Demo](https://alexandre-garrec.github.io/react-swipe-card/)

## Code

```javascript
import Cards, { Card } from 'react-swipe-card'


const data = ['Alexandre', 'Thomas', 'Lucien']

const Wrapper = () => {
  return (
	  <Cards onEnd={action('end')} className='master-root'>
        {data.map(item =>
          <Card
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
  )
}
```

## Components

Cards
---
Props:

 - className: string
 - onEnd: function

Card
---
Props:

 - onSwipeLeft: function
 - onSwipeRight: function
 - onSwipeTop: function
 - onSwipeBottom: function

## License

[MIT License](https://opensource.org/licenses/MIT)

Initially based on react-swipe-card by alexandre-garrec: [alexandre-garrec/react-swipe-card](https://github.com/alexandre-garrec/react-swipe-card)
