import {useState, useEffect} from 'react'

import {GoChevronDown} from 'react-icons/go'
import Panel from './Panel'

const Dropdown = (props) => {
  const {options, onChange, value} = props
  // local state
  const [isOpen, setIsOpen] = useState(false)
  // use effect takes 2 arguments
  // the first is the function you want to call
  // the second is an array of props, state, any js variables available to this component to watch

  // use effect fires when the component mounts (first time is renders on the screen aka initial render)
  // if anything is in the second array,
  // these are js vars aka state, variables, props
  // these are items we a watching. if one of those variables changes, use effect will fire the function from the first argument again

  // fire the first time the component mounts
  // this is really great for API calls or adding event listeners the old fashion way
  // const useEffect(() => {}, [])
  // fire on mount, and everytime the value uof myPeiceOfState changes
  // const useEffect(() => {}, [myPieceOfState])
  // if no second argument, it will fire every time the component re-renders
  // const useEffect(() => {})

  // fire once on mount to add event listener,
  // if the function in the first agrument returns another function
  // thats gets fired when the component is detroyed
  // this is a cleanup function
  // const useEffect(() => {
  //   // define our handler
  //   // we are calling setIsOpen a better way!
  //   const handler = (event) => {
  //     // scroll down for div el and useREf example
  //     if(!divEl.current.contains(event.target)){
  //       setIsOpen(false)
  //     }
  //   }
  //   // define our listener
  //   document.addEventListener('click', handler, true)
  //   // when we return a function, its a cleanup callback called on destroy
  //   return () => {
  //     document.removeEventListener('click', handler)
  //   }
  // }, [])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setIsOpen(false)
    // need some other function defined by the
    // parent component passed in as a prop to call here
    onChange(option)
  }

  const renderedOptions = options.map((opt, index) => {
    return (
      <div
        onClick={() => handleOptionClick(opt)}
        key={index}
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
      >
        {opt.label}
      </div>
    )
  })

  return (
    <div className="w-48 relative">
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        {/* if value exists (aka not null or undefined) find the value key within{{value?.value} */
        /* great use of a ternary */}
        {value ? value.label : 'Select...'} <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  )
}

/* moved to own file!
const Panel = (props) => {
  const {className, children, ...rest} = props
  const finalClassNames = cx(
    className,
    'border rounded p-3 shadow bg-white w-full'
  )
  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  )
}

// named export
export {Panel}
*/

// default export (usually the file name should give you a hint about what to be the default export)
export default Dropdown
