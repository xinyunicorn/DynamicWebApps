import {useState, useEffect} from 'react'
import cx from 'classnames'
// import a css module file, notice the import is different, so is the usage!
import styles from './UI.module.css'

// importing our image files from assets
import CardPattern from '../assets/moroccan-flower-dark.png'
import Bilbo from '../assets/bilbo-baggins.png'
import Cameron from '../assets/cameron-poe.png'
import Nikki from '../assets/nikki-cage.png'
import Pollux from '../assets/pollux-troy.png'

const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]
/*
const Grid = (props) => {}
export default Grid
*/
export default function Grid(props) {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // duplicate our deck and shuffle them and then store them in state
  const shuffleCards = () => {
    // spread all of our card images 2x so that we have duplicates to match
    const shuffledCards = [...cardImages, ...cardImages]
      // add the sort function which fires a function for each item in our new array
      // when a number is negative, leave it where it is, when its positive swap it with another item (shuffle)
      .sort(() => Math.random() - 0.5)
      // now we map through each card in our "shuffled" and add a unique ID
      .map((card) => ({...card, id: Math.round(Math.random() * 1000000000)}))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    console.log(card)
    // first check is we have choice one, if we do,
    //the incoming card needs to be assigned to choice two
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // but what happens if we have both choices?
    // we need to compare them! BUT NOT HERE
    // if we do it here it might fire possibly before our local state has even updated
    // we to use useEffect so that it only checks when a choice updates
  }

  // useEffect(() => {}, []) // only fires once on mount aka component first render
  useEffect(() => {
    // this where we compare! but first we need to assign some logic to assigning choices
    // first - make sure we have both choices
    if (choiceOne && choiceTwo) {
      // if they both exist we can compare to see if they match
      if (choiceOne.src === choiceTwo.src) {
        // we have an array of all of our shuffled cards inside cards (state)
        // we need to map through and assign a new property matched and set to true
        setCards((prevCards) => {
          // now we map to make a copy of everything, and add the new propery of matched to matched items
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              console.log('those cards match!')
              // spread the card properties (key value pairs) and add a new one called matched and set it to true
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
        // else = they dont match
      } else {
        console.log('these cards dont match!')
        /// without this setTimeout, we wont even see the second card flip
        // when they do not match since the check is faster than the animation
        setTimeout(() => resetTurn(), 2000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }
  return (
    <>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns used: {turns}</p>
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
      </div>
    </>
  )
}

// save move to own file until after demo
// const Card = (props) => {}
function Card(props) {
  // update props to receive the entire card object
  const {card, handleChoice, flipped} = props
  // isActive will be part of each cards local state
  // const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    // setIsActive(!isActive)
    // setIsActive((current) => !current)
    handleChoice(card)
  }

  return (
    <div className={styles.flip_card}>
      <div
        className={cx(styles.flip_card_inner, {[styles.active]: flipped})}
        onClick={handleClick}
      >
        <div className={styles.flip_card_front}>
          <img src={CardPattern} alt="card front" />
        </div>
        <div className={styles.flip_card_back}>
          <img src={card.src} alt="card back" />
        </div>
      </div>
    </div>
  )
}
